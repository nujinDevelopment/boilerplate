import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig, useSupabaseUser } from '#imports'
import type { UserSubscription, SubscriptionPlan, Feature } from '../types'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const user = useSupabaseUser()

  // If route doesn't require subscription, continue
  if (!to.meta.requiresSubscription) {
    return
  }

  // If no user, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }

  try {
    // Check subscription status
    const response = await fetch('/api/payment/check-subscription')
    if (!response.ok) {
      throw new Error('Failed to check subscription')
    }

    const { subscription, plan } = await response.json()

    // If no subscription or not active, redirect to pricing page
    if (!subscription || subscription.status !== 'active') {
      return navigateTo('/pricing')
    }

    // If route requires specific features, check them
    if (to.meta.requiredFeatures) {
      const requiredFeatures = to.meta.requiredFeatures as string[]
      const hasAllFeatures = requiredFeatures.every(feature => 
        plan.features.some((f: Feature) => f.name === feature)
      )

      if (!hasAllFeatures) {
        return navigateTo('/pricing')
      }
    }
  } catch (error) {
    console.error('Subscription check failed:', error)
    return navigateTo('/pricing')
  }
})
