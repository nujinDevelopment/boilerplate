import { ref } from 'vue'

export const useUsers = () => {
  const users = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await $fetch('/api/users')
      users.value = data
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = `Failed to fetch users: ${err.message}`
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (userData) => {
    error.value = null
    try {
      console.log('Creating user with data:', userData)
      const newUser = await $fetch('/api/users', {
        method: 'POST',
        body: userData
      })
      console.log('User created:', newUser)
      await fetchUsers()
    } catch (err) {
      console.error('Error creating user:', err)
      error.value = `Failed to create user: ${err.message}`
    }
  }

  const updateUser = async (userData) => {
    error.value = null
    try {
      await $fetch('/api/users', {
        method: 'PUT',
        body: userData
      })
      await fetchUsers()
    } catch (err) {
      console.error('Error updating user:', err)
      error.value = `Failed to update user: ${err.message}`
    }
  }

  const deleteUser = async (userId) => {
    error.value = null
    try {
      await $fetch('/api/users', {
        method: 'DELETE',
        body: { id: userId }
      })
      await fetchUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
      error.value = `Failed to delete user: ${err.message}`
    }
  }

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}