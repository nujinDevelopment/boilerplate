import { defineEventHandler, readBody, H3Error } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)

  // Check if any admin users already exist
  const { data: existingUsers, error: listError } = await client.auth.admin.listUsers()
  
  if (listError) {
    throw new H3Error(`Error checking existing users: ${listError.message}`)
  }

  if (!existingUsers?.users) {
    throw new H3Error('Invalid response when checking existing users')
  }

  const hasAdmin = existingUsers.users.some(
    user => user.user_metadata?.role === 'admin'
  )

  if (hasAdmin) {
    throw new H3Error('Admin user already exists')
  }

  // Create first admin user
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw new H3Error('Email and password are required')
  }

  const { data: newUser, error: adminError } = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { 
      role: 'admin',
      name: 'System Administrator'
    }
  })

  if (adminError) {
    throw new H3Error(`Error creating admin user: ${adminError.message}`)
  }

  return {
    message: 'Admin user created successfully',
    user: newUser.user
  }
})
