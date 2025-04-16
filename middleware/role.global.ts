import { until } from '@vueuse/core'
import { navigateTo, useSupabaseUser, useRuntimeConfig, createError } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const config = useRuntimeConfig()

  // Skip role check for setup page
  if (to.path === '/setup') {
    return
  }

  // Wait for user to be loaded
  await until(user)

  const userRole = user.value?.user_metadata?.role

  // Define role requirements for specific routes
  const roleRequirements: Record<string, string[]> = {
    '/app/users': ['admin', 'manager'],
    '/api/users': ['admin', 'manager'],
    '/app/logs': ['admin'],
    '/api/logs': ['admin'],
  }

  // Function to check if the user has the required role
  const hasRequiredRole = (requiredRoles?: string[]): boolean => {
    if (!requiredRoles) return true
    return requiredRoles.includes(userRole as string)
  }

  // Check if it's an API route
  if (to.path.startsWith('/api/')) {
    const requiredRoles = roleRequirements[to.path]
    if (!hasRequiredRole(requiredRoles)) {
      throw createError({ statusCode: 403, statusMessage: 'Unauthorized' })
    }
  } else {
    // For page routes
    const requiredRoles = roleRequirements[to.path]
    if (!hasRequiredRole(requiredRoles)) {
      return navigateTo('/unauthorized')
    }
  }
})
