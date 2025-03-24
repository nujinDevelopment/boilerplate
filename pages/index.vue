<template>
  <div class="min-h-screen bg-base-200">
    <!-- Modern Navbar with Glassmorphism -->
    <div class="navbar fixed top-0 z-50 transition-all duration-300" :class="{ 'bg-base-100/80 backdrop-blur-lg shadow-lg': !isOnTop }">
      <div class="navbar-start">
        <NuxtLink class="flex items-center gap-2 p-4" :class="{ 'opacity-0': isOnTop }" to="/">
          <svg class="fill-primary w-8 h-8 transition-transform hover:rotate-12" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g><g>
              <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
              <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
              <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
            </g></g>
          </svg>
          <span class="font-bold text-lg text-primary">nujin</span>
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-2">
          <li><a href="#features" class="btn btn-ghost btn-sm rounded-lg">Features</a></li>
          <li><a href="#how-it-works" class="btn btn-ghost btn-sm rounded-lg">How It Works</a></li>
          <li><a href="#cta" class="btn btn-ghost btn-sm rounded-lg">Get Started</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <NuxtLink class="btn btn-primary" to="/app">Launch App</NuxtLink>
      </div>
    </div>

    <!-- Enhanced Hero Section with Dynamic Shapes -->
    <div class="hero min-h-screen relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent" id="hero">
      <!-- Animated Background Shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
      
      <div class="hero-content text-center relative z-10">
        <div class="max-w-2xl">
          <div class="flex justify-center w-full p-4" data-aos="zoom-in">
            <svg class="fill-white w-32 h-32 md:w-48 md:h-48 transition-all duration-700 hover:scale-110 animate-float" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g><g>
                <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
                <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
                <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
              </g></g>
            </svg>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-8 text-white" data-aos="fade-up">
            <span class="animate-text-gradient">nujin</span>
          </h1>
          <p class="text-xl md:text-2xl mb-12 text-white/90" data-aos="fade-up" data-aos-delay="100">
            Build modern web applications with elegance and efficiency.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="200">
            <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn btn-lg glass text-white gap-2 hover:bg-white hover:text-primary transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </a>
            <a href="#features" class="btn btn-lg btn-ghost text-white hover:bg-white/10">Learn More</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-base-100 relative" id="features">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" data-aos="fade-up">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300" data-aos="fade-up">
            <div class="card-body">
              <div class="w-16 h-16 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="card-title text-2xl mb-4">Nuxt.js PWA</h3>
              <p class="text-base-content/70">
                Built on Nuxt.js, offering a powerful Progressive Web App experience with instant loading and offline capabilities.
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            <div class="card-body">
              <div class="w-16 h-16 mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="card-title text-2xl mb-4">DaisyUI Styling</h3>
              <p class="text-base-content/70">
                Beautiful and customizable UI components powered by DaisyUI and Tailwind CSS for stunning, responsive designs.
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <div class="card-body">
              <div class="w-16 h-16 mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 class="card-title text-2xl mb-4">Supabase Integration</h3>
              <p class="text-base-content/70">
                Ready-to-use authentication and database solutions with Supabase integration for rapid development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced How It Works Section with 3D Modular Design -->
    <div class="py-24 relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent" id="how-it-works">
      <!-- Animated Module Shapes -->
      <div class="absolute inset-0">
        <div class="module-shape module-1"></div>
        <div class="module-shape module-2"></div>
        <div class="module-shape module-3"></div>
      </div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-white" data-aos="fade-up">How It Works</h2>
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="card glass backdrop-blur-lg" data-aos="fade-up">
              <div class="card-body text-white">
                <div class="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center">Clone Repository</h3>
              </div>
            </div>
            
            <div class="card glass backdrop-blur-lg" data-aos="fade-up" data-aos-delay="100">
              <div class="card-body text-white">
                <div class="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center">Configure Supabase</h3>
              </div>
            </div>
            
            <div class="card glass backdrop-blur-lg" data-aos="fade-up" data-aos-delay="200">
              <div class="card-body text-white">
                <div class="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center">Customize Components</h3>
              </div>
            </div>
            
            <div class="card glass backdrop-blur-lg" data-aos="fade-up" data-aos-delay="300">
              <div class="card-body text-white">
                <div class="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center">Build & Deploy</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="py-24 bg-base-100 relative" id="cta">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent" data-aos="fade-up">
            Ready to Build Something Amazing?
          </h2>
          <p class="text-xl mb-12 text-base-content/80" data-aos="fade-up" data-aos-delay="100">
            Start building your next web application with nujin's modern stack and accelerate your development process.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Use This Template
            </a>
            <a href="https://github.com/nujinDevelopment/boilerplate" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import AOS from 'aos'
import 'aos/dist/aos.css'

const repoLink = "https://github.com/nujinDevelopment/boilerplate"

const isOnTop = ref(true)
const { y } = useScroll(window)

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
  })
})

watch(y, (newY) => {
  isOnTop.value = newY < 50
})
</script>

<style>
/* Animated Background Shapes */
.floating-shape {
  @apply absolute rounded-3xl opacity-20 backdrop-blur-3xl;
  animation: float 20s infinite;
}

.shape-1 {
  @apply bg-white/30 w-64 h-64 -top-32 -left-32;
  animation-delay: 0s;
}

.shape-2 {
  @apply bg-white/20 w-96 h-96 top-1/4 -right-48;
  animation-delay: -5s;
}

.shape-3 {
  @apply bg-white/30 w-72 h-72 bottom-1/4 -left-36;
  animation-delay: -10s;
}

.shape-4 {
  @apply bg-white/20 w-80 h-80 -bottom-40 right-1/4;
  animation-delay: -15s;
}

/* Module Shapes for How It Works Section */
.module-shape {
  @apply absolute rounded-2xl opacity-10 backdrop-blur-xl;
  animation: moduleFloat 15s infinite;
}

.module-1 {
  @apply bg-white/20 w-48 h-48 top-1/4 -left-24;
  animation-delay: 0s;
}

.module-2 {
  @apply bg-white/30 w-64 h-64 bottom-1/4 -right-32;
  animation-delay: -5s;
}

.module-3 {
  @apply bg-white/20 w-56 h-56 top-3/4 left-1/4;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
  }
}

@keyframes moduleFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, -50px) rotate(90deg);
  }
  50% {
    transform: translate(0, -100px) rotate(180deg);
  }
  75% {
    transform: translate(-50px, -50px) rotate(270deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white;
  background-size: 200% auto;
  animation: textGradient 4s linear infinite;
}

@keyframes textGradient {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Glass Effect Enhancements */
.glass {
  @apply hover:bg-white/20 transition-all duration-300;
}

/* Timeline Styles */
.timeline-vertical {
  @apply grid grid-cols-1 gap-8;
}

.timeline-horizontal {
  @apply grid grid-cols-4 gap-8;
}

.timeline-start {
  @apply text-lg font-medium text-base-content;
}

.timeline-middle {
  @apply flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto my-4;
}
</style>
