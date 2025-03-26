import { ref } from 'vue'
import type { Content, CreateContentDTO, UpdateContentDTO } from '../types'

export const useContent = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchContents = async (): Promise<Content[]> => {
    loading.value = true
    error.value = null
    try {
      const response = await useFetch('/api/content')
      return response.data.value as Content[]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch contents'
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchContent = async (id: string): Promise<Content | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await useFetch(`/api/content/${id}`)
      return response.data.value as Content
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch content'
      return null
    } finally {
      loading.value = false
    }
  }

  const createContent = async (data: CreateContentDTO): Promise<Content | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await useFetch('/api/content', {
        method: 'POST',
        body: data
      })
      return response.data.value as Content
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
      const response = await useFetch(`/api/content/${id}`, {
        method: 'PUT',
        body: data
      })
      return response.data.value as Content
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
      await useFetch(`/api/content/${id}`, {
        method: 'DELETE'
      })
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete content'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchContents,
    fetchContent,
    createContent,
    updateContent,
    removeContent
  }
}
