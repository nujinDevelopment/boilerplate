import { navigateTo, useSupabaseUser, useSupabaseClient } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // Only check authentication for routes starting with '/app' or '/admin'
  if ((to.path.startsWith('/app') || to.path.startsWith('/admin')) && !user.value) {
    return navigateTo('/login')
  }
})
