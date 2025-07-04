<script setup lang="ts">
import '@/assets/css/gradient-overrides.css'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { LayoutKey } from '#app'

const route = useRoute()

// Initialize theme
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'system'
  
  if (savedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', systemTheme)
  } else {
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})

const layout = computed<LayoutKey>(() => {
  if (route.path.startsWith('/admin')) return 'admin'
  if (route.path.startsWith('/app')) return 'app'
  return 'default'
})
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
