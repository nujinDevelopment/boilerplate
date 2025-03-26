<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-medium">Subscription Plans</h2>
        <button @click="addPlan" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Add Plan
        </button>
      </div>

      <!-- Plans List -->
      <div class="space-y-6">
        <div v-for="(plan, index) in plans" :key="index" class="border rounded-lg p-4">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 mr-4">
              <input
                v-model="plan.name"
                type="text"
                placeholder="Plan Name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
            </div>
            <button @click="removePlan(index)" class="text-red-600 hover:text-red-800">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Price (Monthly)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  v-model="plan.price_monthly"
                  type="number"
                  min="0"
                  step="0.01"
                  class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price (Yearly)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  v-model="plan.price_yearly"
                  type="number"
                  min="0"
                  step="0.01"
                  class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700">Features</h4>
            <div v-for="(feature, featureIndex) in plan.features" :key="featureIndex" class="flex items-center space-x-2">
              <input
                v-model="feature.name"
                type="text"
                placeholder="Feature name"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
              <input
                v-model="feature.limit"
                type="number"
                min="0"
                placeholder="Limit (optional)"
                class="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
              <button @click="removeFeature(plan, featureIndex)" class="text-red-600 hover:text-red-800">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              @click="addFeature(plan)"
              class="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Feature
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="savePlans"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Plans
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNotification } from '~/composables/useNotification'

const notification = useNotification()

interface Feature {
  name: string
  limit?: number
}

interface Plan {
  name: string
  price_monthly: number
  price_yearly: number
  features: Feature[]
}

const plans = ref<Plan[]>([])

function addPlan() {
  plans.value.push({
    name: '',
    price_monthly: 0,
    price_yearly: 0,
    features: []
  })
}

function removePlan(index: number) {
  plans.value.splice(index, 1)
}

function addFeature(plan: Plan) {
  plan.features.push({
    name: '',
    limit: undefined
  })
}

function removeFeature(plan: Plan, index: number) {
  plan.features.splice(index, 1)
}

onMounted(async () => {
  try {
    const response = await fetch('/api/payment/plans')
    const data = await response.json()
    plans.value = data
  } catch (error) {
    notification.showNotification('Failed to load subscription plans', 'error')
  }
})

async function savePlans() {
  try {
    const response = await fetch('/api/payment/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plans.value)
    })
    
    if (response.ok) {
      notification.showNotification('Subscription plans saved successfully', 'success')
    } else {
      throw new Error('Failed to save plans')
    }
  } catch (error) {
    notification.showNotification('Failed to save subscription plans', 'error')
  }
}
</script>
