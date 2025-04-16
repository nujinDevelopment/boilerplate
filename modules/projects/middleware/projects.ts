import { navigateTo, useSupabaseUser } from '#imports'
import { useUsers } from '~/modules/user-management/composables/useUsers'
import { useProjects } from '../composables/useProjects'
import type { Database } from '../types/database.types'

type Project = Database['public']['Tables']['projects']['Row']

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  
  if (!user.value) {
    return navigateTo('/login')
  }
  
  try {

    const { getCurrentUserRole } = useUsers()
    const { getProject } = useProjects()
    const userRole = getCurrentUserRole()

    // Allow admins to access all project routes
    if (userRole === 'admin') {
      return
    }

    // For managers and regular users, implement specific access controls
    if (userRole === 'manager' || userRole === 'user') {
      // Allow access to projects list
      if (to.path === '/app/projects') {
        return
      }

      // Allow managers to create new projects
      if (to.path === '/app/projects/create' && userRole === 'manager') {
        return
      }

      // For individual project routes
      const projectIdMatch = to.path.match(/^\/app\/projects\/([^\/]+)/)
      if (projectIdMatch) {
        const projectId = projectIdMatch[1]
        
        try {
          const project = await getProject(projectId)
          
          // Check if user owns this project or is a manager
          if (project.owner_id === user.value.id || userRole === 'manager') {
            // Allow both view and edit access
            return
          }
        } catch (error) {
          console.error('Error checking project access:', error)
          // If there's an error, deny access
          return navigateTo('/app/projects')
        }
      }
    }

    // If the user doesn't have permission, redirect to the projects list page
    return navigateTo('/app/projects')
  } catch (error) {
    console.error('Error in projects middleware:', error)
    return navigateTo('/login')
  }
})
