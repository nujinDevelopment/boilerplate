import { ref, computed } from 'vue'
import type { SubscriptionPlan, UserSubscription } from '../types'

export function useSubscription() {
  const currentPlan = ref<SubscriptionPlan | null>(null)
  const subscription = ref<UserSubscription | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isSubscribed = computed(() => {
    return subscription.value?.status === 'active'
  })

  const hasFeature = (featureName: string) => {
    if (!currentPlan.value || !isSubscribed.value) return false
    return currentPlan.value.features.some(f => f.name === featureName)
  }

  const getFeatureLimit = (featureName: string): number | undefined => {
    if (!currentPlan.value || !isSubscribed.value) return undefined
    const feature = currentPlan.value.features.find(f => f.name === featureName)
    return feature?.limit
  }

  const loadSubscription = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/payment/check-subscription')
      if (!response.ok) throw new Error('Failed to load subscription')
      
      const data = await response.json()
      subscription.value = data.subscription
      currentPlan.value = data.plan
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      subscription.value = null
      currentPlan.value = null
    } finally {
      loading.value = false
    }
  }

  const subscribe = async (planId: string, interval: 'monthly' | 'yearly') => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ planId, interval })
      })

      if (!response.ok) throw new Error('Failed to initiate subscription')

      const data = await response.json()
      
      // Handle different payment providers
      if (data.provider === 'stripe') {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else if (data.provider === 'revolut') {
        // Handle Revolut payment flow
        window.location.href = data.url
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const cancelSubscription = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/payment/cancel-subscription', {
        method: 'POST'
      })

      if (!response.ok) throw new Error('Failed to cancel subscription')

      const data = await response.json()
      subscription.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  // Load subscription on composable initialization
  loadSubscription()

  return {
    currentPlan,
    subscription,
    loading,
    error,
    isSubscribed,
    hasFeature,
    getFeatureLimit,
    loadSubscription,
    subscribe,
    cancelSubscription
  }
}
