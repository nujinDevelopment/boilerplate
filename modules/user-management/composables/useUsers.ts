import { ref, reactive } from 'vue'
import { useSupabaseUser } from '#imports'

interface User {
  id: string
  email?: string
  user_metadata: {
    name?: string
    role?: string
  }
  [key: string]: any
}

interface UserListResponse {
  data: User[]
  total: number
}

interface ResetPasswordResponse {
  resetLink: string
}

type ApiResponse = User | UserListResponse | ResetPasswordResponse | { success: boolean }

export const useUsers = () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
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

  interface ApiError {
    response?: {
      status?: number
    }
    message?: string
  }

  const handleApiError = (err: unknown) => {
    console.error('API Error:', err)
    const apiError = err as ApiError
    if (apiError.response?.status === 403) {
      error.value = 'You do not have permission to perform this action.'
    } else {
      error.value = `An error occurred: ${apiError.message || 'Unknown error'}`
    }
    throw err
  }

  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch<UserListResponse>('/api/users', {
        params: {
          ...filters,
          page: pagination.page,
          pageSize: pagination.pageSize
        }
      })
      users.value = response.data
      totalUsers.value = response.total
    } catch (err) {
      handleApiError(err)
    } finally {
      isLoading.value = false
    }
  }

  interface Filters {
    email?: string
    name?: string
    role?: string
  }

  const setFilters = (newFilters: Partial<Filters>) => {
    Object.assign(filters, newFilters)
    pagination.page = 1 // Reset to first page when filters change
    fetchUsers()
  }

  const setPage = (page: number) => {
    pagination.page = page
    fetchUsers()
  }

  const setPageSize = (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1 // Reset to first page when page size changes
    fetchUsers()
  }

  interface CreateUserData {
    email: string
    password: string
    user_metadata: {
      name: string
      role: string
    }
  }

  const createUser = async (userData: CreateUserData) => {
    error.value = null
    try {
      console.log('Creating user with data:', userData)
      const newUser = await $fetch('/api/users', {
        method: 'POST',
        body: {
          email: userData.email,
          password: userData.password,
          user_metadata: userData.user_metadata,
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

  interface UpdateUserData {
    id: string
    email: string
    user_metadata: {
      name: string
      role?: string
    }
  }

  const updateUser = async (userData: UpdateUserData) => {
    error.value = null
    try {
      const updatedUser = await $fetch('/api/users', {
        method: 'PUT',
        body: {
          id: userData.id,
          email: userData.email,
          user_metadata: userData.user_metadata,
          role: userData.user_metadata.role
        }
      })
      await fetchUsers()
      return updatedUser
    } catch (err) {
      handleApiError(err)
    }
  }

  const deleteUser = async (userId: string) => {
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

  const resetPassword = async (user: User) => {
    error.value = null
    try {
      const response = await $fetch<ResetPasswordResponse>('/api/users', {
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
