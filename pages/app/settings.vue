<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUsers } from '~/modules/user-management/composables/useUsers'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { updateUser } = useUsers()

const email = ref('')
const name = ref('')
const role = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)

// Add page meta data
definePageMeta({
  pageName: 'Profile Settings'
});

// Load user's information when component mounts
onMounted(async () => {
  if (user.value) {
    const { data: { user: userData }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      error.value = userError.message
      return
    }
    email.value = userData.email || ''
    name.value = userData.user_metadata?.name || ''
    role.value = userData.user_metadata?.role || ''
  }
})

const isAdmin = computed(() => role.value === 'admin')
const isManager = computed(() => role.value === 'manager')

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

    // Update name and role
    const { error: updateError } = await updateUser({
      id: user.value?.id,
      email: email.value,
      user_metadata: {
        name: name.value,
        role: role.value
      }
    })
    if (updateError) throw updateError

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
    <div class="card bg-base-100 shadow">
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
            <label class="label" for="name">
              <span class="label-text">Name</span>
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Your Name"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-4">
            <label class="label" for="role">
              <span class="label-text">Role</span>
            </label>
            <input
              id="role"
              v-model="role"
              type="text"
              class="input input-bordered"
              disabled
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

        <!-- Role-specific settings -->
        <div v-if="isAdmin || isManager" class="mt-8">
          <h2 class="text-xl font-semibold mb-4">Advanced Settings</h2>
          <div v-if="isAdmin" class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Enable system-wide maintenance mode</span> 
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
          <div v-if="isManager || isAdmin" class="form-control mt-4">
            <label class="label cursor-pointer">
              <span class="label-text">Receive daily user activity reports</span> 
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
