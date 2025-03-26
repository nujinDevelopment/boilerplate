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
      login: '/login',
      callback: '/confirm'
    }
  },

  runtimeConfig: {
    email: {
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true'
      },
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      name: process.env.EMAIL_FROM_NAME
    },
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt',
    '~/modules/user-management/module',
    '~/modules/subscription/module',
/*     '~/modules/logging/module',  // Add the new logging module
    '~/modules/projects/module'  // Add the projects module */
  ],

  // We'll handle the auth middleware in the auth.global.ts file
  routeRules: {
    '/app/**': { appMiddleware: ['auth'] }
  }
})
