<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 class="text-3xl font-bold mb-4 sm:mb-0">Create Project</h1>
      <NuxtLink to="/app/projects" class="btn btn-outline">
        Back to Projects
      </NuxtLink>
    </div>
    <div v-if="!canCreateProject" class="alert alert-error shadow-lg mb-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>You do not have permission to create projects.</span>
      </div>
    </div>
    <ProjectForm 
      v-if="canCreateProject"
      @submit="handleSubmit" 
      @cancel="handleCancel"
      @error="handleError"
    />
    <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-error' : 'alert-success', 'mt-4']">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProjects } from '~/modules/projects/composables/useProjects';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import ProjectForm from '~/modules/projects/components/ProjectForm.vue';

const router = useRouter();
const { createProject } = useProjects();
const { getCurrentUserRole } = useUsers();

const message = ref('');
const messageType = ref('success');

const canCreateProject = computed(() => {
  const userRole = getCurrentUserRole();
  return ['admin', 'manager'].includes(userRole);
});

const handleSubmit = async (projectData: any) => {
  try {
    await createProject(projectData);
    message.value = 'Project created successfully!';
    messageType.value = 'success';
    setTimeout(() => {
      router.push('/app/projects');
    }, 2000);
  } catch (error) {
    handleError(error);
  }
};

const handleCancel = () => {
  router.push('/app/projects');
};

const handleError = (error: Error) => {
  message.value = `Failed to create project: ${error.message}`;
  messageType.value = 'error';
};
</script>