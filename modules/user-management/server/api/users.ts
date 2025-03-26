import { defineEventHandler, readBody, getQuery, createError } from 'h3'
import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

const ROLES = ['admin', 'manager', 'user']

const ROLE_PERMISSIONS = {
  GET: ['admin', 'manager'],
  POST: ['admin'],
  PUT: ['admin'],
  DELETE: ['admin']
}

const checkUserRole = (userRole: string, allowedRoles: string[]): boolean => {
  return allowedRoles.includes(userRole)
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const userRole = user.user_metadata?.role

  if (!userRole || !ROLES.includes(userRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid user role' })
  }

  if (event.req.method === 'GET') {
    if (!checkUserRole(userRole, ROLE_PERMISSIONS.GET)) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    const query = getQuery(event)
    const { email, name, role, page = 1, pageSize = 10 } = query

    try {
      const { data: userData, error } = await client.auth.admin.listUsers()
    
      if (error) {
        console.error('Error fetching users:', error)
        throw createError({ statusCode: 500, statusMessage: 'Error fetching users' })
      }

      if (!userData || !Array.isArray(userData.users)) {
        console.error('Invalid user data received:', userData)
        throw createError({ statusCode: 500, statusMessage: 'Invalid user data received' })
      }

      let users = userData.users

      // Apply filters
      if (email) {
        users = users.filter(user => user.email?.toLowerCase().includes(String(email).toLowerCase()) ?? false)
      }
      if (name) {
        users = users.filter(user => user.user_metadata?.name?.toLowerCase().includes(String(name).toLowerCase()))
      }
      if (role) {
        users = users.filter(user => user.user_metadata?.role === role)
      }

      const total = users.length

      // Apply pagination
      const startIndex = (Number(page) - 1) * Number(pageSize)
      const endIndex = startIndex + Number(pageSize)
      users = users.slice(startIndex, endIndex)

      return { data: users, total }
    } catch (err: unknown) {
      console.error('Unexpected error in GET /api/users:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw createError({ statusCode: 500, statusMessage: `Unexpected error: ${errorMessage}` })
    }
  }

  if (event.req.method === 'POST') {
    if (!checkUserRole(userRole, ROLE_PERMISSIONS.POST)) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    const body = await readBody(event)
    console.log('Received user data:', body)
    const { email, password, user_metadata, action, role } = body

    if (action === 'reset_password') {
      try {
        console.log('Attempting to reset password for user ID:', body.id)
        
        const { data, error } = await client.auth.admin.generateLink({
          type: 'recovery',
          email: body.email,
        })

        if (error) {
          console.error('Error generating password reset link:', error)
          throw createError({ statusCode: 500, statusMessage: `Error generating password reset link: ${error.message}` })
        }

        if (!data || !data.properties || !data.properties.action_link) {
          console.error('Invalid response from generateLink:', data)
          throw createError({ statusCode: 500, statusMessage: 'Invalid response when generating password reset link' })
        }

        console.log('Successfully generated password reset link')
        return { resetLink: data.properties.action_link }
      } catch (error: unknown) {
        console.error('Unexpected error resetting password:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Unexpected error resetting password: ${errorMessage}` })
      }
    } else {
      try {
        console.log('Attempting to create user with role:', role)
        if (!role || !ROLES.includes(role)) {
          console.error('Invalid role received:', role)
          throw createError({ statusCode: 400, statusMessage: `Invalid role: ${role}` })
        }

        const { data, error } = await client.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { ...user_metadata, role }
        })

        if (error) {
          console.error('Error creating user:', error)
          throw createError({ statusCode: 500, statusMessage: `Error creating user: ${error.message}` })
        }
        console.log('User created successfully:', data.user)
        return data.user
      } catch (error: unknown) {
        console.error('Unexpected error creating user:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Unexpected error creating user: ${errorMessage}` })
      }
    }
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event)
    console.log('Received update user data:', body)
    const { id, email, user_metadata, role } = body

    // Allow users to update their own profile, but require admin role for updating other users
    if (id !== user.id && !checkUserRole(userRole, ROLE_PERMISSIONS.PUT)) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    if (role && !ROLES.includes(role)) {
      console.error('Invalid role received for update:', role)
      throw createError({ statusCode: 400, statusMessage: `Invalid role: ${role}` })
    }

    const updatedMetadata = role ? { ...user_metadata, role } : user_metadata
    const { data, error } = await client.auth.admin.updateUserById(id, { email, user_metadata: updatedMetadata })

    if (error) {
      console.error('Error updating user:', error)
      throw createError({ statusCode: 500, statusMessage: 'Error updating user' })
    }
    console.log('User updated successfully:', data.user)
    return data.user
  }

  if (event.req.method === 'DELETE') {
    if (!checkUserRole(userRole, ROLE_PERMISSIONS.DELETE)) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    const body = await readBody(event)
    const { id } = body
    console.log('Attempting to delete user with ID:', id)
    const { error } = await client.auth.admin.deleteUser(id)

    if (error) {
      console.error('Error deleting user:', error)
      throw createError({ statusCode: 500, statusMessage: 'Error deleting user' })
    }
    console.log('User deleted successfully')
    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
