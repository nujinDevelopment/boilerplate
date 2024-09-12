import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-logging',
    configKey: 'logging'
  },
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add server API route
    addServerHandler({
      route: '/api/logs',
      handler: resolve('./server/api/logs')
    })

    // Add composable
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./composables'))
    })

    // Add middleware
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: 'logging-middleware',
        path: '/',
        file: resolve('./middleware/logging.global.ts')
      })
    })
  }
})