<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'
import AdminNavigation from './AdminNavigation.vue'
import Logo from './Logo.vue'

const { logout } = useAuth()
const { adminNavigation } = useNavigation()

defineProps<{
  mobile?: boolean
}>()
</script>

<template>
  <ul :class="[
    'menu p-4 flex flex-col text-primary-content',
    mobile ? 'w-80 min-h-[100dvh] bg-primary backdrop-blur-sm' : 'h-full'
  ]">
    <li class="">
      <a href="/" class="flex items-center justify-center">
        <Logo class="w-8 h-8" />
      </a>
    </li>
    
    <AppNavigation :class="{ 'mt-8': adminNavigation.length > 0 }" />

    <AdminNavigation />
    
    <li class="mt-auto pt-4 border-t border-primary-content/10">
      <a @click="logout" class="flex items-center gap-3 py-3 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Logout
      </a>
    </li>
  </ul>
</template>
