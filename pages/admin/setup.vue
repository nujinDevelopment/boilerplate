<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Setup Administrator</h2>
        
        <div v-if="error" class="alert alert-error mb-4">
          {{ error }}
        </div>
        
        <div v-if="success" class="alert alert-success mb-4">
          {{ success }}
        </div>

        <form @submit.prevent="setupAdmin" v-if="!success">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              type="email" 
              v-model="email" 
              placeholder="admin@example.com"
              class="input input-bordered" 
              required
            />
          </div>
          
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              type="password" 
              v-model="password" 
              placeholder="••••••••"
              class="input input-bordered" 
              required
              minlength="8"
            />
          </div>

          <div class="form-control mt-6">
            <button 
              type="submit" 
              class="btn btn-primary" 
              :class="{ 'loading': loading }"
              :disabled="loading"
            >
              Create Admin Account
            </button>
          </div>
        </form>

        <div v-else class="text-center">
          <p class="mb-4">Admin account created successfully!</p>
          <NuxtLink to="/login" class="btn btn-primary">
            Go to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function setupAdmin() {
  try {
    loading.value = true
    error.value = ''
    
    const response = await $fetch('/api/setup-admin', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    success.value = 'Admin account created successfully! You can now log in.'
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Failed to create admin account'
  } finally {
    loading.value = false
  }
}

// Middleware to check if setup is allowed
definePageMeta({
  middleware: async (to) => {
    try {
      const { data: response } = await useFetch<{ data: Array<{ user_metadata: { role?: string } }> }>('/api/users')
      
      // If there are any users with admin role, redirect to login
      if (response.value?.data?.some(user => user.user_metadata?.role === 'admin')) {
        return navigateTo('/login')
      }
    } catch (err) {
      // If we can't access the users API (no admin exists yet), allow access to setup
      return
    }
  }
})
</script>
