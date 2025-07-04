<script setup lang="ts">
import Logo from '../Layout/Logo.vue'
const repoLink = "https://github.com/nujinDevelopment/boilerplate"
</script>

<template>
  <div class="hero min-h-screen bg-base-100 relative overflow-hidden" id="hero">
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-blob"></div>
      <div class="absolute w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute w-96 h-96 bg-accent/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
    
    <div class="hero-content text-center relative z-10 px-4">
      <div class="max-w-3xl">
        <Logo class="w-16 h-16 mx-auto mb-8" fillColor="fill-base-content" data-aos="fade-down" />

        <h1 class="text-3xl pb-4">nujin</h1>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm mb-8" data-aos="fade-down">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <span class="text-sm text-base-content/70">Supercharge your development workflow</span>
        </div>
        <h1 class="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient" data-aos="fade-up">
          Build Better Apps Faster
        </h1>
        <p class="text-xl md:text-2xl mb-12 text-base-content/80" data-aos="fade-up" data-aos-delay="100">
          The modern full-stack boilerplate for building exceptional web applications with Nuxt 3.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="200">
          <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn gap-2 bg-base-content border-none text-base-300 hover:btn-outline rounded rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started
          </a>
          <a href="#features" class="btn btn-ghost rounded rounded-full">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Gradient animation */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
