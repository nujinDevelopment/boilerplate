<template>
  <div class="navbar fixed top-0 z-50 transition-all duration-300" :class="{ 'bg-base-100/80 backdrop-blur-lg border-b border-base-200': !isOnTop }">
    <div class="navbar-start">
      <NuxtLink class="flex items-center gap-3 p-4" to="/">
        <svg class="fill-primary w-8 h-8 transition-transform hover:scale-105" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g><g>
            <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
            <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
            <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
          </g></g>
        </svg>
        <span class="font-bold text-lg text-base-content">nujin</span>
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-4">
        <li><a href="#features" class="text-base-content/80 hover:text-primary transition-colors">Features</a></li>
        <li><a href="#code" class="text-base-content/80 hover:text-primary transition-colors">Code</a></li>
        <li><a href="#how-it-works" class="text-base-content/80 hover:text-primary transition-colors">How It Works</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <button @click="toggleTheme" class="btn btn-ghost btn-circle btn-sm mr-2">
        <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      </button>
      <NuxtLink class="btn btn-sm bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/80 hover:via-secondary/80 hover:to-accent/80 border-none text-white" to="/app">Launch App</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'

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
