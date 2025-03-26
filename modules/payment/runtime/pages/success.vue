<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div v-if="loading" class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="mt-4 text-lg text-gray-600">Confirming your subscription...</p>
      </div>

      <div v-else-if="error" class="text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">Payment Failed</h3>
        <p class="mt-2 text-sm text-gray-500">{{ error }}</p>
        <div class="mt-6">
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">Payment Successful</h3>
        <p class="mt-2 text-sm text-gray-500">Thank you for your subscription!</p>
        <div class="mt-6">
          <NuxtLink
            to="/app"
            class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useSubscription } from '../composables/useSubscription'

const route = useRoute()
const router = useRouter()
const { loadSubscription } = useSubscription()

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const sessionId = route.query.session_id

  if (!sessionId) {
    error.value = 'Invalid session'
    loading.value = false
    return
  }

  try {
    // Wait a moment for the webhook to process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reload subscription status
    await loadSubscription()
    
    loading.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred'
    loading.value = false
  }
})
</script>
