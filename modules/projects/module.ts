import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import type { Nitro } from 'nitropack'
import type { ComponentsOptions, ComponentsDir } from '@nuxt/schema'

interface ModuleOptions {
  // Add any module-specific options here
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'projects',
    configKey: 'projects'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hook('components:dirs', (dirs: (string | ComponentsDir)[]) => {
      dirs.push({
        path: resolver.resolve('components'),
        prefix: 'Project'
      })
    })

    // Register composables
    nuxt.hook('imports:dirs', (dirs: string[]) => {
      dirs.push(resolver.resolve('composables'))
    })

    // Add server API routes for projects
    addServerHandler({
      route: '/api/projects',
      handler: resolver.resolve('./server/api/projects')
    })

    addServerHandler({
      route: '/api/projects/:id',
      handler: resolver.resolve('./server/api/projects')
    })

    // Register middleware
    nuxt.hook('nitro:config', (nitroConfig: any) => {
      if (!nitroConfig.handlers) nitroConfig.handlers = []
      nitroConfig.handlers.push({
        route: '/app/projects/**',
        handler: resolver.resolve('middleware/projects')
      })
    })

    // Add runtime config for permissions (if needed)
    nuxt.options.runtimeConfig.public.projects = options || {}

    // Let Nuxt handle the routing through the pages directory structure
  }
})
