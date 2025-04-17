<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-300">
    <LandingNavbar />
    <LandingHero />
    <LandingFeatures />
    <LandingCodePreview />
    <LandingQuickStart />
    <LandingCTA />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
  })
})
</script>

<style>
/* Clean transitions */
.transition-theme {
  @apply transition-all duration-300;
}
</style>
