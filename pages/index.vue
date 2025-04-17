<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-300">
    <!-- Floating Navbar -->
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
        <NuxtLink class="btn btn-primary btn-sm" to="/app">Launch App</NuxtLink>
      </div>
    </div>

    <!-- Dynamic Hero Section -->
    <div class="hero min-h-screen bg-base-100 relative overflow-hidden" id="hero">
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-blob"></div>
        <div class="absolute w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute w-96 h-96 bg-accent/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div class="hero-content text-center relative z-10 px-4">
        <div class="max-w-3xl">
          <svg class="w-16 h-16 mx-auto mb-8 fill-white" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-aos="fade-down">
            <g><g>
              <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
              <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
              <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
            </g></g>
          </svg>
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
            <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </a>
            <a href="#features" class="btn btn-ghost">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
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

    <!-- Code Preview Section -->
    <div class="py-32 bg-base-200 relative" id="code">
      <div class="container mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
            Clean & Modern Code
          </h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Write better code with TypeScript and modern best practices
          </p>
        </div>

        <div class="tabs tabs-boxed justify-center mb-8 max-w-fit mx-auto" data-aos="fade-up">
          <a class="tab" :class="{ 'tab-active': activeTab === 'setup' }" @click="activeTab = 'setup'">Setup</a>
          <a class="tab" :class="{ 'tab-active': activeTab === 'subscription' }" @click="activeTab = 'subscription'">Subscription</a>
          <a class="tab" :class="{ 'tab-active': activeTab === 'components' }" @click="activeTab = 'components'">Components</a>
          <a class="tab" :class="{ 'tab-active': activeTab === 'cms' }" @click="activeTab = 'cms'">CMS</a>
        </div>

        <!-- CMS Example -->
        <div v-show="activeTab === 'cms'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
          <pre data-prefix="1"><code>// Content Management System with TypeScript</code></pre>
          <pre data-prefix="2"><code>import { useContent } from '~/modules/content-management'</code></pre>
          <pre data-prefix="3"><code></code></pre>
          <pre data-prefix="4"><code>const {</code></pre>
          <pre data-prefix="5"><code>  contents,</code></pre>
          <pre data-prefix="6"><code>  currentContent,</code></pre>
          <pre data-prefix="7"><code>  contentVersions,</code></pre>
          <pre data-prefix="8"><code>  createContent,</code></pre>
          <pre data-prefix="9"><code>  updateContent,</code></pre>
          <pre data-prefix="10"><code>  restoreVersion</code></pre>
          <pre data-prefix="11"><code>} = useContent()</code></pre>
          <pre data-prefix="12"><code></code></pre>
          <pre data-prefix="13"><code>// Create new content with versioning</code></pre>
          <pre data-prefix="14"><code>const newContent = await createContent({</code></pre>
          <pre data-prefix="15"><code>  title: 'Getting Started',</code></pre>
          <pre data-prefix="16"><code>  type: 'article',</code></pre>
          <pre data-prefix="17"><code>  content: '# Welcome\nGet started...',</code></pre>
          <pre data-prefix="18"><code>  metadata: {</code></pre>
          <pre data-prefix="19"><code>    author: 'John Doe',</code></pre>
          <pre data-prefix="20"><code>    tags: ['guide', 'tutorial']</code></pre>
          <pre data-prefix="21"><code>  }</code></pre>
          <pre data-prefix="22"><code>})</code></pre>
        </div>

        <!-- Setup Example -->
        <div v-show="activeTab === 'setup'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
          <pre data-prefix="$"><code>npx create-nuxt-app@latest my-app -t nujin</code></pre>
          <pre data-prefix=">" class="text-success"><code>Creating a new Nujin project...</code></pre>
          <pre data-prefix=">" class="text-warning"><code>Installing dependencies...</code></pre>
          <pre data-prefix=">" class="text-success"><code>Done! 🚀 Your project is ready!</code></pre>
        </div>

        <!-- Subscription Example -->
        <div v-show="activeTab === 'subscription'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
          <pre data-prefix="1"><code>// Use the subscription composable in your component</code></pre>
          <pre data-prefix="2"><code>import { useSubscription } from '~/composables/useSubscription'</code></pre>
          <pre data-prefix="3"><code></code></pre>
          <pre data-prefix="4"><code>const {</code></pre>
          <pre data-prefix="5"><code>  currentPlan,</code></pre>
          <pre data-prefix="6"><code>  isSubscribed,</code></pre>
          <pre data-prefix="7"><code>  hasFeature,</code></pre>
          <pre data-prefix="8"><code>  subscribe,</code></pre>
          <pre data-prefix="9"><code>  cancelSubscription</code></pre>
          <pre data-prefix="10"><code>} = useSubscription()</code></pre>
          <pre data-prefix="11"><code></code></pre>
          <pre data-prefix="12"><code>// Check if user has access to a feature</code></pre>
          <pre data-prefix="13"><code>if (hasFeature('advanced_analytics')) {</code></pre>
          <pre data-prefix="14"><code>  // Show advanced analytics</code></pre>
          <pre data-prefix="15"><code>}</code></pre>
        </div>

        <!-- Components Example -->
        <div v-show="activeTab === 'components'" class="mockup-code max-w-4xl mx-auto" data-aos="fade-up">
          <pre data-prefix="1"><code>&lt;template&gt;</code></pre>
          <pre data-prefix="2"><code>  &lt;div class="pricing-plans"&gt;</code></pre>
          <pre data-prefix="3"><code>    &lt;PricingPlans</code></pre>
          <pre data-prefix="4"><code>      @subscribe="handleSubscribe"</code></pre>
          <pre data-prefix="5"><code>      @cancel="handleCancel"</code></pre>
          <pre data-prefix="6"><code>    /&gt;</code></pre>
          <pre data-prefix="7"><code></code></pre>
          <pre data-prefix="8"><code>    &lt;!-- Feature gating example --&gt;</code></pre>
          <pre data-prefix="9"><code>    &lt;div v-if="hasFeature('api_access')"&gt;</code></pre>
          <pre data-prefix="10"><code>      &lt;ApiKeyManager /&gt;</code></pre>
          <pre data-prefix="11"><code>    &lt;/div&gt;</code></pre>
          <pre data-prefix="12"><code>  &lt;/div&gt;</code></pre>
          <pre data-prefix="13"><code>&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- How It Works -->
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

    <!-- CTA Section -->
    <div class="py-24 bg-base-200 relative">
      <div class="container mx-auto px-4">
        <div class="card bg-base-100 max-w-4xl mx-auto shadow-xl overflow-hidden">
          <div class="card-body text-center relative">
            <!-- Decorative elements -->
            <div class="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full translate-x-16 translate-y-16"></div>
            
            <h2 class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent" data-aos="fade-up">
              Start Building Today
            </h2>
            <p class="text-xl mb-12 text-base-content/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Join developers worldwide who are building amazing applications with nujin
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
              <a :href="repoLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started
              </a>
              <a href="https://github.com/nujinDevelopment/boilerplate" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg">
                View on GitHub
              </a>
            </div>
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
const activeTab = ref('setup')
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

onMounted(() => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
  })

  // Initialize theme
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

watch(y, (newY) => {
  isOnTop.value = newY < 50
})
</script>

<style>
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

/* Clean transitions */
.transition-theme {
  @apply transition-all duration-300;
}

/* Card hover effects */
.card {
  @apply transition-all duration-300;
}

.card:hover svg {
  transform: scale(1.1);
  transition: transform 0.3s ease;
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
