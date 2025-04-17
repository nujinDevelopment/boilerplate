<template>
  <div class="py-32 bg-base-100 relative" id="how-it-works">
    <div class="container mx-auto px-4">
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
          Quick Start Guide
        </h2>
        <p class="text-xl text-base-content/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Get up and running in minutes
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <div class="card bg-base-200/50 backdrop-blur-sm" data-aos="fade-up">
          <div class="card-body items-center text-center">
            <div class="w-12 h-12 mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">1. Clone</h3>
            <p class="text-base-content/70 text-sm">Clone the repository and install dependencies</p>
          </div>
        </div>

        <div class="card bg-base-200/50 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="100">
          <div class="card-body items-center text-center">
            <div class="w-12 h-12 mb-4 text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">2. Configure</h3>
            <p class="text-base-content/70 text-sm">Set up your environment variables</p>
          </div>
        </div>

        <div class="card bg-base-200/50 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="200">
          <div class="card-body items-center text-center">
            <div class="w-12 h-12 mb-4 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">3. Customize</h3>
            <p class="text-base-content/70 text-sm">Modify components and styles</p>
          </div>
        </div>

        <div class="card bg-base-200/50 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
          <div class="card-body items-center text-center">
            <div class="w-12 h-12 mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">4. Deploy</h3>
            <p class="text-base-content/70 text-sm">Build and deploy your app</p>
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
