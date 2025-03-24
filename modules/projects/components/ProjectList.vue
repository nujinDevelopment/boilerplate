<template>
  <div>
    <div v-if="loading" class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else-if="projects.length === 0" class="text-center">
      <p>No projects found.</p>
    </div>
    <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="project in projects" :key="project.id" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="card-actions justify-end mt-4">
            <NuxtLink :to="`/app/projects/${project.id}`" class="btn btn-primary btn-sm">
              View
            </NuxtLink>
            <button v-if="canEditProject" @click="navigateToEditProject(project.id)" class="btn btn-secondary btn-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { useUsers } from '~/modules/user-management/composables/useUsers'

const router = useRouter()
const { fetchProjects } = useProjects()
const { getCurrentUserRole } = useUsers()

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    projects.value = await fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // TODO: Add error handling, e.g., show an error message to the user
  } finally {
    loading.value = false
  }
})

const canEditProject = computed(() => {
  const userRole = getCurrentUserRole()
  return ['admin', 'manager'].includes(userRole)
})

const navigateToEditProject = (projectId: string) => {
  router.push(`/app/projects/${projectId}/edit`)
}
</script>