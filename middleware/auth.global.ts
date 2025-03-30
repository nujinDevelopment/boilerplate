import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // Only check authentication for routes starting with '/app'
  if (to.path.startsWith('/app' || '/admin') && !user.value) {
    return navigateTo('/login')
  }
})
