<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">Users</h2>
      <div v-if="error" class="alert alert-error mb-6">{{ error }}</div>

      <!-- Advanced Filter Component -->
      <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <select v-model="filters.role" @change="applyFilters" class="input input-bordered w-full">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th class="hidden md:table-cell">Created At</th>
              <th class="hidden lg:table-cell">Last Sign In</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6" class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
              </td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="6" class="text-center">No users found</td>
            </tr>
            <tr v-else v-for="user in users" :key="user.id" class="hover">
              <td>{{ user.email }}</td>
              <td>{{ user.user_metadata?.name || 'N/A' }}</td>
              <td>{{ capitalizeFirstLetter(user.user_metadata?.role) || 'N/A' }}</td>
              <td class="hidden md:table-cell">{{ formatDate(user.created_at) }}</td>
              <td class="hidden lg:table-cell">{{ user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never' }}</td>
              <td>
                <div class="flex space-x-2">
                  <button @click="$emit('edit-user', user)" class="btn btn-sm btn-info" :disabled="!canEditUser(user)">
                    Edit
                  </button>
                  <button @click="openDeleteModal(user)" class="btn btn-sm btn-error" :disabled="!canDeleteUser(user)">
                    Delete
                  </button>
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
import { useUsers } from '../composables/useUsers'
import debounce from 'lodash/debounce'

const { users, isLoading, error, filters, pagination, totalUsers, fetchUsers, setFilters, setPage, setPageSize, deleteUser, getCurrentUserRole } = useUsers()

const emit = defineEmits(['edit-user', 'user-deleted'])

const userToDelete = ref(null)

const totalPages = computed(() => Math.ceil(totalUsers.value / pagination.pageSize))

const debouncedFilter = debounce(() => {
  applyFilters()
}, 300)

const applyFilters = () => {
  setFilters(filters)
}

const changePage = (page: number) => {
  setPage(page)
}

const updatePageSize = () => {
  setPageSize(pagination.pageSize)
}

const openDeleteModal = (user: any) => {
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
      // Error is now handled in the useUsers composable
    } finally {
      const modal = document.getElementById('delete_modal') as HTMLDialogElement
      modal.close()
      userToDelete.value = null
    }
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const capitalizeFirstLetter = (string: string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const canEditUser = (user: any) => {
  const currentUserRole = getCurrentUserRole()
  return currentUserRole === 'admin' || (currentUserRole === 'manager' && user.user_metadata?.role !== 'admin')
}

const canDeleteUser = (user: any) => {
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