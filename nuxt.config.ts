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
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm'
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      domain: '',
      path: '/',
      sameSite: 'lax'
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
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
    }
  },

  modules: [
    '@nuxtjs/supabase', // Ensure Supabase is first
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '~/modules/user-management/module',
    '~/modules/subscription/module',
    '~/modules/content-management/module',
    '~/modules/projects/module',
    '~/modules/logging/module'
  ],

  // Auth is handled by the global middleware
  routeRules: {
    '/app/**': { ssr: true }
  }
})
