import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { PaymentConfig } from '../../types'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  // Only allow admin users
  const user = event.context.user
  if (!user || user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized'
    })
  }

  if (event.method === 'GET') {
    const paymentConfig = await useStorage().getItem<PaymentConfig>('payment:config')
    return paymentConfig || {
      providers: {
        stripe: {
          enabled: false,
          publicKey: '',
          secretKey: '',
          webhookSecret: ''
        },
        revolut: {
          enabled: false,
          publicKey: '',
          secretKey: '',
          webhookSecret: ''
        }
      }
    }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    
    // Validate config structure
    if (!body.providers || typeof body.providers !== 'object') {
      throw createError({
        statusCode: 400,
        message: 'Invalid configuration format'
      })
    }

    // Store config
    await useStorage().setItem<PaymentConfig>('payment:config', body)
    return { success: true }
  }

  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})
