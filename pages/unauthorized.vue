<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p class="text-xl mb-8">Sorry, you don't have permission to access this page.</p>
      <NuxtLink to="/app" class="btn btn-primary">Go to Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  pageName: 'Unauthorized'
});
</script>