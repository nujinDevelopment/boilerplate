<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loginError = ref('')

const signInWithEmail = async () => {
  loginError.value = ''
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    loginError.value = error.message
  } else {
    // Redirect to dashboard or home page
    navigateTo('/app')
  }
}

const signInWithOtp = async () => {
  loginError.value = ''
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) {
    loginError.value = error.message
  } else {
    // Show message to check email
    alert('Please check your email for the login link')
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title text-center mb-8">Login</h2>
        <form @submit.prevent="signInWithEmail">
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
          <div v-if="loginError" class="text-error mt-4">{{ loginError }}</div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <div class="divider">OR</div>
        <button @click="signInWithOtp" class="btn btn-outline btn-primary">
          Sign In with Magic Link
        </button>
        <div class="text-center mt-4">
          <a href="#" class="link link-hover">Forgot password?</a>
        </div>
      </div>
    </div>
  </div>
</template>