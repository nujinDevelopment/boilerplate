<template>
  <div class="py-24 bg-base-200 relative">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 max-w-4xl mx-auto shadow-xl overflow-hidden">
        <div class="card-body text-center relative">
          <!-- Decorative elements -->
          <div class="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div class="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full translate-x-16 translate-y-16"></div>
          
          <h2 class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient" data-aos="fade-up">
            Start Building Today
          </h2>
          <p class="text-xl mb-12 text-base-content/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Join developers worldwide who are building amazing applications with nujin
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn gap-2 bg-base-content border-none text-base-300 hover:btn-outline rounded rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </a>
            <a href="https://github.com/nujinDevelopment/boilerplate" target="_blank" rel="noopener noreferrer" class="btn btn-outline rounded rounded-full">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const repoLink = "https://github.com/nujinDevelopment/boilerplate"
</script>

<style scoped>
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
