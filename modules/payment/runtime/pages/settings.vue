<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="space-y-6">
      <!-- Current Plan -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Current Subscription</h2>

        <div v-if="loading" class="flex justify-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div v-else-if="error" class="text-red-600">
          {{ error }}
        </div>

        <div v-else-if="!currentPlan" class="text-center py-6">
          <p class="text-gray-500 mb-4">You don't have an active subscription</p>
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Plans
          </NuxtLink>
        </div>

        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Plan</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">{{ currentPlan.name }}</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500">Status</h3>
              <p class="mt-1">
                <span
                  :class="[
                    subscription?.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  ]"
                >
                  {{ subscription?.status === 'active' ? 'Active' : 'Inactive' }}
                </span>
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500">Price</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">
                ${{ currentPlan.price_monthly }}/month
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500">Renewal Date</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">
                {{ subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A' }}
              </p>
            </div>
          </div>

          <!-- Features -->
          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-500 mb-3">Features</h3>
            <ul class="space-y-3">
              <li
                v-for="feature in currentPlan.features"
                :key="feature.name"
                class="flex items-start"
              >
                <svg class="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-2 text-gray-700">
                  {{ feature.name }}
                  <span v-if="feature.limit" class="text-gray-500">
                    (up to {{ feature.limit }})
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <NuxtLink
              to="/pricing"
              class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Change Plan
            </NuxtLink>
            <button
              v-if="subscription?.status === 'active' && !subscription?.cancelAtPeriodEnd"
              @click="handleCancel"
              class="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :disabled="loading"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      <!-- Billing History -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Billing History</h2>
        <p class="text-gray-500 text-sm">
          View and download your billing history in your payment provider's dashboard.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSubscription } from '../composables/useSubscription'
import { useNotification } from '~/composables/useNotification'

const notification = useNotification()
const { currentPlan, subscription, loading, error, cancelSubscription } = useSubscription()

async function handleCancel() {
  try {
    await cancelSubscription()
    notification.showNotification('Subscription cancelled successfully', 'success')
  } catch (e) {
    notification.showNotification(
      e instanceof Error ? e.message : 'Failed to cancel subscription',
      'error'
    )
  }
}
</script>
