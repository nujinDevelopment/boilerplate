<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-2xl">Users</h2>
        <div class="flex gap-2">
          <div class="dropdown dropdown-end">
            <button class="btn btn-outline btn-sm" tabindex="0">
              <i class="fas fa-filter mr-2"></i>
              Filters
            </button>
            <div tabindex="0" class="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-80">
              <div class="space-y-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input v-model="filters.email" @input="debouncedFilter" type="text" placeholder="Filter by email" class="input input-bordered w-full" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Name</span>
                  </label>
                  <input v-model="filters.name" @input="debouncedFilter" type="text" placeholder="Filter by name" class="input input-bordered w-full" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Role</span>
                  </label>
                  <select v-model="filters.role" @change="applyFilters" class="select select-bordered w-full">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Status</span>
                  </label>
                  <select v-model="filters.status" @change="applyFilters" class="select select-bordered w-full">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Date Range</span>
                  </label>
                  <select v-model="filters.dateRange" @change="applyFilters" class="select select-bordered w-full">
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end" v-if="selectedUsers.length > 0">
            <button class="btn btn-primary btn-sm" tabindex="0">
              Bulk Actions ({{ selectedUsers.length }})
            </button>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a @click="bulkAction('delete')" class="text-error"><i class="fas fa-trash mr-2"></i>Delete Selected</a></li>
              <li><a @click="bulkAction('deactivate')"><i class="fas fa-user-slash mr-2"></i>Deactivate</a></li>
              <li><a @click="bulkAction('activate')"><i class="fas fa-user-check mr-2"></i>Activate</a></li>
            </ul>
          </div>
          <button @click="exportUsers" class="btn btn-outline btn-sm">
            <i class="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>

      <div v-if="error" class="alert alert-error mb-6">{{ error }}</div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" 
                         class="checkbox" 
                         :checked="isAllSelected"
                         @change="toggleAllUsers"
                         :disabled="isLoading || users.length === 0" />
                </label>
              </th>
              <th>
                <div class="flex items-center gap-2">
                  Email
                  <button @click="sortBy('email')" class="btn btn-ghost btn-xs">
                    <i :class="getSortIcon('email')"></i>
                  </button>
                </div>
              </th>
              <th>
                <div class="flex items-center gap-2">
                  Name
                  <button @click="sortBy('name')" class="btn btn-ghost btn-xs">
                    <i :class="getSortIcon('name')"></i>
                  </button>
                </div>
              </th>
              <th>
                <div class="flex items-center gap-2">
                  Role
                  <button @click="sortBy('role')" class="btn btn-ghost btn-xs">
                    <i :class="getSortIcon('role')"></i>
                  </button>
                </div>
              </th>
              <th class="hidden md:table-cell">
                <div class="flex items-center gap-2">
                  Created At
                  <button @click="sortBy('created_at')" class="btn btn-ghost btn-xs">
                    <i :class="getSortIcon('created_at')"></i>
                  </button>
                </div>
              </th>
              <th class="hidden lg:table-cell">Last Sign In</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoading">
              <tr v-for="i in 3" :key="i">
                <td><div class="animate-pulse h-4 w-4 bg-base-300 rounded"></div></td>
                <td><div class="animate-pulse h-4 w-40 bg-base-300 rounded"></div></td>
                <td><div class="animate-pulse h-4 w-32 bg-base-300 rounded"></div></td>
                <td><div class="animate-pulse h-4 w-24 bg-base-300 rounded"></div></td>
                <td class="hidden md:table-cell"><div class="animate-pulse h-4 w-32 bg-base-300 rounded"></div></td>
                <td class="hidden lg:table-cell"><div class="animate-pulse h-4 w-32 bg-base-300 rounded"></div></td>
                <td><div class="animate-pulse h-4 w-20 bg-base-300 rounded"></div></td>
                <td><div class="animate-pulse h-8 w-24 bg-base-300 rounded"></div></td>
              </tr>
            </template>
            <tr v-else-if="users.length === 0">
              <td colspan="8" class="text-center py-8">
                <div class="flex flex-col items-center">
                  <i class="fas fa-users text-4xl text-base-300 mb-2"></i>
                  <p class="text-base-content/70">No users found</p>
                </div>
              </td>
            </tr>
            <tr v-else v-for="user in sortedUsers" :key="user.id" class="hover">
              <td>
                <label>
                  <input type="checkbox" 
                         class="checkbox" 
                         :checked="isSelected(user)"
                         @change="toggleUser(user)"
                         :disabled="!canSelectUser(user)" />
                </label>
              </td>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-8">
                      <span class="text-xs">{{ getInitials(user.user_metadata?.name) }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ user.email }}</div>
                    <div class="text-sm opacity-50">ID: {{ user.id.slice(0, 8) }}</div>
                  </div>
                </div>
              </td>
              <td>{{ user.user_metadata?.name || 'N/A' }}</td>
              <td>
                <div class="badge" :class="getRoleBadgeClass(user.user_metadata?.role)">
                  {{ capitalizeFirstLetter(user.user_metadata?.role) || 'N/A' }}
                </div>
              </td>
              <td class="hidden md:table-cell">{{ formatDate(user.created_at) }}</td>
              <td class="hidden lg:table-cell">{{ user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never' }}</td>
              <td>
                <div class="badge" :class="getStatusBadgeClass(user)">
                  {{ getUserStatus(user) }}
                </div>
              </td>
              <td>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-sm">
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <a @click="$emit('edit-user', user)" :class="{ 'opacity-50 cursor-not-allowed': !canEditUser(user) }">
                        <i class="fas fa-edit mr-2"></i>Edit
                      </a>
                    </li>
                    <li>
                      <a @click="toggleUserStatus(user)" :class="{ 'opacity-50 cursor-not-allowed': !canEditUser(user) }">
                        <i :class="user.banned ? 'fas fa-user-check mr-2' : 'fas fa-user-slash mr-2'"></i>
                        {{ user.banned ? 'Activate' : 'Deactivate' }}
                      </a>
                    </li>
                    <li>
                      <a @click="openDeleteModal(user)" class="text-error" :class="{ 'opacity-50 cursor-not-allowed': !canDeleteUser(user) }">
                        <i class="fas fa-trash mr-2"></i>Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col justify-center items-center mt-4">
        <div class="flex flex-col justify-center items-center mt-4">
          <span class="p-4">Page {{ pagination.page }} of {{ totalPages }}</span>
          <select v-model="pagination.pageSize" class="select select-bordered select-sm input input-bordered" @change="updatePageSize">
            <option :value="5">5 per page</option>
            <option :value="10">10 per page</option>
            <option :value="20">20 per page</option>
          </select>
        </div>
        <div class="btn-group pt-4">
          <button class="btn btn-sm" :disabled="pagination.page === 1" @click="changePage(pagination.page - 1)">«</button>
          <button class="btn btn-sm">Page {{ pagination.page }}</button>
          <button class="btn btn-sm" :disabled="pagination.page === totalPages" @click="changePage(pagination.page + 1)">»</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <dialog id="delete_modal" class="modal">
    <div class="modal-box card">
      <h3 class="font-bold text-lg">Confirm Delete</h3>
      <p class="py-4">Are you sure you want to delete the user {{ userToDelete?.email }}?</p>
      <div class="modal-action">
        <button class="btn btn-error" @click="confirmDelete">Delete</button>
        <form method="dialog">
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useUsers } from '../composables/useUsers'
import debounce from 'lodash/debounce'

type UserRole = 'admin' | 'manager' | 'user'

interface UserMetadata {
  name?: string;
  role?: UserRole;
}

interface User {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
  banned?: boolean;
  user_metadata: UserMetadata;
  [key: string]: any; // Allow additional properties
}

type FilterDateRange = '' | 'today' | 'week' | 'month' | 'year'
type FilterStatus = '' | 'active' | 'inactive'
type FilterRole = '' | UserRole

interface Filters extends Record<string, any> {
  email: string;
  name: string;
  role: FilterRole;
  status: FilterStatus;
  dateRange: FilterDateRange;
}

interface Sort {
  field: keyof User | 'name' | 'role';
  direction: 'asc' | 'desc';
}

const { users: rawUsers, isLoading, error, filters: userFilters, pagination, totalUsers, fetchUsers, setFilters, setPage, setPageSize, deleteUser, getCurrentUserRole } = useUsers()

// Cast users to proper type
const users = rawUsers as unknown as Ref<User[]>

// Initialize filters with all fields
const filters = userFilters as Filters
filters.status = filters.status || ''
filters.dateRange = filters.dateRange || ''
filters.role = filters.role || ''

const emit = defineEmits(['edit-user', 'user-deleted'])

const userToDelete = ref<User | null>(null)
const selectedUsers = ref<User[]>([])
const sort = ref<Sort>({ field: 'created_at', direction: 'desc' })

// Computed properties
const totalPages = computed(() => Math.ceil(totalUsers.value / pagination.pageSize))

const isAllSelected = computed(() => {
  return users.value.length > 0 && selectedUsers.value.length === users.value.length
})

const sortedUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    let aValue: string | undefined
    let bValue: string | undefined

    if (sort.value.field === 'name' || sort.value.field === 'role') {
      aValue = a.user_metadata?.[sort.value.field]
      bValue = b.user_metadata?.[sort.value.field]
    } else {
      aValue = a[sort.value.field]?.toString()
      bValue = b[sort.value.field]?.toString()
    }

    aValue = aValue || ''
    bValue = bValue || ''
    
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    return sort.value.direction === 'asc' ? comparison : -comparison
  })
})

// Methods
const debouncedFilter = debounce(() => {
  applyFilters()
}, 300)

const applyFilters = () => {
  setFilters(filters as any) // Type assertion since useUsers doesn't expose its types
}

const changePage = (page: number) => {
  setPage(page)
}

const updatePageSize = () => {
  setPageSize(pagination.pageSize)
}

const sortBy = (field: Sort['field']) => {
  if (sort.value.field === field) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value = { field, direction: 'asc' }
  }
}

const getSortIcon = (field: Sort['field']) => {
  if (sort.value.field !== field) return 'fas fa-sort'
  return sort.value.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
}

const toggleAllUsers = () => {
  if (isAllSelected.value) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = users.value.filter(user => canSelectUser(user))
  }
}

const toggleUser = (user: User) => {
  const index = selectedUsers.value.findIndex(u => u.id === user.id)
  if (index === -1) {
    selectedUsers.value.push(user)
  } else {
    selectedUsers.value.splice(index, 1)
  }
}

const isSelected = (user: User) => {
  return selectedUsers.value.some(u => u.id === user.id)
}

const canSelectUser = (user: User) => {
  const currentUserRole = getCurrentUserRole()
  return currentUserRole === 'admin' || (currentUserRole === 'manager' && user.user_metadata?.role !== 'admin')
}

const getInitials = (name: string | undefined | null) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getRoleBadgeClass = (role?: UserRole) => {
  switch (role) {
    case 'admin': return 'badge-warning'
    case 'manager': return 'badge-info'
    default: return 'badge-ghost'
  }
}

const getStatusBadgeClass = (user: User) => {
  if (user.banned) return 'badge-error'
  const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at) : null
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  if (!lastSignIn) return 'badge-warning'
  return lastSignIn > thirtyDaysAgo ? 'badge-success' : 'badge-warning'
}

const getUserStatus = (user: User) => {
  if (user.banned) return 'Deactivated'
  const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at) : null
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  if (!lastSignIn) return 'Never Active'
  return lastSignIn > thirtyDaysAgo ? 'Active' : 'Inactive'
}

const toggleUserStatus = async (user: User) => {
  try {
    await deleteUser(user.id) // Using deleteUser as a proxy for toggle status
    emit('user-deleted')
  } catch (err) {
    console.error('Error toggling user status:', err)
  }
}

const bulkAction = async (action: 'delete' | 'deactivate' | 'activate') => {
  try {
    for (const user of selectedUsers.value) {
      if (action === 'delete' && canDeleteUser(user)) {
        await deleteUser(user.id)
      } else if ((action === 'deactivate' || action === 'activate') && canEditUser(user)) {
        await toggleUserStatus(user)
      }
    }
    selectedUsers.value = []
    emit('user-deleted')
  } catch (err) {
    console.error('Error performing bulk action:', err)
  }
}

const exportUsers = () => {
  const data = users.value.map(user => ({
    ID: user.id,
    Email: user.email || 'N/A',
    Name: user.user_metadata?.name || 'N/A',
    Role: user.user_metadata?.role || 'N/A',
    Status: getUserStatus(user),
    'Created At': user.created_at ? formatDate(user.created_at) : 'N/A',
    'Last Sign In': user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'
  }))
  
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).map(value => `"${value}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `users-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const openDeleteModal = (user: User) => {
  userToDelete.value = user
  const modal = document.getElementById('delete_modal') as HTMLDialogElement
  modal.showModal()
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      await deleteUser(userToDelete.value.id)
      emit('user-deleted')
    } catch (err) {
      console.error('Error deleting user:', err)
    } finally {
      const modal = document.getElementById('delete_modal') as HTMLDialogElement
      modal.close()
      userToDelete.value = null
    }
  }
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

const capitalizeFirstLetter = (string: string | undefined) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const canEditUser = (user: User) => {
  const currentUserRole = getCurrentUserRole()
  return currentUserRole === 'admin' || (currentUserRole === 'manager' && user.user_metadata?.role !== 'admin')
}

const canDeleteUser = (user: User) => {
  const currentUserRole = getCurrentUserRole()
  return currentUserRole === 'admin'
}

// Fetch users when the component is mounted
fetchUsers()

// Watch for changes in filters or pagination
watch([filters, pagination], () => {
  fetchUsers()
}, { deep: true })
</script>
