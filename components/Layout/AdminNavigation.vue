<script setup lang="ts">
const { adminNavigation } = useNavigation()
const currentRoute = useRoute()
</script>

<template>
  <template v-if="adminNavigation.length > 0">
    <li class="menu-title text-primary-content/90 font-bold text-lg">Admin</li>
    <li v-for="item in adminNavigation" :key="item.name">
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
</template>
