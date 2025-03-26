<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

type LayoutName = 'admin' | 'app' | 'default'

const route = useRoute()

const layout = computed<LayoutName>(() => {
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
