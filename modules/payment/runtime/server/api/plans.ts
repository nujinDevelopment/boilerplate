import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { SubscriptionPlan } from '../../types'

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
    const plans = await useStorage().getItem<SubscriptionPlan[]>('payment:plans')
    return plans || []
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    
    // Validate plans structure
    if (!Array.isArray(body)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid plans format - expected array'
      })
    }

    // Validate each plan
    for (const plan of body) {
      if (!plan.name || typeof plan.name !== 'string') {
        throw createError({
          statusCode: 400,
          message: 'Each plan must have a name'
        })
      }

      if (typeof plan.price_monthly !== 'number' || typeof plan.price_yearly !== 'number') {
        throw createError({
          statusCode: 400,
          message: 'Plan prices must be numbers'
        })
      }

      if (!Array.isArray(plan.features)) {
        throw createError({
          statusCode: 400,
          message: 'Plan features must be an array'
        })
      }

      // Validate features
      for (const feature of plan.features) {
        if (!feature.name || typeof feature.name !== 'string') {
          throw createError({
            statusCode: 400,
            message: 'Each feature must have a name'
          })
        }

        if (feature.limit !== undefined && typeof feature.limit !== 'number') {
          throw createError({
            statusCode: 400,
            message: 'Feature limit must be a number if provided'
          })
        }
      }
    }

    // Store plans
    await useStorage().setItem<SubscriptionPlan[]>('payment:plans', body)
    return { success: true }
  }

  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})
