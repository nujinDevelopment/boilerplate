<template>
  <div class="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 ">
    <DashboardStats />
    <DashboardTransactionsCard />
    <DashboardRevenueCard />
    <!-- Add more dashboard components here as needed -->
  </div>
</template>

<script setup>
import DashboardStats from '~/components/Dashboard/Stats.vue';
import DashboardTransactionsCard from '~/components/Dashboard/TransactionsCard.vue';
import DashboardRevenueCard from '~/components/Dashboard/RevenueCard.vue';

// Add any necessary component logic here
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>