import { defineNuxtModule, addServerHandler, createResolver, addImportsDir } from '@nuxt/kit'
import { fileURLToPath } from 'url'

export interface ModuleOptions {
  supabaseUrl?: string
  supabaseKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'subscription',
    configKey: 'supabase'
  },
  defaults: {
    supabaseUrl: '',
    supabaseKey: ''
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Add runtime config
    const runtimeConfig = nuxt.options.runtimeConfig as {
      supabase?: {
        url?: string
        key?: string
      }
    }
    
    // Initialize if not exists
    runtimeConfig.supabase = runtimeConfig.supabase || {}
    
    // Set values from module options
    runtimeConfig.supabase.url = runtimeConfig.supabase.url || options.supabaseUrl
    runtimeConfig.supabase.key = runtimeConfig.supabase.key || options.supabaseKey

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'))

    // Add server handlers
    addServerHandler({
      route: '/api/subscribe',
      handler: resolve(runtimeDir, 'server/api/subscribe.post')
    })
    
    addServerHandler({
      route: '/api/unsubscribe',
      handler: resolve(runtimeDir, 'server/api/unsubscribe.get')
    })
  }
})
