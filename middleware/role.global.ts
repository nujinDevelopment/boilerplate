import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const config = useRuntimeConfig()

  // Wait for user to be loaded
  await until(user)

  const userRole = user.value?.user_metadata?.role

  // Define role requirements for specific routes
  const roleRequirements = {
    '/app/users': ['admin', 'manager'],
    '/api/users': ['admin', 'manager'],
    '/app/logs': ['admin'], // Add logs page with admin-only access
    '/api/logs': ['admin'], // Add logs API route with admin-only access
    // Add more routes and their role requirements here
  }

  // Function to check if the user has the required role
  const hasRequiredRole = (requiredRoles) => {
    if (!requiredRoles) return true
    return requiredRoles.includes(userRole)
  }

  // Check if it's an API route
  if (to.path.startsWith('/api/')) {
    const requiredRoles = roleRequirements[to.path]
    if (!hasRequiredRole(requiredRoles)) {
      // For API routes, return an error response
      return new Response('Unauthorized', { status: 403 })
    }
  } else {
    // For page routes
    const requiredRoles = roleRequirements[to.path]
    if (!hasRequiredRole(requiredRoles)) {
      // Redirect to an unauthorized page or show an error
      return navigateTo('/unauthorized')
    }
  }

  // If the user has the required role or no role is required, allow access
  return
})