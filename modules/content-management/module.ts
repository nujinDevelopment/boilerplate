import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'url'

export default defineNuxtModule({
  meta: {
    name: 'content-management',
    configKey: 'contentManagement',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Register components directory
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve('./components'),
        prefix: 'Content'
      })
    })

    // Register composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./composables'))
    })

    // Register API routes
    addServerHandler({
      route: '/api/content',
      handler: resolve('./server/api/content')
    })

    addServerHandler({
      route: '/api/content/:id',
      handler: resolve('./server/api/content')
    })

    // Add runtime directory
    nuxt.options.build.transpile.push(runtimeDir)
  }
})
