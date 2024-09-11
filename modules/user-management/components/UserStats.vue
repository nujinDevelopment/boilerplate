<template>
  <section v-if="isLoading" class="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
    <div class="stat">
      <div class="stat-value">Loading...</div>
    </div>
  </section>
  <section v-else-if="error" class="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
    <div class="stat">
      <div class="stat-value text-error">Error: {{ error }}</div>
    </div>
  </section>
  <section v-else class="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
    <div v-for="(stat, index) in userStats" :key="index" class="stat">
      <div class="stat-title">{{ stat.title }}</div>
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-desc">{{ stat.description }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useUsers } from '../composables/useUsers';

const { users, isLoading, error, fetchUsers } = useUsers();

// Add a watch to log when users change
watch(users, (newUsers) => {
  // console.log('Users updated:', newUsers);
});

const userStats = computed(() => {
  return [
    {
      title: 'Total Users',
      value: users.value.length,
      description: 'Active user accounts'
    },
    {
      title: 'New Users (Last 30 Days)',
      value: users.value.filter(user => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(user.created_at) > thirtyDaysAgo;
      }).length,
      description: 'Users created in the last month'
    },
    {
      title: 'Active Users (Last 7 Days)',
      value: users.value.filter(user => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return new Date(user.last_sign_in_at) > sevenDaysAgo;
      }).length,
      description: 'Users who signed in recently'
    }
  ];
});

// Manually trigger fetchUsers to ensure data is loaded
fetchUsers();
</script>