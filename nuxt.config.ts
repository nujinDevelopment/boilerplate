// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'nujin Boilerplate',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      // login: '/login',
      // callback: '/callback'
    }
  },

  runtimeConfig: {
    public: {
      // supabaseUrl: process.env.SUPABASE_URL,
      // supabaseKey: process.env.SUPABASE_KEY
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt'
  ],

  // Add this line to use the auth middleware globally
  routeRules: {
    // '/app/**': { middleware: ['auth'] }
  }
})