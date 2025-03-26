<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium mb-4">Payment Provider Configuration</h2>
      
      <!-- Stripe Configuration -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-md font-medium">Stripe</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="config.providers.stripe.enabled" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div v-if="config.providers.stripe.enabled" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Public Key</label>
            <input type="text" v-model="config.providers.stripe.publicKey" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Secret Key</label>
            <input type="password" v-model="config.providers.stripe.secretKey" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Webhook Secret</label>
            <input type="password" v-model="config.providers.stripe.webhookSecret" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
        </div>
      </div>

      <!-- Revolut Configuration -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-md font-medium">Revolut</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="config.providers.revolut.enabled" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div v-if="config.providers.revolut.enabled" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Public Key</label>
            <input type="text" v-model="config.providers.revolut.publicKey" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Secret Key</label>
            <input type="password" v-model="config.providers.revolut.secretKey" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Webhook Secret</label>
            <input type="password" v-model="config.providers.revolut.webhookSecret" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button @click="saveConfig" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Save Configuration
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotification } from '~/composables/useNotification'

const notification = useNotification()

const config = ref({
  providers: {
    stripe: {
      enabled: false,
      publicKey: '',
      secretKey: '',
      webhookSecret: ''
    },
    revolut: {
      enabled: false,
      publicKey: '',
      secretKey: '',
      webhookSecret: ''
    }
  }
})

onMounted(async () => {
  try {
    const response = await fetch('/api/payment/config')
    const data = await response.json()
    config.value = data
  } catch (error) {
    notification.showNotification('Failed to load payment configuration', 'error')
  }
})

async function saveConfig() {
  try {
    const response = await fetch('/api/payment/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config.value)
    })
    
    if (response.ok) {
      notification.showNotification('Payment configuration saved successfully', 'success')
    } else {
      throw new Error('Failed to save configuration')
    }
  } catch (error) {
    notification.showNotification('Failed to save payment configuration', 'error')
  }
}
</script>
