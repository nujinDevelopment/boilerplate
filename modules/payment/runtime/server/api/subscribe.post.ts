import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { PaymentConfig, SubscriptionPlan } from '../../types'

export default defineEventHandler(async (event) => {
  // Ensure user is authenticated
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const { planId, interval } = body

  if (!planId || !interval || !['monthly', 'yearly'].includes(interval)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request parameters'
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

  // Get subscription plans
  const plans = await useStorage().getItem<SubscriptionPlan[]>('payment:plans')
  if (!plans) {
    throw createError({
      statusCode: 500,
      message: 'Subscription plans not found'
    })
  }

  const plan = plans.find(p => p.name === planId)
  if (!plan) {
    throw createError({
      statusCode: 404,
      message: 'Plan not found'
    })
  }

  // Determine which payment provider to use
  if (config.providers.stripe.enabled) {
    try {
      // Initialize Stripe
      const stripe = require('stripe')(config.providers.stripe.secretKey)

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.description
            },
            unit_amount: interval === 'monthly' ? plan.price_monthly * 100 : plan.price_yearly * 100,
            recurring: {
              interval: interval === 'monthly' ? 'month' : 'year'
            }
          },
          quantity: 1
        }],
        success_url: `${event.node.req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${event.node.req.headers.origin}/pricing`
      })

      return {
        provider: 'stripe',
        url: session.url
      }
    } catch (error) {
      console.error('Stripe error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to create checkout session'
      })
    }
  } else if (config.providers.revolut.enabled) {
    try {
      // Initialize Revolut client
      const revolutClient = require('revolut-merchant-api')(config.providers.revolut.secretKey)

      // Create Revolut order
      const order = await revolutClient.orders.create({
        amount: interval === 'monthly' ? plan.price_monthly * 100 : plan.price_yearly * 100,
        currency: 'USD',
        email: user.email,
        description: `${plan.name} - ${interval} subscription`,
        capture_mode: 'AUTOMATIC'
      })

      return {
        provider: 'revolut',
        url: order.checkout_url
      }
    } catch (error) {
      console.error('Revolut error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to create payment order'
      })
    }
  }

  throw createError({
    statusCode: 400,
    message: 'No payment provider enabled'
  })
})
