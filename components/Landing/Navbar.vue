<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import Logo from '../Layout/Logo.vue'

const isOnTop = ref(true)
const { y } = useScroll(window)
const theme = ref('light')

const toggleTheme = () => {
  if (process.client) {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }
}

watch(y, (newY) => {
  isOnTop.value = newY < 50
})

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.value = savedTheme
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme.value)
    }
  }
})
</script>

<template>
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
    <nav class="navbar bg-base-300/70 backdrop-blur-xl shadow-lg rounded-full border border-base-content/10">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost rounded-full" to="/">
          <Logo class="h-full w-full p-2" fillColor="fill-base-content" />
        </NuxtLink>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden lg:flex flex-none gap-1">
        <a href="#features" class="btn btn-ghost rounded-full text-base-content">Features</a>
        <a href="#code" class="btn btn-ghost rounded-full text-base-content">Code</a>
        <a href="#how-it-works" class="btn btn-ghost rounded-full text-base-content">How It Works</a>
        
        <div class="divider divider-horizontal mx-0 before:bg-base-content/20 after:bg-base-content/20"></div>
        
        <button @click="toggleTheme" class="btn btn-ghost btn-circle">
          <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
        </button>
        
        <NuxtLink class="btn btn-primary rounded-full" to="/app">Launch App</NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex-none lg:hidden">
        <label for="mobile-menu" class="btn btn-square btn-ghost text-base-content">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
    </nav>

    <!-- Mobile Menu Drawer -->
    <div class="drawer lg:hidden">
      <input id="mobile-menu" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label for="mobile-menu" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 navbar-blur text-base-content">
          <li class="menu-title mt-4 text-base-content/60">Navigation</li>
          <li><a href="#features" class="text-base-content">Features</a></li>
          <li><a href="#code" class="text-base-content">Code</a></li>
          <li><a href="#how-it-works" class="text-base-content">How It Works</a></li>
          
          <li class="menu-title mt-4 text-base-content/60">App</li>
          <li>
            <NuxtLink to="/app" class="btn btn-primary mt-2">
              Launch App
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-blur {
  backdrop-filter: blur(12px);
}
</style>
