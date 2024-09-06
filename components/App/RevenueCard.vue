<template>
  <section class="card col-span-12 bg-primary text-primary-content shadow-sm xl:col-span-6">
    <div class="card-body pb-0">
      <h2 class="card-title">{{ revenue }} USD</h2>
      <a class="link-hover link text-xs">Revenue report →</a>
    </div>
    <div class="h-full w-full p-4 pt-0 [--shape-color:oklch(var(--pc))]">
      <!-- Replace this div with an actual chart component -->
      <div class="h-40 w-full bg-primary-focus"></div>
    </div>
  </section>
</template>

<script setup>
const revenue = '21,500';
</script>