<template>
  <section class="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
    <div v-for="(stat, index) in stats" :key="index" class="stat">
      <div class="stat-title">{{ stat.title }}</div>
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-desc">{{ stat.description }}</div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    title: 'Total Page Views',
    value: '89,400',
    description: '21% more than last month'
  },
  {
    title: 'Total Unique Visitors',
    value: '56,200',
    description: '15% increase from last week'
  },
  {
    title: 'Average Session Duration',
    value: '3m 45s',
    description: '5% longer than previous month'
  },
  {
    title: 'Bounce Rate',
    value: '32.4%',
    description: '2% decrease from last month'
  }
];
</script>