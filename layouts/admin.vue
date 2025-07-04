<script setup lang="ts">
import Toast from '~/components/App/Toast.vue'

const { adminNavigation, appNavigation } = useNavigation()
const { logout } = useAuth()

const currentRoute = useRoute()
</script>

<template>
  <div class="min-h-screen bg-primary flex relative">
    <Toast />
    
    <!-- Sidebar - Always visible on desktop -->
    <div class="hidden lg:block w-64 backdrop-blur-sm fixed top-0 bottom-0 left-0">
      <ul class="menu p-4 h-full flex flex-col text-primary-content">
        <li class="mb-8 flex justify-center">
          <a href="/" class="flex items-center">
            <!-- <img src="/logo.png" alt="BRANE Logo" class="w-16 h-16 rounded-lg" /> -->
          </a>
        </li>
        <li class="menu-title text-primary-content/90 font-bold text-lg">Admin</li>
        <li v-for="item in adminNavigation" :key="item.name">
          <a 
            :href="item.href"
            :class="{ 'active': item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href) }"
            class="flex items-center gap-3 py-3"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
            </svg>
            {{ item.name }}
          </a>
        </li>
        <li class="menu-title text-primary-content/90 font-bold text-lg mt-8">App</li>
        <li v-for="item in appNavigation" :key="item.name">
          <a 
            :href="item.href"
            :class="{ 'active': item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href) }"
            class="flex items-center gap-3 py-3"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
            </svg>
            {{ item.name }}
          </a>
        </li>
        <div class="mt-auto pt-4 border-t border-primary-content/10">
          <li>
            <a @click="logout" class="flex items-center gap-3 py-3 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Logout
            </a>
          </li>
        </div>
      </ul>
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
        <ul class="menu p-4 w-80 min-h-[100dvh] bg-primary backdrop-blur-sm text-primary-content flex flex-col">
          <li class="mb-8 flex justify-center">
            <a href="/" class="flex items-center">
              <!-- <img src="/logo.png" alt="BRANE Logo" class="w-16 h-16 rounded-lg" /> -->
            </a>
          </li>
        <li class="menu-title text-primary-content/90 font-bold text-lg">Admin</li>
        <li v-for="item in adminNavigation" :key="item.name">
            <a 
              :href="item.href"
              :class="{ 'active': item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href) }"
              class="flex items-center gap-3 py-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
              </svg>
              {{ item.name }}
          </a>
        </li>
        <li class="menu-title text-primary-content/90 font-bold text-lg mt-8">App</li>
        <li v-for="item in appNavigation" :key="item.name">
          <a 
            :href="item.href"
            :class="{ 'active': item.href === '/app' ? currentRoute.path === '/app' : currentRoute.path.startsWith(item.href) }"
            class="flex items-center gap-3 py-3"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
            </svg>
            {{ item.name }}
          </a>
        </li>
        <div class="mt-auto pt-4 border-t border-primary-content/10">
            <li>
              <a @click="logout" class="flex items-center gap-3 py-3 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </a>
            </li>
          </div>
        </ul>
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
