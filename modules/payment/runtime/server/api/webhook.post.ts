import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { PaymentConfig, UserSubscription } from '../../types'

export default defineEventHandler(async (event) => {
  const config = await useStorage().getItem<PaymentConfig>('payment:config')
  if (!config) {
    throw createError({
      statusCode: 500,
      message: 'Payment configuration not found'
    })
  }

  const signature = event.node.req.headers['stripe-signature'] || event.node.req.headers['revolut-signature']
  const rawBody = await readBody(event)

  if (config.providers.stripe.enabled && event.node.req.headers['stripe-signature']) {
    try {
      const stripe = require('stripe')(config.providers.stripe.secretKey)
      const webhookSecret = config.providers.stripe.webhookSecret

      // Verify webhook signature
      const stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      )

      // Handle different event types
      switch (stripeEvent.type) {
        case 'checkout.session.completed': {
          const session = stripeEvent.data.object
          const subscription: UserSubscription = {
            userId: session.client_reference_id,
            planId: session.metadata.planId,
            status: 'active',
            currentPeriodEnd: new Date(session.subscription.current_period_end * 1000).toISOString(),
            cancelAtPeriodEnd: false
          }

          await useStorage().setItem(
            `payment:subscriptions:${subscription.userId}`,
            subscription
          )
          break
        }

        case 'customer.subscription.updated': {
          const subscription = stripeEvent.data.object
          const userId = subscription.client_reference_id

          const userSubscription = await useStorage().getItem<UserSubscription>(
            `payment:subscriptions:${userId}`
          )

          if (userSubscription) {
            userSubscription.status = subscription.status === 'active' ? 'active' : 'canceled'
            userSubscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString()
            userSubscription.cancelAtPeriodEnd = subscription.cancel_at_period_end

            await useStorage().setItem(
              `payment:subscriptions:${userId}`,
              userSubscription
            )
          }
          break
        }

        case 'customer.subscription.deleted': {
          const subscription = stripeEvent.data.object
          const userId = subscription.client_reference_id

          const userSubscription = await useStorage().getItem<UserSubscription>(
            `payment:subscriptions:${userId}`
          )

          if (userSubscription) {
            userSubscription.status = 'canceled'
            await useStorage().setItem(
              `payment:subscriptions:${userId}`,
              userSubscription
            )
          }
          break
        }
      }

      return { received: true }
    } catch (error) {
      console.error('Stripe webhook error:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 400,
          message: `Webhook Error: ${error.message}`
        })
      }
      throw createError({
        statusCode: 400,
        message: 'Unknown webhook error'
      })
    }
  } else if (config.providers.revolut.enabled && event.node.req.headers['revolut-signature']) {
    try {
      const revolutClient = require('revolut-merchant-api')(config.providers.revolut.secretKey)
      const webhookSecret = config.providers.revolut.webhookSecret

      // Verify webhook signature
      const isValid = revolutClient.webhooks.verify(
        rawBody,
        signature,
        webhookSecret
      )

      if (!isValid) {
        throw new Error('Invalid webhook signature')
      }

      const revolutEvent = JSON.parse(rawBody)

      // Handle different event types
      switch (revolutEvent.event) {
        case 'ORDER.COMPLETED': {
          const order = revolutEvent.order
          const subscription: UserSubscription = {
            userId: order.metadata.userId,
            planId: order.metadata.planId,
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            cancelAtPeriodEnd: false
          }

          await useStorage().setItem(
            `payment:subscriptions:${subscription.userId}`,
            subscription
          )
          break
        }

        case 'SUBSCRIPTION.CANCELLED': {
          const subscription = revolutEvent.subscription
          const userId = subscription.metadata.userId

          const userSubscription = await useStorage().getItem<UserSubscription>(
            `payment:subscriptions:${userId}`
          )

          if (userSubscription) {
            userSubscription.status = 'canceled'
            await useStorage().setItem(
              `payment:subscriptions:${userId}`,
              userSubscription
            )
          }
          break
        }
      }

      return { received: true }
    } catch (error) {
      console.error('Revolut webhook error:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 400,
          message: `Webhook Error: ${error.message}`
        })
      }
      throw createError({
        statusCode: 400,
        message: 'Unknown webhook error'
      })
    }
  }

  throw createError({
    statusCode: 400,
    message: 'Invalid webhook request'
  })
})
