<template>
<div>
  <!-- Loading State -->
  <div v-if="isLoading" class="w-full animate-pulse">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="bg-base-200 h-32 rounded-lg"></div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Error: {{ error }}</span>
  </div>

  <!-- Stats Grid -->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <div v-for="(stat, index) in userStats" :key="index" 
         class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200"
         :class="getStatClass(stat.trend)">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <h3 class="card-title text-lg">{{ stat.title }}</h3>
          <div :class="getIconClass(stat.type)" class="w-10 h-10 rounded-full flex items-center justify-center">
            <i :class="getIcon(stat.type)"></i>
          </div>
        </div>
        <p class="stat-value text-3xl font-bold mt-2">{{ stat.value }}</p>
        <div class="flex items-center mt-2">
          <span :class="getTrendClass(stat.trend)" class="text-sm font-medium">
            {{ stat.trend > 0 ? '+' : ''}}{{ stat.trend }}%
          </span>
          <span class="text-sm text-base-content/70 ml-2">vs last period</span>
        </div>
        <p class="text-sm text-base-content/70 mt-1">{{ stat.description }}</p>
      </div>
    </div>
  </div>

  <!-- Activity Chart -->
  <div class="card bg-base-100 shadow-lg mt-6">
    <div class="card-body">
      <h3 class="card-title">User Activity Trend</h3>
      <div class="h-64 mt-4">
        <canvas ref="activityChart"></canvas>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { useUsers } from '../composables/useUsers';
import { useLogger } from '../../logging/composables/useLogger';
import { Chart } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

interface UserStat {
  title: string;
  value: number;
  description: string;
  trend: number;
  type: 'users' | 'new' | 'active' | 'admin' | 'manager' | 'user';
}

const { users, isLoading, error, fetchUsers } = useUsers();
const logger = useLogger();
const activityChart = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

// Calculate previous period stats for trend comparison
const calculateTrend = (currentValue: number, previousValue: number): number => {
  if (previousValue === 0) return 0;
  return Math.round(((currentValue - previousValue) / previousValue) * 100);
};

const userStats = computed<UserStat[]>(() => {
  logger.debug('Generating user stats', 'UserStats');

  const now = new Date();
  const periods = {
    current: {
      thirtyDays: new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)),
      sevenDays: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))
    },
    previous: {
      thirtyDays: new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000)),
      sevenDays: new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000))
    }
  };

  const stats = {
    current: {
      total: users.value.length,
      newUsers: users.value.filter(user => new Date(user.created_at) > periods.current.thirtyDays).length,
      activeUsers: users.value.filter(user => new Date(user.last_sign_in_at) > periods.current.sevenDays).length,
      roles: {
        admin: users.value.filter(user => user.user_metadata?.role === 'admin').length,
        manager: users.value.filter(user => user.user_metadata?.role === 'manager').length,
        user: users.value.filter(user => user.user_metadata?.role === 'user').length
      }
    },
    previous: {
      total: users.value.filter(user => new Date(user.created_at) < periods.current.thirtyDays).length,
      newUsers: users.value.filter(user => 
        new Date(user.created_at) > periods.previous.thirtyDays && 
        new Date(user.created_at) < periods.current.thirtyDays
      ).length,
      activeUsers: users.value.filter(user => 
        new Date(user.last_sign_in_at) > periods.previous.sevenDays && 
        new Date(user.last_sign_in_at) < periods.current.sevenDays
      ).length
    }
  };

  return [
    {
      title: 'Total Users',
      value: stats.current.total,
      description: 'All registered users',
      trend: calculateTrend(stats.current.total, stats.previous.total),
      type: 'users'
    },
    {
      title: 'New Users',
      value: stats.current.newUsers,
      description: 'Users joined in last 30 days',
      trend: calculateTrend(stats.current.newUsers, stats.previous.newUsers),
      type: 'new'
    },
    {
      title: 'Active Users',
      value: stats.current.activeUsers,
      description: 'Active in last 7 days',
      trend: calculateTrend(stats.current.activeUsers, stats.previous.activeUsers),
      type: 'active'
    },
    {
      title: 'Admin Users',
      value: stats.current.roles.admin,
      description: 'Users with admin privileges',
      trend: 0,
      type: 'admin'
    },
    {
      title: 'Manager Users',
      value: stats.current.roles.manager,
      description: 'Users with manager role',
      trend: 0,
      type: 'manager'
    },
    {
      title: 'Regular Users',
      value: stats.current.roles.user,
      description: 'Standard user accounts',
      trend: 0,
      type: 'user'
    }
  ];
});

// Helper functions for dynamic classes and icons
const getStatClass = (trend: number): string => {
  if (trend > 0) return 'border-l-4 border-success';
  if (trend < 0) return 'border-l-4 border-error';
  return '';
};

const getTrendClass = (trend: number): string => {
  if (trend > 0) return 'text-success';
  if (trend < 0) return 'text-error';
  return 'text-base-content/70';
};

const getIconClass = (type: UserStat['type']): string => {
  const baseClass = 'bg-opacity-20 ';
  switch (type) {
    case 'users': return baseClass + 'bg-primary text-primary';
    case 'new': return baseClass + 'bg-success text-success';
    case 'active': return baseClass + 'bg-info text-info';
    case 'admin': return baseClass + 'bg-warning text-warning';
    case 'manager': return baseClass + 'bg-secondary text-secondary';
    default: return baseClass + 'bg-base-content text-base-content';
  }
};

const getIcon = (type: UserStat['type']): string => {
  switch (type) {
    case 'users': return 'fas fa-users';
    case 'new': return 'fas fa-user-plus';
    case 'active': return 'fas fa-user-check';
    case 'admin': return 'fas fa-user-shield';
    case 'manager': return 'fas fa-user-tie';
    default: return 'fas fa-user';
  }
};

// Activity chart initialization
const initChart = (): void => {
  if (!activityChart.value) return;
  const ctx = activityChart.value.getContext('2d');
  if (!ctx) return;

  const dates: Date[] = Array.from({length: 30}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date;
  });

  const activeData: number[] = dates.map(date => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    return users.value.filter(user => {
      const loginDate = new Date(user.last_sign_in_at);
      return loginDate >= dayStart && loginDate <= dayEnd;
    }).length;
  });

  if (chart) {
    chart.destroy();
  }

  const chartConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: dates.map(date => date.toLocaleDateString()),
      datasets: [{
        label: 'Daily Active Users',
        data: activeData,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  };

  chart = new Chart(ctx, chartConfig);
};

onMounted(() => {
  fetchData();
});

watch(users, () => {
  logger.debug('Users data updated', 'UserStats');
  initChart();
});

// Fetch user data and log results
const fetchData = async (): Promise<void> => {
  try {
    logger.info('Fetching user data', 'UserStats');
    await fetchUsers();
    logger.info('User data fetched successfully', 'UserStats');
    initChart();
  } catch (err) {
    logger.error('Error fetching user data', 'UserStats', { error: err });
  }
};
</script>
