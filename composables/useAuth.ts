import { SupabaseClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const router = useRouter()
  const toast = useToast()

  const loading = ref(false)
  const error = ref('')

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = ''
    
    try {
      const { data, error: authError } = await $supabase.client.auth.signInWithPassword({
        email,
        password,
      })
      
      if (authError) throw authError

      toast.add({
        title: 'Successfully logged in',
        color: 'green'
      })
      await router.push('/app')
    } catch (err: any) {
      error.value = err.message
      toast.add({
        title: err.message || 'Error during login',
        color: 'red'
      })
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    loading.value = true
    error.value = ''
    
    try {
      const { data, error: authError } = await $supabase.client.auth.signUp({
        email,
        password,
      })
      
      if (authError) throw authError

      toast.add({
        title: 'Registration successful',
        description: 'Please check your email for the confirmation link',
        color: 'green'
      })
      return true
    } catch (err: any) {
      error.value = err.message
      toast.add({
        title: err.message || 'Error during registration',
        color: 'red'
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const loginWithOtp = async (email: string) => {
    loading.value = true
    error.value = ''
    
    try {
      const { data, error: authError } = await $supabase.client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'http://localhost:3000/confirm',
        }
      })
      
      if (authError) throw authError

      toast.add({
        title: 'Magic link sent',
        description: 'Please check your email for the login link',
        color: 'green'
      })
      return true
    } catch (err: any) {
      error.value = err.message
      toast.add({
        title: err.message || 'Error sending magic link',
        color: 'red'
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      const { error: authError } = await $supabase.client.auth.signOut()
      if (authError) throw authError

      await router.push('/login')
      toast.add({
        title: 'Successfully logged out',
        color: 'green'
      })
    } catch (err: any) {
      toast.add({
        title: err.message || 'Error during logout',
        color: 'red'
      })
    }
  }

  return {
    login,
    register,
    loginWithOtp,
    logout,
    loading,
    error
  }
}
