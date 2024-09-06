<template>
  <div class="drawer min-h-screen bg-base-200 lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content -->
    <main class="drawer-content">
      <div class="lg:p-10">
        <DashboardHeader />
        <slot />
      </div>
    </main>

    <!-- Sidebar -->
    <DashboardSidebar />
  </div>
</template>

<script setup>
import DashboardHeader from '~/components/Dashboard/Header.vue';
import DashboardSidebar from '~/components/Dashboard/Sidebar.vue';

// Add any necessary component logic here
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>