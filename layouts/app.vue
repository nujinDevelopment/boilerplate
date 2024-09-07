<template>
  <div class="drawer min-h-screen bg-base-200 lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content -->
    <main class="drawer-content flex flex-col h-screen">
      <AppHeader class="flex-shrink-0"/>
      <section class="bg flex-grow overflow-y-auto">
        <div class="lg:pb-10 h-full">
        <h1 class="lg:text-2xl lg:font-light lg:ml-8 hidden lg:block">{{ pageTitle }}</h1>
          <div class="pt-4 h-full">
            <slot />
          </div>
        </div>
      </section>
    </main>

    <!-- Sidebar -->
    <AppSidebar />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '~/components/App/Header.vue';
import AppSidebar from '~/components/App/Sidebar.vue';

const route = useRoute();

const pageTitle = computed(() => {
  return route.meta.pageName || 'App';
});
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>