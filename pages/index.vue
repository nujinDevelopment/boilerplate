<template>
  <div class="min-h-screen bg-base-200">
    <!-- Fixed Blurry Navbar -->
    <div class="navbar fixed top-0 z-50" :class="{ 'bg-base-100 bg-opacity-30 backdrop-blur-lg logo-visible': !isOnTop }">
      <div class="navbar-start">
        <NuxtLink class="flex justify-center w-full p-4" :class="{ 'hidden': isOnTop }" to="/">
          <svg 
            class="fill-base-content w-8 h-8 nujin-logo" 
            data-aos="zoom-in"
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            enable-background="new 0 0 512 512"
          >
            <g>
              <g>
                <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
                <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
                <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
              </g>
            </g>
          </svg>
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#cta">Get Started</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <NuxtLink class="btn btn-primary btn-outline" to="/app">Enter App</NuxtLink>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero min-h-screen bg-base-200" id="bg">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="flex justify-center w-full p-4">
            <svg class="fill-base-content w-64 h-64 nujin-logo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"
            
              :class="{ 'logo-visible': !isOnTop }"
              data-aos="zoom-in">
              <g>
                <g>
                  <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
                  <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
                  <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
                </g>
              </g>
            </svg>
          </div>
          <h1 class="text-5xl">nujin</h1>
          <p class="py-6">
            Build with ease.
          </p>
          <a
            :href="repoLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-base-100" id="features">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Nuxt.js PWA</h3>
              <p>
                Built on Nuxt.js, offering a powerful Progressive Web App
                experience out of the box.
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">DaisyUI Styling</h3>
              <p>
                Beautiful and customizable UI components powered by DaisyUI and
                Tailwind CSS.
              </p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Supabase Integration</h3>
              <p>
                Ready-to-use authentication and database solutions with Supabase
                integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <div class="py-16 bg-base-200" id="how-it-works">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">How It Works</h2>
        <ul class="steps steps-vertical lg:steps-horizontal w-full">
          <li class="step step-primary">Clone the repository</li>
          <li class="step step-primary">Configure Supabase</li>
          <li class="step step-primary">Customize components</li>
          <li class="step step-primary">Build your app</li>
          <li class="step step-primary">Deploy</li>
        </ul>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="py-16 bg-base-100" id="cta">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Build Your Web App?</h2>
        <p class="mb-8">
          Get started with nujin today and accelerate your development process.
        </p>
        <a
          :href="repoLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-lg"
        >
          Use This Template
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'
import AOS from 'aos'
import 'aos/dist/aos.css'

const repoLink = "https://github.com/nujinDevelopment/boilerplate"

const isOnTop = ref(true)
const { y } = useScroll(window)

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: false,
  })
})

// Watch for scroll changes
watch(y, (newY) => {
  isOnTop.value = newY === 0
})
</script>

<style scoped>
/* Add any component-specific styles here */
.bg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 50%, 1)'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='1' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
}

.nujin-logo {
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.nujin-logo.logo-visible {
  opacity: 1;
  transform: scale(1);
}
</style>