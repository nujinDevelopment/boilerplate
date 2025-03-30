import { ref, computed } from 'vue'
import type { Content, CreateContentDTO, UpdateContentDTO, ContentVersion } from '../types'
import type { Database } from '../types/database.types'
import { useSupabaseClient } from '#imports'

type SupabaseClient = ReturnType<typeof useSupabaseClient<Database>>

export const useContent = () => {
  const supabase = useSupabaseClient<Database>()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const contents = ref<Content[]>([])
  const currentContent = ref<Content | null>(null)
  const contentVersions = ref<ContentVersion[]>([])

  const fetchContents = async (filters?: { type?: string; status?: string }): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      let query = supabase
        .from('contents')
        .select('*, versions(*)')
        .order('updated_at', { ascending: false })

      if (filters?.type) {
        query = query.eq('type', filters.type)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error: err } = await query

      if (err) throw err
      contents.value = (data || []).map(content => ({
        ...content,
        type: content.type as Content['type'],
        status: content.status as Content['status'],
        versions: (content.versions || []) as ContentVersion[]
      })) as Content[]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch contents'
    } finally {
      loading.value = false
    }
  }

  const fetchContent = async (id: string): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('contents')
        .select('*, versions(*)')
        .eq('id', id)
        .single()

      if (err) throw err
      currentContent.value = data ? {
        ...data,
        type: data.type as Content['type'],
        status: data.status as Content['status'],
        versions: (data.versions || []) as ContentVersion[]
      } as Content : null

      // Fetch versions
      const { data: versionsData, error: versionsErr } = await supabase
        .from('content_versions')
        .select('*')
        .eq('content_id', id)
        .order('created_at', { ascending: false })

      if (versionsErr) throw versionsErr
      contentVersions.value = versionsData as ContentVersion[]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch content'
    } finally {
      loading.value = false
    }
  }

  const createContent = async (data: CreateContentDTO): Promise<Content | null> => {
    loading.value = true
    error.value = null
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId) throw new Error('User not authenticated')

      // Create content
      const { data: contentData, error: contentErr } = await supabase
        .from('contents')
        .insert({
          title: data.title,
          type: data.type,
          status: 'draft',
          metadata: data.metadata || {},
          created_by: userId,
          schedule_publish_at: data.schedule_publish_at
        } as Database['public']['Tables']['contents']['Insert'])
        .select()
        .single()

      if (contentErr || !contentData) throw contentErr || new Error('Failed to create content')

      // Create initial version
      const { error: versionErr } = await supabase
        .from('content_versions')
        .insert({
          content_id: contentData.id,
          content: data.content,
          version_number: 1,
          created_by: userId
        } as Database['public']['Tables']['content_versions']['Insert'])

      if (versionErr) throw versionErr

      await fetchContent(contentData.id)
      return {
        ...contentData,
        type: contentData.type as Content['type'],
        status: contentData.status as Content['status']
      } as Content
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create content'
      return null
    } finally {
      loading.value = false
    }
  }

  const updateContent = async (id: string, data: UpdateContentDTO): Promise<Content | null> => {
    loading.value = true
    error.value = null
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId) throw new Error('User not authenticated')

      // Update content metadata
      const { data: contentData, error: contentErr } = await supabase
        .from('contents')
        .update({
          title: data.title,
          type: data.type,
          status: data.status,
          metadata: data.metadata,
          updated_at: new Date().toISOString(),
          schedule_publish_at: data.schedule_publish_at
        } as Database['public']['Tables']['contents']['Update'])
        .eq('id', id)
        .select()
        .single()

      if (contentErr || !contentData) throw contentErr || new Error('Failed to update content')

      // If content changed, create new version
      if (data.content) {
        // Get latest version number
        const { data: latestVersion } = await supabase
          .from('content_versions')
          .select('version_number')
          .eq('content_id', id)
          .order('version_number', { ascending: false })
          .limit(1)
          .single()

        const newVersionNumber = (latestVersion?.version_number || 0) + 1

        const { error: versionErr } = await supabase
          .from('content_versions')
          .insert({
            content_id: id,
            content: data.content,
            version_number: newVersionNumber,
            created_by: userId
          } as Database['public']['Tables']['content_versions']['Insert'])

        if (versionErr) throw versionErr
      }

      await fetchContent(id)
      return {
        ...contentData,
        type: contentData.type as Content['type'],
        status: contentData.status as Content['status']
      } as Content
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update content'
      return null
    } finally {
      loading.value = false
    }
  }

  const removeContent = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null
    try {
      // Delete all versions first
      const { error: versionsErr } = await supabase
        .from('content_versions')
        .delete()
        .eq('content_id', id)

      if (versionsErr) throw versionsErr

      // Then delete the content
      const { error: contentErr } = await supabase
        .from('contents')
        .delete()
        .eq('id', id)

      if (contentErr) throw contentErr

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete content'
      return false
    } finally {
      loading.value = false
    }
  }

  const restoreVersion = async (contentId: string, versionId: string): Promise<boolean> => {
    loading.value = true
    error.value = null
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId) throw new Error('User not authenticated')

      // Get the version to restore
      const { data: versionData, error: versionErr } = await supabase
        .from('content_versions')
        .select('*')
        .eq('id', versionId)
        .single()

      if (versionErr || !versionData) throw versionErr || new Error('Version not found')

      // Create new version with the restored content
      const { data: latestVersion } = await supabase
        .from('content_versions')
        .select('version_number')
        .eq('content_id', contentId)
        .order('version_number', { ascending: false })
        .limit(1)
        .single()

      const newVersionNumber = (latestVersion?.version_number || 0) + 1

      const { error: newVersionErr } = await supabase
        .from('content_versions')
        .insert({
          content_id: contentId,
          content: versionData.content,
          version_number: newVersionNumber,
          created_by: userId,
          restored_from: versionId
        } as Database['public']['Tables']['content_versions']['Insert'])

      if (newVersionErr) throw newVersionErr

      await fetchContent(contentId)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to restore version'
      return false
    } finally {
      loading.value = false
    }
  }

  const uploadMedia = async (file: File): Promise<string | null> => {
    loading.value = true
    error.value = null
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `content-media/${fileName}`

      const { error: uploadErr } = await supabase.storage
        .from('content')
        .upload(filePath, file)

      if (uploadErr) throw uploadErr

      const { data: { publicUrl } } = supabase.storage
        .from('content')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to upload media'
      return null
    } finally {
      loading.value = false
    }
  }

  const latestVersion = computed(() => {
    if (!contentVersions.value.length) return null
    return contentVersions.value[0]
  })

  return {
    loading,
    error,
    contents,
    currentContent,
    contentVersions,
    latestVersion,
    fetchContents,
    fetchContent,
    createContent,
    updateContent,
    removeContent,
    restoreVersion,
    uploadMedia
  }
}
