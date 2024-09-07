import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'user-management',
    configKey: 'userManagement'
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add server API routes
    addServerHandler({
      route: '/api/users',
      handler: resolve('./server/api/users')
    })

    // Add composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./composables'))
    })

    // Add components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve('./components'),
        prefix: 'UserManagement'
      })
    })
  }
})