<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">Users</h2>
      <div v-if="error" class="alert alert-error mb-6">{{ error }}</div>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th class="hidden md:table-cell">Created At</th>
              <th class="hidden lg:table-cell">Last Sign In</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
              </td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="5" class="text-center">No users found</td>
            </tr>
            <tr v-else v-for="user in users" :key="user.id" class="hover">
              <td>{{ user.email }}</td>
              <td>{{ user.user_metadata?.name || 'N/A' }}</td>
              <td class="hidden md:table-cell">{{ formatDate(user.created_at) }}</td>
              <td class="hidden lg:table-cell">{{ user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never' }}</td>
              <td>
                <div class="flex space-x-2">
                  <button @click="$emit('edit-user', user)" class="btn btn-sm btn-info">
                    Edit
                  </button>
                  <button @click="confirmDelete(user.id)" class="btn btn-sm btn-error">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from '../composables/useUsers'

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const { isLoading, error, deleteUser } = useUsers()

const emit = defineEmits(['edit-user'])

const confirmDelete = async (userId: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUser(userId)
    emit('user-deleted')
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>