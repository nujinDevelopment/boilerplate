import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'
import { fileURLToPath } from 'url'
import type { NuxtPage } from '@nuxt/schema'

interface PageWithMiddleware extends NuxtPage {
  middleware?: string | string[]
}

export default defineNuxtModule({
  meta: {
    name: 'payment',
    configKey: 'payment'
  },
  defaults: {
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
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Add runtime directory
    nuxt.options.build.transpile.push(runtimeDir)

    // Register composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    // Register components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        prefix: 'Payment'
      })
    })

    // Register pages
    nuxt.hook('pages:extend', (pages) => {
      pages.push(
        {
          name: 'payment-settings',
          path: '/payment/settings',
          file: resolve(runtimeDir, 'pages/settings.vue')
        },
        {
          name: 'payment-success',
          path: '/payment/success',
          file: resolve(runtimeDir, 'pages/success.vue')
        }
      )
    })

    // Register API routes
    addServerHandler({
      route: '/api/payment/config',
      handler: resolve(runtimeDir, 'server/api/config')
    })

    addServerHandler({
      route: '/api/payment/subscribe',
      handler: resolve(runtimeDir, 'server/api/subscribe.post')
    })

    addServerHandler({
      route: '/api/payment/webhook',
      handler: resolve(runtimeDir, 'server/api/webhook.post')
    })

    addServerHandler({
      route: '/api/payment/check-subscription',
      handler: resolve(runtimeDir, 'server/api/check-subscription')
    })

    addServerHandler({
      route: '/api/payment/plans',
      handler: resolve(runtimeDir, 'server/api/plans')
    })

    addServerHandler({
      route: '/api/payment/cancel-subscription',
      handler: resolve(runtimeDir, 'server/api/cancel-subscription.post')
    })

    // Add middleware
    nuxt.hook('pages:extend', (pages) => {
      pages.forEach((page: PageWithMiddleware) => {
        if (page.meta?.requiresSubscription) {
          if (typeof page.middleware === 'string') {
            page.middleware = [page.middleware, 'subscription']
          } else {
            page.middleware = page.middleware || []
            page.middleware.push('subscription')
          }
        }
      })
    })

    // Add subscription middleware
    addServerHandler({
      route: '/api/payment/middleware/subscription',
      handler: resolve(runtimeDir, 'middleware/subscription')
    })

    // Add default configuration
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.payment = {
      routes: {
        pricing: '/pricing',
        settings: '/payment/settings',
        success: '/payment/success'
      },
      ...(nuxt.options.runtimeConfig.public.payment || {})
    }
  }
})
