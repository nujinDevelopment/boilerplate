<template>
  <div>
    <ContentForm :content-id="Array.isArray($route.params.id) ? $route.params.id[0] : $route.params.id" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app'
})
</script>
