import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const token = decodeURIComponent(query.token as string)

  console.log('Unsubscribe attempt with token:', token)
  console.log('Supabase config:', {
    url: config.supabase.url,
    keyLength: config.supabase.key?.length || 0
  })

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  // Validate token format (should be 64 characters hex string from 32 bytes)
  if (!/^[0-9a-f]{64}$/.test(token)) {
    console.error('Invalid token format:', token)
    throw createError({
      statusCode: 400,
      message: 'Invalid token format'
    })
  }

  const supabase = createClient(
    config.supabase.url,
    config.supabase.key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    console.log('Token format validated, querying subscribers table with token:', token)
    
    // First verify the table exists and we have access
    console.log('Verifying database access...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('subscribers')
      .select('count')
      .limit(1)
    
    if (tableError) {
      console.error('Database access verification failed')
      console.error('Table access error:', {
        message: tableError.message,
        code: tableError.code,
        details: tableError.details,
        hint: tableError.hint
      })
      throw createError({
        statusCode: 500,
        message: 'Database configuration error'
      })
    }

    console.log('Database access verified:', tableCheck)
    
    // Set the unsubscribe token in the database session
    console.log('Setting unsubscribe token via RPC...')
    const { error: rpcError } = await supabase
      .rpc('set_unsubscribe_token', { token })
    
    if (rpcError) {
      console.error('Failed to set unsubscribe token:', rpcError)
      throw createError({
        statusCode: 500,
        message: 'Error preparing unsubscribe operation'
      })
    }

    // Try to delete subscriber with token
    console.log('Attempting to delete subscriber with token...')
    const { data: deleted, error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('unsubscribe_token', token)
      .select()

    if (deleteError) {
      console.error('Delete operation failed:', deleteError)
      throw createError({
        statusCode: 500,
        message: 'Error removing subscription'
      })
    }

    if (!deleted || deleted.length === 0) {
      console.log('No subscriber found with token')
      throw createError({
        statusCode: 404,
        message: 'Invalid unsubscribe token'
      })
    }

    console.log('Successfully deleted subscriber:', deleted)

    // Return HTML response
    event.node.res.setHeader('Content-Type', 'text/html')
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #333; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed</h1>
            <p>You have been removed from our newsletter list.</p>
          </div>
        </body>
      </html>
    `
  } catch (error: any) {
    // If it's already an h3 error (like our 404), pass it through
    if (error.statusCode) {
      throw error
    }
    // Otherwise wrap it as a 500
    throw createError({
      statusCode: 500,
      message: 'An unexpected error occurred'
    })
  }
})
