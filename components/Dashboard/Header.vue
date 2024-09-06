<template>
  <header class="col-span-12 flex items-center gap-2 lg:gap-4">
    <label for="my-drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </label>
    <div class="grow">
      <h1 class="lg:text-2xl lg:font-light">Dashboard</h1>
    </div>
    <div>
      <input
        type="text"
        placeholder="Search"
        class="input input-sm rounded-full max-sm:w-24" />
    </div>
    <NotificationDropdown />
    <UserDropdown />
  </header>
</template>

<script setup>
import NotificationDropdown from './NotificationDropdown.vue';
import UserDropdown from './UserDropdown.vue';
</script>