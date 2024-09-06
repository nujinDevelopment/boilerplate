export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // Only check authentication for routes starting with '/app'
  if (to.path.startsWith('/app')) {
    if (!user.value) {
      // Check if there's a session saved in the cookies
      const { data: { session } } = await supabase.auth.getSession()
      console.log(session);
      
      if (!session) {
        return navigateTo('/login')
      }
    }
  }
})