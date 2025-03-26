import { ref } from 'vue'

export const useSubscribe = () => {
  const subscribing = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const subscribe = async (email: string) => {
    if (!email) {
      error.value = 'Email is required'
      return
    }

    subscribing.value = true
    error.value = null
    success.value = false

    try {
      const response = await $fetch('/api/subscribe', {
        method: 'POST',
        body: { email }
      })

      success.value = true
    } catch (e: any) {
      error.value = e.message || 'Something went wrong'
    } finally {
      subscribing.value = false
    }
  }

  return {
    subscribe,
    subscribing,
    error,
    success
  }
}
