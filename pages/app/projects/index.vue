<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="alert alert-error shadow-lg mb-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ error }}</span>
      </div>
      <div class="flex-none">
        <button @click="dismissError" class="btn btn-sm btn-ghost">Dismiss</button>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 class="text-3xl font-bold mb-4 sm:mb-0">Projects</h1>
      <NuxtLink v-if="canCreateProject" to="/app/projects/create" class="btn btn-primary">
        Create New Project
      </NuxtLink>
    </div>
    
    <ProjectList />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import ProjectList from '~/modules/projects/components/ProjectList.vue';

const route = useRoute();
const { getCurrentUserRole } = useUsers();

const error = ref('');

const canCreateProject = computed(() => {
  const userRole = getCurrentUserRole();
  return ['admin', 'manager'].includes(userRole);
});

onMounted(() => {
  if (route.query.error === 'unauthorized') {
    error.value = route.query.message as string || 'You do not have permission to access the requested page.';
  }
});

const dismissError = () => {
  error.value = '';
};
</script>