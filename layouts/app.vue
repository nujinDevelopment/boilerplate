<template>
  <div class="drawer min-h-screen bg-base-200 lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content -->
    <main class="drawer-content">
      <section class="bg">
        <div class="lg:p-10">
          <AppHeader />
          <slot />
        </div>
      </section>
    </main>

    <!-- Sidebar -->
    <AppSidebar />
  </div>
</template>

<script setup>
import AppHeader from '~/components/App/Header.vue';
import AppSidebar from '~/components/App/Sidebar.vue';

// Add any necessary component logic here
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>