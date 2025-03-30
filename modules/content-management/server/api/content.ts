import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Content, CreateContentDTO, UpdateContentDTO } from '../../types'
import type { Database } from '../../types/database.types'

export default defineEventHandler(async (event: H3Event) => {
  const client = await serverSupabaseClient<Database>(event)
  
  // GET all contents or a single content
  if (event.req.method === 'GET') {
    const id = getRouterParam(event, 'id')
    
    if (id) {
      // Fetch a single content with its versions
      const { data, error } = await client
        .from('contents')
        .select('*, versions:content_versions(*)')
        .eq('id', id)
        .single()

      if (error) {
        throw createError({ statusCode: 404, statusMessage: `Content with ID ${id} not found` })
      }
      return { content: data }
    } else {
      // Fetch all contents with their latest versions
      const { data, error } = await client
        .from('contents')
        .select('*, versions:content_versions(*)')
        .order('updated_at', { ascending: false })

      if (error) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch contents' })
      }
      return { contents: data }
    }
  }
  
  // POST - Create new content
  if (event.req.method === 'POST') {
    const body: CreateContentDTO = await readBody(event)
    
    if (!body.title || !body.type || !body.content) {
      throw createError({ statusCode: 400, statusMessage: 'Title, type and content are required' })
    }

    // Create content
    const { data: content, error: contentError } = await client
      .from('contents')
      .insert({
        title: body.title,
        type: body.type,
        metadata: body.metadata || {},
        status: 'draft',
        created_by: (await client.auth.getUser()).data.user?.id || '',
        schedule_publish_at: body.schedule_publish_at
      })
      .select()
      .single()

    if (contentError || !content) {
      throw createError({ statusCode: 400, statusMessage: `Failed to create content: ${contentError?.message || 'Unknown error'}` })
    }

    // Create initial version
    const { data: version, error: versionError } = await client
      .from('content_versions')
      .insert({
        content_id: content.id,
        content: body.content,
        version_number: 1,
        created_by: (await client.auth.getUser()).data.user?.id || ''
      })
      .select()
      .single()

    if (versionError || !version) {
      throw createError({ statusCode: 400, statusMessage: `Failed to create content version: ${versionError?.message || 'Unknown error'}` })
    }

    return { 
      content: { 
        ...content, 
        latest_version: version 
      } as Content, 
      message: 'Content created successfully' 
    }
  }

  // PUT - Update content
  if (event.req.method === 'PUT') {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Content ID is required' })
    }

    const body: UpdateContentDTO = await readBody(event)
    if (Object.keys(body).length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No update data provided' })
    }

    // Get current version number if content is being updated
    let nextVersionNumber = 1
    if (body.content) {
      const { data: currentVersion } = await client
        .from('content_versions')
        .select('version_number')
        .eq('content_id', id)
        .order('version_number', { ascending: false })
        .limit(1)
        .single()

      nextVersionNumber = (currentVersion?.version_number || 0) + 1
    }

    // Update content
    const updates = {
      ...(body.title && { title: body.title }),
      ...(body.type && { type: body.type }),
      ...(body.metadata && { metadata: body.metadata }),
      ...(body.status && { status: body.status }),
      ...(body.schedule_publish_at && { schedule_publish_at: body.schedule_publish_at })
    }

    const { data: updatedContent, error: updateError } = await client
      .from('contents')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedContent) {
      throw createError({ statusCode: 400, statusMessage: `Failed to update content: ${updateError?.message || 'Unknown error'}` })
    }

    // Create new version if content was provided
    if (body.content) {
      const { data: newVersion, error: versionError } = await client
        .from('content_versions')
        .insert({
          content_id: id,
          content: body.content,
          version_number: nextVersionNumber,
          created_by: (await client.auth.getUser()).data.user?.id || ''
        })
        .select()
        .single()

      if (versionError || !newVersion) {
        throw createError({ statusCode: 400, statusMessage: `Failed to create content version: ${versionError?.message || 'Unknown error'}` })
      }

      return { 
        content: { 
          ...updatedContent, 
          latest_version: newVersion 
        } as Content, 
        message: 'Content and version updated successfully' 
      }
    }

    return { content: updatedContent as Content, message: 'Content updated successfully' }
  }

  // DELETE - Delete content
  if (event.req.method === 'DELETE') {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Content ID is required' })
    }

    const { error } = await client
      .from('contents')
      .delete()
      .eq('id', id)

    if (error) {
      throw createError({ statusCode: 400, statusMessage: `Failed to delete content: ${error.message}` })
    }
    return { message: 'Content deleted successfully' }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
