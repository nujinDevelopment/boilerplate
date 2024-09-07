<template>
  <div class="container mx-auto p-4">
    <UserManagementUserList />
    <UserManagementUserForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  pageName: 'User Management'
});

// Component logic will be handled by composables
</script>