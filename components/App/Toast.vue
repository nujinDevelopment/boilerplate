<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts } = useToast()
</script>

<template>
  <div class="toast toast-end z-50">
    <div
      v-for="toast in toasts"
      :key="toast.title"
      class="alert cursor-pointer"
      @click="() => toast.remove?.()"
      :class="{
        'alert-success': toast.color === 'green',
        'alert-error': toast.color === 'red',
        'alert-info': toast.color === 'blue',
        'alert-warning': toast.color === 'yellow'
      }"
    >
      <i v-if="toast.icon" :class="toast.icon"></i>
      <div>
        <h3 class="font-bold">{{ toast.title }}</h3>
        <div class="text-xs">{{ toast.description }}</div>
      </div>
    </div>
  </div>
</template>
