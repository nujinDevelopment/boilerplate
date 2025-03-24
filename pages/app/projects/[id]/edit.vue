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
  
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Edit Project</h1>
      <NuxtLink :to="`/app/projects/${projectId}`" class="btn btn-outline">
        Back to Project
      </NuxtLink>
    </div>
    
    <div v-if="!canEditProject" class="alert alert-error shadow-lg mb-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>You do not have permission to edit this project.</span>
      </div>
    </div>
  
    <ProjectForm
      v-if="canEditProject"
      :projectId="projectId"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @error="handleError" />
    
    <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-error' : 'alert-success', 'mt-4']">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjects } from '~/modules/projects/composables/useProjects';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import ProjectForm from '~/modules/projects/components/ProjectForm.vue';

const route = useRoute();
const router = useRouter();
const { updateProject, getProject } = useProjects();
const { getCurrentUserRole } = useUsers();

const projectId = route.params.id as string;
const project = ref<any>(null);
const error = ref('');
const message = ref('');
const messageType = ref('success');

const canEditProject = computed(() => {
  const userRole = getCurrentUserRole();
  return ['admin', 'manager'].includes(userRole);
});

onMounted(async () => {
  try {
    project.value = await getProject(projectId);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    error.value = 'Failed to load project details.';
  }
});

const dismissError = () => {
  error.value = '';
};

const handleSubmit = async (projectData: any) => {
  try {
    await updateProject(projectData);
    message.value = 'Project updated successfully!';
    messageType.value = 'success';
    setTimeout(() => {
      router.push(`/app/projects/${projectId}`);
    }, 2000);
  } catch (error) {
    handleError(error);
  }
};

const handleCancel = () => {
  router.push(`/app/projects/${projectId}`);
};

const handleError = (error: Error) => {
  message.value = `Failed to update project: ${error.message}`;
  messageType.value = 'error';
};
</script>