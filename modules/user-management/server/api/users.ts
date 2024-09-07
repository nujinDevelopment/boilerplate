import { defineEventHandler, readBody } from 'h3'
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
    const { email, password, user_metadata } = body
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

  if (event.req.method === 'PUT') {
    const body = await readBody(event)
    const { id, ...updateData } = body
    const { data, error } = await client.auth.admin.updateUserById(id, updateData)

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