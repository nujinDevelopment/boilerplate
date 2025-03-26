import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { generateUnsubscribeToken } from '../../utils/token'
import { sendWelcomeEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
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
    const unsubscribeToken = generateUnsubscribeToken()
    
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ 
        email: body.email,
        unsubscribe_token: unsubscribeToken 
      }])

    if (error) throw error

    // Send welcome email
    await sendWelcomeEmail(body.email, unsubscribeToken)

    return { success: true, data }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})
