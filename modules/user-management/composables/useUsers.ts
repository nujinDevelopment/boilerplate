import { ref, reactive } from 'vue'
import { useSupabaseUser } from '#imports'

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

  const getCurrentUserRole = () => {
    const user = useSupabaseUser()
    return user.value?.user_metadata?.role || null
  }

  const handleApiError = (err) => {
    console.error('API Error:', err)
    if (err.response?.status === 403) {
      error.value = 'You do not have permission to perform this action.'
    } else {
      error.value = `An error occurred: ${err.message}`
    }
    throw err
  }

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
      handleApiError(err)
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
          role: userData.user_metadata.role
        }
      })
      console.log('User created:', newUser)
      await fetchUsers()
      return newUser
    } catch (err) {
      handleApiError(err)
    }
  }

  const updateUser = async (userData) => {
    error.value = null
    try {
      const updatedUser = await $fetch('/api/users', {
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
      return updatedUser
    } catch (err) {
      handleApiError(err)
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
      handleApiError(err)
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
      return response.resetLink
    } catch (err) {
      handleApiError(err)
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
    resetPassword,
    getCurrentUserRole
  }
}