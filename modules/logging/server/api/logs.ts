import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody, getQuery } from 'h3'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const query = getQuery(event)
    const { page = 1, itemsPerPage = 10, level, category } = query

    let supabaseQuery = supabase
      .from('logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((Number(page) - 1) * Number(itemsPerPage), Number(page) * Number(itemsPerPage) - 1)

    if (level) {
      supabaseQuery = supabaseQuery.eq('level', level)
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category)
    }

    const { data, error, count } = await supabaseQuery

    if (error) {
      console.error('Error fetching logs:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data, total: count }
  } else if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    const { message, level, category, metadata } = body

    const { data, error } = await supabase
      .from('logs')
      .insert({
        message,
        level,
        category,
        metadata,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error inserting log:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  }
})