import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  // // Wait for user to be loaded
  // await until(user).not.toBeNull()

  const userRole = user.value?.user_metadata?.role

  // Define role requirements for specific routes
  const roleRequirements = {
    '/app/users': ['admin', 'manager'],
    // Add more routes and their role requirements here
  }

  const requiredRoles = roleRequirements[to.path]

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    R// Redirect to an unauthorized page or show an error
    return navigateTo('/unauthorized')
  }
})