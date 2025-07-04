<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const register = ref(false)

const { login, register: signUp, loginWithOtp, loading, error } = useAuth()

const handleSubmit = async () => {
  if (register.value) {
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords don't match"
      return
    }
    const success = await signUp(email.value, password.value)
    if (success) {
      register.value = false
    }
  } else {
    await login(email.value, password.value)
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title text-center mb-8">{{ register ? 'Register' : 'Login' }}</h2>
        <form @submit.prevent="handleSubmit">
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
            <label class="label" for="password">
              <span class="label-text">Password</span>
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
              required
            />
          </div>
          <div v-if="register" class="form-control mt-4">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
              required
            />
          </div>
          <div v-if="error" class="text-error mt-4">{{ error }}</div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :class="{ 'loading': loading }">
              {{ register ? 'Register' : 'Login' }}
            </button>
          </div>
        </form>
        <div class="divider">OR</div>
        <button v-if="!register" @click="() => loginWithOtp(email)" class="btn btn-outline btn-primary" :class="{ 'loading': loading }">
          Sign In with Magic Link
        </button>
        <div class="text-center mt-4 flex flex-col">
          <a v-if="!register" href="#" class="link link-hover pr-2">Forgot password?</a>
          <a @click="register = !register" class="link link-hover">
            {{ register ? 'Already have an account? Login' : 'Don\'t have an account? Register' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
