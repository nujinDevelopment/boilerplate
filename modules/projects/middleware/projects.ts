import { useSupabaseUser } from '#imports'
import { useUsers } from '~/modules/user-management/composables/useUsers'
import { useProjects } from '../composables/useProjects'

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const { getCurrentUserRole } = useUsers()
  const { getProject } = useProjects()

  if (!user.value) {
    return navigateTo('/login')
  }

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
        
        // Check if the user is associated with the project
        // This is a placeholder - you need to implement the actual check based on your data structure
        const userIsAssociatedWithProject = project.members?.includes(user.value.id) || false

        if (userIsAssociatedWithProject) {
          // Allow view access
          if (to.path === `/app/projects/${projectId}`) {
            return
          }

          // Allow edit access for managers
          if (to.path === `/app/projects/${projectId}/edit` && userRole === 'manager') {
            return
          }
        }
      } catch (error) {
        console.error('Error checking project access:', error)
        // If there's an error, deny access
        return navigateTo('/app/projects')
      }
    }
  }

  // If the user doesn't have permission, redirect to the projects list page
  return navigateTo('/app/projects', { 
    query: { 
      error: 'unauthorized',
      message: 'You do not have permission to access this page.'
    }
  })
})