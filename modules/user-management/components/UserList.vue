<template>
  <div>
    <button @click="showCreateForm = true" class="btn btn-primary mb-4">Add User</button>
    <div v-if="error" class="alert alert-error mb-4">{{ error }}</div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Last Sign In</th>
            <th>User Metadata</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="6" class="text-center">Loading users...</td>
          </tr>
          <tr v-else-if="users.length === 0">
            <td colspan="6" class="text-center">No users found</td>
          </tr>
          <tr v-else v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ new Date(user.created_at).toLocaleString() }}</td>
            <td>{{ user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never' }}</td>
            <td>{{ JSON.stringify(user.user_metadata) }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-sm btn-info mr-2">Edit</button>
              <button @click="confirmDelete(user.id)" class="btn btn-sm btn-error">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserForm
      v-if="showCreateForm"
      @close="closeForm"
    />
    <UserForm
      v-if="editingUser"
      :user="editingUser"
      @close="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers'
import UserForm from './UserForm.vue'

const { users, isLoading, error, fetchUsers, deleteUser } = useUsers()

const showCreateForm = ref(false)
const editingUser = ref(null)

onMounted(async () => {
  await fetchUsers()
})

const editUser = (user) => {
  editingUser.value = user
}

const confirmDelete = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUser(userId)
  }
}

const closeForm = () => {
  showCreateForm.value = false
  editingUser.value = null
  fetchUsers()
}
</script>