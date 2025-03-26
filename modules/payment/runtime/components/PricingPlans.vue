<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose Your Plan
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          Select the plan that best fits your needs
        </p>
      </div>

      <!-- Billing Toggle -->
      <div class="mt-12 flex justify-center">
        <div class="relative self-center rounded-lg bg-gray-100 p-0.5">
          <button
            v-for="option in ['Monthly', 'Yearly']"
            :key="option"
            :class="[
              billingInterval === option.toLowerCase()
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-700',
              'relative w-28 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-32'
            ]"
            @click="billingInterval = option.toLowerCase() as 'monthly' | 'yearly'"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="mt-12 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="mt-12 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Plans Grid -->
      <div v-else class="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm"
        >
          <div class="p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ plan.name }}
            </h3>
            <p class="mt-4 text-sm text-gray-500">
              {{ plan.description }}
            </p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">${{ billingInterval === 'monthly' ? plan.price_monthly : plan.price_yearly }}</span>
              <span class="text-base font-medium text-gray-500">/{{ billingInterval === 'monthly' ? 'mo' : 'yr' }}</span>
            </p>
            <button
              :class="[
                currentPlan?.name === plan.name
                  ? 'bg-gray-200 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700',
                'mt-8 block w-full rounded-md py-2 px-4 text-center text-sm font-semibold text-white'
              ]"
              :disabled="loading || currentPlan?.name === plan.name"
              @click="handleSubscribe(plan.name)"
            >
              {{ currentPlan?.name === plan.name ? 'Current Plan' : 'Subscribe' }}
            </button>
          </div>
          <div class="px-6 pt-6 pb-8">
            <h4 class="text-sm font-medium text-gray-900">Features included:</h4>
            <ul class="mt-6 space-y-4">
              <li
                v-for="feature in plan.features"
                :key="feature.name"
                class="flex space-x-3"
              >
                <svg class="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-gray-500">
                  {{ feature.name }}
                  <span v-if="feature.limit" class="text-gray-400">
                    (up to {{ feature.limit }})
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSubscription } from '../composables/useSubscription'
import type { SubscriptionPlan } from '../types'

const billingInterval = ref<'monthly' | 'yearly'>('monthly')
const plans = ref<SubscriptionPlan[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const { currentPlan, subscribe } = useSubscription()

async function loadPlans() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/payment/plans')
    if (!response.ok) throw new Error('Failed to load plans')
    plans.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load plans'
  } finally {
    loading.value = false
  }
}

async function handleSubscribe(planId: string) {
  try {
    await subscribe(planId, billingInterval.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initiate subscription'
  }
}

onMounted(() => {
  loadPlans()
})
</script>
