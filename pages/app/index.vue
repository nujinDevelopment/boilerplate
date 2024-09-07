<template>
  <div class="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 ">
    <AppStats />
    <AppTransactionsCard />
    <AppRevenueCard />-
    <!-- Add more App components here as needed -->
  </div>
</template>

<script setup>
import AppStats from '~/components/App/Stats.vue';
import AppTransactionsCard from '~/components/App/TransactionsCard.vue';
import AppRevenueCard from '~/components/App/RevenueCard.vue';

// Add page meta data
definePageMeta({
  pageName: 'Dashboard'
});

// Add any necessary component logic here
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>