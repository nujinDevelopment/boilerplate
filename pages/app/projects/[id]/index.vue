<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else-if="project">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">{{ project.name }}</h1>
        <div class="space-x-2">
          <NuxtLink to="/app/projects" class="btn btn-outline">
            Back to Projects
          </NuxtLink>
          <NuxtLink v-if="canEditProject" :to="`/app/projects/${project.id}/edit`" class="btn btn-primary">
            Edit Project
          </NuxtLink>
          <button v-if="canDeleteProject" @click="confirmDelete" class="btn btn-error">
            Delete Project
          </button>
        </div>
      </div>
      <div class="bg-base-100 shadow-xl rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-2">Description</h2>
        <p>{{ project.description }}</p>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Project not found.</p>
    </div>
    <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-error' : 'alert-success', 'mt-4']">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjects } from '~/modules/projects/composables/useProjects';
import { useUsers } from '~/modules/user-management/composables/useUsers';

const route = useRoute();
const router = useRouter();
const { getProject, deleteProject } = useProjects();
const { getCurrentUserRole } = useUsers();

const projectId = route.params.id as string;
const project = ref<any>(null);
const loading = ref(true);
const message = ref('');
const messageType = ref('success');

const canEditProject = computed(() => {
  const userRole = getCurrentUserRole();
  return ['admin', 'manager'].includes(userRole);
});

const canDeleteProject = computed(() => {
  const userRole = getCurrentUserRole();
  return userRole === 'admin';
});

onMounted(async () => {
  try {
    project.value = await getProject(projectId);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    message.value = 'Failed to load project details.';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
});

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    handleDelete();
  }
};

const handleDelete = async () => {
  try {
    await deleteProject(projectId);
    message.value = 'Project deleted successfully.';
    messageType.value = 'success';
    setTimeout(() => {
      router.push('/app/projects');
    }, 2000);
  } catch (error) {
    console.error('Failed to delete project:', error);
    message.value = 'Failed to delete project. Please try again.';
    messageType.value = 'error';
  }
};
</script>