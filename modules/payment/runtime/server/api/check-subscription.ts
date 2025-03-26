import { defineEventHandler, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { UserSubscription, SubscriptionPlan } from '../../types'

export default defineEventHandler(async (event) => {
  // Ensure user is authenticated
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  // Get user's subscription
  const subscription = await useStorage().getItem<UserSubscription>(`payment:subscriptions:${user.id}`)
  
  if (!subscription) {
    return {
      subscription: null,
      plan: null
    }
  }

  // Get all plans
  const plans = await useStorage().getItem<SubscriptionPlan[]>('payment:plans')
  if (!plans) {
    throw createError({
      statusCode: 500,
      message: 'Failed to load subscription plans'
    })
  }

  // Find user's current plan
  const currentPlan = plans.find(p => p.name === subscription.planId)
  if (!currentPlan) {
    throw createError({
      statusCode: 500,
      message: 'Subscription plan not found'
    })
  }

  // Check if subscription is expired
  if (subscription.status === 'active') {
    const currentPeriodEnd = new Date(subscription.currentPeriodEnd)
    if (currentPeriodEnd < new Date()) {
      // Update subscription status to expired
      subscription.status = 'expired'
      await useStorage().setItem<UserSubscription>(
        `payment:subscriptions:${user.id}`,
        subscription
      )
    }
  }

  return {
    subscription,
    plan: currentPlan
  }
})
