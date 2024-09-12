<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">{{ user ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input v-model="form.email" type="email" id="email" placeholder="Email" class="input input-bordered w-full" required>
        </div>
        <div class="form-control w-full mt-4" v-if="!user">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input v-model="form.password" type="password" id="password" placeholder="Password" class="input input-bordered w-full" required>
        </div>
        <div class="form-control w-full mt-4">
          <label class="label" for="name">
            <span class="label-text">Name</span>
          </label>
          <input v-model="form.name" type="text" id="name" placeholder="Name" class="input input-bordered w-full">
        </div>
        <div class="form-control w-full mt-4">
          <label class="label" for="role">
            <span class="label-text">Role</span>
          </label>
          <select v-model="form.role" id="role" class="input input-bordered select select-bordered w-full" required>
            <option value="" disabled>Select a role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>
        <div class="card-actions justify-end mt-6">
          <button type="submit" class="btn btn-primary">{{ user ? 'Update' : 'Create' }}</button>
          <button @click="handleCancel" type="button" class="btn">Cancel</button>
        </div>
      </form>
      <div v-if="user" class="mt-6">
        <button @click.prevent="handleResetPassword" class="btn btn-warning btn-block">
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUsers } from '../composables/useUsers'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['user-updated', 'user-created', 'cancel'])

const { createUser, updateUser, resetPassword } = useUsers()

const form = ref({
  email: '',
  password: '',
  name: '',
  role: ''
})

const resetForm = () => {
  form.value = {
    email: '',
    password: '',
    name: '',
    role: ''
  }
}

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = {
      email: newUser.email,
      password: '',
      name: newUser.user_metadata?.name || '',
      role: newUser.user_metadata?.role || ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = async () => {
  try {
    if (props.user) {
      const userData = {
        id: props.user.id,
        email: form.value.email,
        user_metadata: {
          name: form.value.name,
          role: form.value.role
        }
      }
      await updateUser(userData)
      emit('user-updated')
    } else {
      const userData = {
        email: form.value.email,
        password: form.value.password,
        user_metadata: {
          name: form.value.name,
          role: form.value.role
        }
      }
      await createUser(userData)
      emit('user-created')
    }
    resetForm()
  } catch (error) {
    console.error('Error submitting user data:', error)
    // You might want to show an error message to the user here
  }
}

const handleResetPassword = async () => {
  try {
    await resetPassword({
      id: props.user.id,
      email: form.value.email
    })
    alert('Password reset email sent to the user.')
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Failed to reset password. Please try again.')
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}
</script>