<script setup lang="ts">
import { ref } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)

// Load user's email when component mounts
onMounted(() => {
  if (user.value) {
    email.value = user.value.email || ''
  }
})

const updateProfile = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    // Update email if changed
    if (email.value !== user.value?.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email: email.value })
      if (emailError) throw emailError
    }

    // Update password if provided
    if (newPassword.value) {
      if (newPassword.value !== confirmPassword.value) {
        throw new Error("Passwords don't match")
      }
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword.value })
      if (passwordError) throw passwordError
    }

    successMessage.value = 'Profile updated successfully'
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Profile Settings</h1>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <form @submit.prevent="updateProfile">
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="email@example.com"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-4">
            <label class="label" for="newPassword">
              <span class="label-text">New Password</span>
            </label>
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-4">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm New Password</span>
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
            />
          </div>
          <div v-if="error" class="text-error mt-4">{{ error }}</div>
          <div v-if="successMessage" class="text-success mt-4">{{ successMessage }}</div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Updating...' : 'Update Profile' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
