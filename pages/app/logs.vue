<template>
  <div>
    <LogList />
  </div>
</template>

<script setup lang="ts">
import LogList from '~/modules/logging/components/LogList.vue'

// Add page meta data
definePageMeta({
  pageName: 'Logs'
});
</script>