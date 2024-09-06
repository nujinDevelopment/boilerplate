<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loginError = ref('')
const register = ref(false)

const signInWithEmail = async () => {
  console.log('signInWithEmail function called')
  loginError.value = ''
  console.log('Attempting to sign in with email:', email.value)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    console.log('Sign in response:', { data, error })
    if (error) {
      loginError.value = error.message
      console.error('Sign in error:', error)
    } else {
      console.log('Sign in successful, redirecting to /app')
      navigateTo('/app')
    }
  } catch (e) {
    console.error('Unexpected error during sign in:', e)
    loginError.value = 'An unexpected error occurred'
  }
}

const signUp = async () => {
  console.log('signUp function called')
  loginError.value = ''
  if (password.value !== confirmPassword.value) {
    loginError.value = "Passwords don't match"
    return
  }
  console.log('Attempting to sign up with email:', email.value)
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    console.log('Sign up response:', { data, error })
    if (error) {
      loginError.value = error.message
      console.error('Sign up error:', error)
    } else {
      console.log('Sign up successful, check email for confirmation')
      alert('Please check your email for the confirmation link')
      register.value = false
    }
  } catch (e) {
    console.error('Unexpected error during sign up:', e)
    loginError.value = 'An unexpected error occurred'
  }
}

const signInWithOtp = async () => {
  loginError.value = ''
  console.log('Attempting to sign in with OTP for email:', email.value)
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  console.log('OTP sign in response:', { data, error })
  if (error) {
    loginError.value = error.message
    console.error('OTP sign in error:', error)
  } else {
    console.log('OTP sign in successful, check email for login link')
    alert('Please check your email for the login link')
  }
}

const handleSubmit = () => {
  console.log('Form submitted')
  if (register.value) {
    signUp()
  } else {
    signInWithEmail()
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
          <div v-if="loginError" class="text-error mt-4">{{ loginError }}</div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">{{ register ? 'Register' : 'Login' }}</button>
          </div>
        </form>
        <div class="divider">OR</div>
        <button v-if="!register" @click="signInWithOtp" class="btn btn-outline btn-primary">
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