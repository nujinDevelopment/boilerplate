<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ user ? 'Edit User' : 'Create User' }}</h3>
        <form @submit.prevent="handleSubmit" class="mt-2 text-left">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required>
          </div>
          <div class="mb-4" v-if="!user">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="form.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
          </div>
          <div class="flex items-center justify-between mb-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {{ user ? 'Update' : 'Create' }}
            </button>
            <button @click="$emit('close')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Cancel
            </button>
          </div>
          <div v-if="user" class="text-center">
            <button @click.prevent="handleResetPassword" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const { createUser, updateUser, resetPassword } = useUsers()

const form = ref({
  email: '',
  password: '',
  name: ''
})

onMounted(() => {
  if (props.user) {
    form.value = {
      ...form.value,
      ...props.user,
      ...props.user.user_metadata
    }
  }
})

const handleSubmit = async () => {
  try {
    if (props.user) {
      const userData = {
        id: props.user.id,
        email: form.value.email,
        user_metadata: {
          name: form.value.name
        }
      }
      await updateUser(userData)
    } else {
      const userData = {
        email: form.value.email,
        password: form.value.password,
        user_metadata: {
          name: form.value.name
        }
      }
      await createUser(userData)
    }
    emit('close')
  } catch (error) {
    console.error('Error submitting user data:', error)
    // You might want to show an error message to the user here
  }
}

const handleResetPassword = async () => {
  try {
    await resetPassword(props.user.id)
    alert('Password reset email sent to the user.')
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Failed to reset password. Please try again.')
  }
}
</script>