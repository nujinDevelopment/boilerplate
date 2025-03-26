import { defineEventHandler, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { PaymentConfig, UserSubscription } from '../../types'

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
    throw createError({
      statusCode: 404,
      message: 'No active subscription found'
    })
  }

  // Get payment config
  const config = await useStorage().getItem<PaymentConfig>('payment:config')
  if (!config) {
    throw createError({
      statusCode: 500,
      message: 'Payment configuration not found'
    })
  }

  try {
    if (config.providers.stripe.enabled) {
      // Initialize Stripe
      const stripe = require('stripe')(config.providers.stripe.secretKey)

      // Cancel the subscription at period end
      await stripe.subscriptions.update(subscription.planId, {
        cancel_at_period_end: true
      })

    } else if (config.providers.revolut.enabled) {
      // Initialize Revolut client
      const revolutClient = require('revolut-merchant-api')(config.providers.revolut.secretKey)

      // Cancel the subscription
      await revolutClient.subscriptions.cancel(subscription.planId)
    } else {
      throw new Error('No payment provider enabled')
    }

    // Update local subscription status
    subscription.cancelAtPeriodEnd = true
    await useStorage().setItem(`payment:subscriptions:${user.id}`, subscription)

    return subscription

  } catch (error) {
    console.error('Subscription cancellation error:', error)
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: `Failed to cancel subscription: ${error.message}`
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Failed to cancel subscription'
    })
  }
})
