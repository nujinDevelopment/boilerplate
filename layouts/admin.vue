<script setup lang="ts">
import Toast from '~/components/App/Toast.vue'
import Sidebar from '~/components/Layout/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-primary flex relative">
    <Toast />
    
    <!-- Sidebar - Always visible on desktop -->
    <div class="hidden lg:block w-64 backdrop-blur-sm fixed top-0 bottom-0 left-0">
      <Sidebar />
    </div>

    <!-- Mobile drawer -->
    <div class="drawer lg:hidden fixed top-0 left-0 h-full w-full z-40">
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      
      <div class="drawer-content flex">
        <!-- Hamburger menu button -->
        <label for="app-drawer" class="btn btn-ghost btn-circle fixed top-3 left-3 text-primary-content hover:bg-primary-content/10">
          <svg class="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </label>
      </div>

      <div class="drawer-side z-40">
        <label for="app-drawer" class="drawer-overlay"></label>
        <Sidebar mobile />
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-3 lg:p-8 lg:ml-64 overflow-auto min-h-screen pt-16 lg:pt-8">
      <div class="bg-base-100/95 backdrop-blur-sm rounded-xl min-h-screen lg:rounded-2xl shadow-xl lg:shadow-2xl p-4 lg:p-8">
        <slot />
      </div>
    </div>
  </div>
</template>
