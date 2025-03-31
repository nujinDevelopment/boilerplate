import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'
import type { Database } from '../../types/database.types'

type Log = Database['public']['Tables']['logs']['Row']
type LogInput = Database['public']['Tables']['logs']['Insert']

export default defineEventHandler(async (event: H3Event) => {
  const client = await serverSupabaseClient<Database>(event)

  // POST - Create a new log
  if (event.req.method === 'POST') {
    const body: LogInput = await readBody(event)
    
    if (!body.message || !body.level || !body.category) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Message, level, and category are required' 
      })
    }

    const { data: log, error } = await client
      .from('logs')
      .insert({
        message: body.message,
        level: body.level,
        category: body.category,
        metadata: body.metadata || {}
      })
      .select()
      .single()

    if (error) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: `Failed to create log: ${error.message}` 
      })
    }

    return { log, message: 'Log created successfully' }
  }

  // GET - Fetch logs with pagination and filtering
  if (event.req.method === 'GET') {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const level = query.level as string
    const category = query.category as string

    let dbQuery = client
      .from('logs')
      .select('*', { count: 'exact' })

    if (level) {
      dbQuery = dbQuery.eq('level', level)
    }
    if (category) {
      dbQuery = dbQuery.eq('category', category)
    }

    const { data: logs, count, error } = await dbQuery
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (error) {
      throw createError({ 
        statusCode: 500, 
        statusMessage: `Failed to fetch logs: ${error.message}` 
      })
    }

    return {
      logs,
      totalCount: count,
      page,
      pageSize
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
