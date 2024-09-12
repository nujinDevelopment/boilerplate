import { ref, reactive } from 'vue'

export const useUsers = () => {
  const users = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const totalUsers = ref(0)

  const filters = reactive({
    email: '',
    name: '',
    role: ''
  })

  const pagination = reactive({
    page: 1,
    pageSize: 10
  })

  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data, total } = await $fetch('/api/users', {
        params: {
          ...filters,
          page: pagination.page,
          pageSize: pagination.pageSize
        }
      })
      users.value = data
      totalUsers.value = total
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = `Failed to fetch users: ${err.message}`
    } finally {
      isLoading.value = false
    }
  }

  const setFilters = (newFilters) => {
    Object.assign(filters, newFilters)
    pagination.page = 1 // Reset to first page when filters change
    fetchUsers()
  }

  const setPage = (page) => {
    pagination.page = page
    fetchUsers()
  }

  const setPageSize = (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1 // Reset to first page when page size changes
    fetchUsers()
  }

  const createUser = async (userData) => {
    error.value = null
    try {
      console.log('Creating user with data:', userData)
      const newUser = await $fetch('/api/users', {
        method: 'POST',
        body: {
          email: userData.email,
          password: userData.password,
          user_metadata: {
            name: userData.user_metadata.name,
          },
          role: userData.user_metadata.role // Send role as a separate field
        }
      })
      console.log('User created:', newUser)
      await fetchUsers()
    } catch (err) {
      console.error('Error creating user:', err)
      error.value = `Failed to create user: ${err.message}`
      throw err
    }
  }

  const updateUser = async (userData) => {
    error.value = null
    try {
      await $fetch('/api/users', {
        method: 'PUT',
        body: {
          id: userData.id,
          email: userData.email,
          user_metadata: {
            name: userData.user_metadata.name,
          },
          role: userData.user_metadata.role
        }
      })
      await fetchUsers()
    } catch (err) {
      console.error('Error updating user:', err)
      error.value = `Failed to update user: ${err.message}`
      throw err
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

  const resetPassword = async (user) => {
    error.value = null
    try {
      const response = await $fetch('/api/users', {
        method: 'POST',
        body: { id: user.id, email: user.email, action: 'reset_password' }
      })
      console.log('Password reset link:', response.resetLink)
      // In a production environment, you would typically send this link to the user's email
      // For this example, we're just logging it to the console
    } catch (err) {
      console.error('Error resetting password:', err)
      error.value = `Failed to reset password: ${err.message}`
      throw err
    }
  }

  return {
    users,
    isLoading,
    error,
    totalUsers,
    filters,
    pagination,
    fetchUsers,
    setFilters,
    setPage,
    setPageSize,
    createUser,
    updateUser,
    deleteUser,
    resetPassword
  }
}