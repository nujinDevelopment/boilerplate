<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section -->
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="flex justify-center w-full p-4">
            <svg class="fill-base-content w-24 h-24" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
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
    <div class="py-16 bg-base-100">
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
    <div class="py-16 bg-base-200">
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
    <div class="py-16 bg-base-100">
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
// Add any necessary imports or script logic here

const repoLink = "https://github.com/nujinDevelopment/boilerplate"
</script>

<style scoped>
/* Add any component-specific styles here */
</style>