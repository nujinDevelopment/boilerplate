import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'
import type { Database } from '../../types/database.types'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectInput {
  id?: string
  name: string
  description: string
  owner_id: string
}

export default defineEventHandler(async (event: H3Event) => {
  const client = await serverSupabaseClient<Database>(event)
  
  // GET all projects or a single project
  if (event.req.method === 'GET') {
    const id = getRouterParam(event, 'id')
    
    if (id) {
      // Fetch a single project
      const { data, error } = await client
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw createError({ statusCode: 404, statusMessage: `Project with ID ${id} not found` })
      }
      return { project: data }
    } else {
      // Fetch all projects
      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch projects' })
      }
      return { projects: data }
    }
  }
  
  // POST - Create a new project
  if (event.req.method === 'POST') {
    const body: ProjectInput = await readBody(event)
    
    if (!body.name || !body.description) {
      throw createError({ statusCode: 400, statusMessage: 'Name and description are required' })
    }

    const { data, error } = await client
      .from('projects')
      .insert(body)
      .single()
    
    if (error) {
      throw createError({ statusCode: 400, statusMessage: `Failed to create project: ${error.message}` })
    }
    return { project: data, message: 'Project created successfully' }
  }

  // PUT - Update an existing project
  if (event.req.method === 'PUT') {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Project ID is required' })
    }

    const body: ProjectInput = await readBody(event)
    
    if (!body.name || !body.description) {
      throw createError({ statusCode: 400, statusMessage: 'Name and description are required' })
    }

    const { data, error } = await client
      .from('projects')
      .update(body)
      .eq('id', id)
      .single()

    if (error) {
      throw createError({ statusCode: 400, statusMessage: `Failed to update project: ${error.message}` })
    }
    return { project: data, message: 'Project updated successfully' }
  }

  // DELETE - Delete a project
  if (event.req.method === 'DELETE') {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Project ID is required' })
    }

    const { error } = await client
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      throw createError({ statusCode: 400, statusMessage: `Failed to delete project: ${error.message}` })
    }
    return { message: 'Project deleted successfully' }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
