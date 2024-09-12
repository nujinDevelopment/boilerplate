<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">{{ user ? 'Edit User' : 'Add User' }}</h2>
      <div v-if="error" class="alert alert-error mb-4">{{ error }}</div>
      <form @submit.prevent="handleSubmit">
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input v-model="form.email" type="email" id="email" placeholder="Email" class="input input-bordered w-full" required :disabled="!canEditEmail">
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
          <select v-model="form.role" id="role" class="input input-bordered select select-bordered w-full" required :disabled="!canChangeRole">
            <option value="" disabled>Select a role</option>
            <option v-for="role in availableRoles" :key="role" :value="role">{{ capitalizeFirstLetter(role) }}</option>
          </select>
        </div>
        <div class="card-actions justify-end mt-6">
          <button type="submit" class="btn btn-primary" :disabled="!canSubmit">{{ user ? 'Update' : 'Create' }}</button>
          <button @click="handleCancel" type="button" class="btn">Cancel</button>
        </div>
      </form>
      <div v-if="user && canResetPassword" class="mt-6">
        <button @click.prevent="handleResetPassword" class="btn btn-warning btn-block">
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUsers } from '../composables/useUsers'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['user-updated', 'user-created', 'cancel'])

const { createUser, updateUser, resetPassword, getCurrentUserRole, error } = useUsers()

const form = ref({
  email: '',
  password: '',
  name: '',
  role: ''
})

const currentUserRole = computed(() => getCurrentUserRole())

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

const canEditEmail = computed(() => !props.user || currentUserRole.value === 'admin')
const canChangeRole = computed(() => {
  if (currentUserRole.value === 'admin') return true
  if (currentUserRole.value === 'manager' && (!props.user || props.user.user_metadata?.role !== 'admin')) return true
  return false
})
const canResetPassword = computed(() => currentUserRole.value === 'admin' || currentUserRole.value === 'manager')
const canSubmit = computed(() => currentUserRole.value === 'admin' || (currentUserRole.value === 'manager' && (!props.user || props.user.user_metadata?.role !== 'admin')))

const availableRoles = computed(() => {
  if (currentUserRole.value === 'admin') return ['admin', 'manager', 'user']
  if (currentUserRole.value === 'manager') return ['manager', 'user']
  return ['user']
})

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
    // Error is now handled in the useUsers composable
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
    // Error is now handled in the useUsers composable
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const capitalizeFirstLetter = (string: string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>