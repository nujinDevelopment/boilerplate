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
import { useLogger } from '../../logging/composables/useLogger';

const { users, isLoading, error, fetchUsers } = useUsers();
const logger = useLogger();

// Add a watch to log when users change
watch(users, (newUsers) => {
  logger.debug('Users data updated', 'UserStats');
});

const userStats = computed(() => {
  logger.debug('Generating user stats', 'UserStats');

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const roleStats = {
    admin: users.value.filter(user => user.user_metadata?.role === 'admin').length,
    manager: users.value.filter(user => user.user_metadata?.role === 'manager').length,
    user: users.value.filter(user => user.user_metadata?.role === 'user').length,
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.value.length,
      description: 'Active user accounts'
    },
    {
      title: 'New Users (Last 30 Days)',
      value: users.value.filter(user => new Date(user.created_at) > thirtyDaysAgo).length,
      description: 'Users created in the last month'
    },
    {
      title: 'Active Users (Last 7 Days)',
      value: users.value.filter(user => new Date(user.last_sign_in_at) > sevenDaysAgo).length,
      description: 'Users who signed in recently'
    },
    {
      title: 'Admin Users',
      value: roleStats.admin,
      description: 'Users with admin role'
    },
    {
      title: 'Manager Users', 
      value: roleStats.manager,
      description: 'Users with manager role'
    },
    {
      title: 'Regular Users',
      value: roleStats.user, 
      description: 'Users with regular user role'
    }
  ];

  logger.debug('User stats generated', 'UserStats', { stats });

  return stats;
});

// Fetch user data and log results
const fetchData = async () => {
  try {
    logger.info('Fetching user data', 'UserStats');
    await fetchUsers();
    logger.info('User data fetched successfully', 'UserStats');
  } catch (err) {
    logger.error('Error fetching user data', 'UserStats', { error: err });
  }
};
fetchData();
</script>