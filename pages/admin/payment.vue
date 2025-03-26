<template>
  <div class="space-y-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Payment Management</h1>
        <p class="mt-2 text-sm text-gray-700">
          Configure payment providers and manage subscription plans.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8">
      <!-- Payment Provider Configuration -->
      <AdminPaymentConfig />

      <!-- Subscription Plans -->
      <AdminSubscriptionPlans />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminPaymentConfig from '~/modules/payment/runtime/components/AdminPaymentConfig.vue'
import AdminSubscriptionPlans from '~/modules/payment/runtime/components/AdminSubscriptionPlans.vue'
definePageMeta({
  layout: 'admin',
  middleware: [
    function auth() {
      return true
    },
    function role() {
      return true
    }
  ],
  role: ['admin']
})
</script>
