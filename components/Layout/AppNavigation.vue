<script setup lang="ts">
const { appNavigation } = useNavigation()
const currentRoute = useRoute()
</script>

<template>
  <li class="menu-title text-primary-content/90 font-bold text-lg">App</li>
  <li v-for="item in appNavigation" :key="item.name">
    <a 
      :href="item.href"
      :class="[
        'flex items-center gap-3 py-3',
        { 
          'bg-white text-primary': item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href),
          'hover:bg-white hover:text-primary': !(item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href))
        }
      ]"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
      </svg>
      {{ item.name }}
    </a>
  </li>
</template>
