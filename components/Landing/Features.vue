<template>
  <div class="py-32 bg-base-100 relative" id="features">
    <div class="container mx-auto px-4">
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent" data-aos="fade-up">
          Everything You Need
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Built with modern tools and best practices to help you ship faster
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature Cards -->
        <div class="card bg-base-200/50 backdrop-blur-sm hover:bg-base-200 transition-all duration-300" data-aos="fade-up">
          <div class="card-body">
            <div class="w-12 h-12 mb-6 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="card-title text-2xl mb-4">Nuxt 3 Powered</h3>
            <p class="text-base-content/70">
              Built on the latest version of Nuxt.js with TypeScript support, auto-imports, and modern development features.
            </p>
            <div class="card-actions justify-start mt-6">
              <div class="badge badge-primary">Vue 3</div>
              <div class="badge badge-primary">TypeScript</div>
              <div class="badge badge-primary">SSR</div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200/50 backdrop-blur-sm hover:bg-base-200 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
          <div class="card-body">
            <div class="w-12 h-12 mb-6 text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="card-title text-2xl mb-4">Modern UI Kit</h3>
            <p class="text-base-content/70">
              Beautiful and customizable components with DaisyUI and Tailwind CSS for rapid development.
            </p>
            <div class="card-actions justify-start mt-6">
              <div class="badge badge-secondary">DaisyUI</div>
              <div class="badge badge-secondary">Tailwind</div>
              <div class="badge badge-secondary">Responsive</div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200/50 backdrop-blur-sm hover:bg-base-200 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
          <div class="card-body">
            <div class="w-12 h-12 mb-6 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 class="card-title text-2xl mb-4">Authentication Ready</h3>
            <p class="text-base-content/70">
              Pre-configured authentication system with role-based access control and user management.
            </p>
            <div class="card-actions justify-start mt-6">
              <div class="badge badge-accent">Auth</div>
              <div class="badge badge-accent">RBAC</div>
              <div class="badge badge-accent">JWT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply transition-all duration-300;
}

.card:hover svg {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
