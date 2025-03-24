<template>
  <div class="drawer min-h-screen bg-base-200 lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content -->
    <main class="drawer-content flex flex-col h-screen">
      <!-- Header -->
      <AppHeader class="flex-shrink-0 sticky top-0 z-40 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60"/>
      
      <!-- Main Section -->
      <section class="flex-egrow overflow-y-auto">
        <div class="container mx-auto px-4 lg:px-8 py-6 h-full">
          <!-- Page Title with Animation -->
          <div class="mb-8">
            <h1 
              class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transform transition-all duration-300 ease-out"
              :class="{'translate-y-0 opacity-100': showTitle, 'translate-y-4 opacity-0': !showTitle}"
            >
              {{ pageTitle }}
            </h1>
            <div 
              class="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 transform transition-all duration-500 ease-out delay-100"
              :class="{'scale-x-100 opacity-100': showTitle, 'scale-x-0 opacity-0': !showTitle}"
            ></div>
          </div>

          <!-- Page Content with Card Style -->
          <div 
            class="bg-base-100 rounded-box shadow-lg p-6 min-h-[calc(100vh-12rem)] transform transition-all duration-300 ease-out"
            :class="{'translate-y-0 opacity-100': showContent, 'translate-y-4 opacity-0': !showContent}"
          >
            <slot />
          </div>
        </div>
      </section>
    </main>

    <!-- Enhanced Sidebar -->
    <AppSidebar />

    <!-- Notification Toast Container -->
    <div class="toast toast-end z-50">
      <div v-if="notification" :class="`alert alert-${notification.type}`">
        <span>{{ notification.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '~/components/App/Header.vue';
import AppSidebar from '~/components/App/Sidebar.vue';

interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const route = useRoute();
const showTitle = ref(false);
const showContent = ref(false);
const notification = ref<Notification | null>(null);

const pageTitle = computed(() => {
  return route.meta.pageName || 'Dashboard';
});

// Animate components on mount
onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
  
  setTimeout(() => {
    showContent.value = true;
  }, 300);
});

// Example notification system (can be moved to a composable)
const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value = null;
  }, 3000);
};

// Make notification function available to child components
defineExpose({ showNotification });
</script>

<style>
/* Smooth scrolling */
.drawer-content {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
.drawer-content::-webkit-scrollbar {
  width: 8px;
}

.drawer-content::-webkit-scrollbar-track {
  @apply bg-base-200;
}

.drawer-content::-webkit-scrollbar-thumb {
  @apply bg-primary/20 rounded-full hover:bg-primary/30 transition-colors;
}

/* Card hover effect */
.rounded-box {
  @apply hover:shadow-xl transition-shadow duration-300;
}

/* Gradient animation */
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

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
</style>
