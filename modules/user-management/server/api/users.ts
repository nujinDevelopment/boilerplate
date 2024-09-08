import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)

  if (event.req.method === 'GET') {
    const { data, error } = await client.auth.admin.listUsers()
    
    if (error) {
      console.error('Error fetching users:', error)
      throw createError({ statusCode: 500, statusMessage: 'Error fetching users' })
    }
    return data.users
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event)
    console.log('Received user data:', body)
    const { email, password, user_metadata, action } = body

    if (action === 'reset_password') {
      try {
        const { data, error } = await client.auth.admin.generateLink({
          type: 'recovery',
          userId: body.id,
        })

        if (error) {
          console.error('Error generating password reset link:', error)
          throw createError({ statusCode: 500, statusMessage: 'Error generating password reset link' })
        }

        // In a production environment, you would typically send this link to the user's email
        // For this example, we'll just return it
        return { resetLink: data.properties.action_link }
      } catch (error) {
        console.error('Unexpected error resetting password:', error)
        throw createError({ statusCode: 500, statusMessage: `Unexpected error resetting password: ${error.message}` })
      }
    } else {
      try {
        const { data, error } = await client.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata
        })

        if (error) {
          console.error('Error creating user:', error)
          throw createError({ statusCode: 500, statusMessage: `Error creating user: ${error.message}` })
        }
        return data.user
      } catch (error) {
        console.error('Unexpected error creating user:', error)
        throw createError({ statusCode: 500, statusMessage: `Unexpected error creating user: ${error.message}` })
      }
    }
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event)
    const { id, email, user_metadata } = body
    const { data, error } = await client.auth.admin.updateUserById(id, { email, user_metadata })

    if (error) {
      console.error('Error updating user:', error)
      throw createError({ statusCode: 500, statusMessage: 'Error updating user' })
    }
    return data.user
  }

  if (event.req.method === 'DELETE') {
    const body = await readBody(event)
    const { id } = body
    const { error } = await client.auth.admin.deleteUser(id)

    if (error) {
      console.error('Error deleting user:', error)
      throw createError({ statusCode: 500, statusMessage: 'Error deleting user' })
    }
    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})