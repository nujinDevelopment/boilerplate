<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit Project' : 'Create New Project' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="form-control">
        <label for="name" class="label">
          <span class="label-text">Project Name</span>
        </label>
        <input
          id="name"
          v-model="project.name"
          type="text"
          required
          class="input input-bordered"
          :class="{ 'input-error': errors.name }"
        />
        <p v-if="errors.name" class="text-error text-sm mt-1">{{ errors.name }}</p>
      </div>

      <div class="form-control">
        <label for="description" class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          id="description"
          v-model="project.description"
          class="textarea textarea-bordered h-24"
          :class="{ 'textarea-error': errors.description }"
        ></textarea>
        <p v-if="errors.description" class="text-error text-sm mt-1">{{ errors.description }}</p>
      </div>

      <div class="form-control flex-row justify-between">
        <button type="button" class="btn btn-outline" @click="$emit('cancel')">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useProjects } from '../composables/useProjects'

const props = defineProps<{
  projectId?: string
}>()

const emit = defineEmits<{
  (e: 'submit', project: any): void
  (e: 'cancel'): void
  (e: 'error', error: Error): void
}>()

const { createProject, updateProject, getProject } = useProjects()

const isEditing = computed(() => !!props.projectId)
const isSubmitting = ref(false)

const project = reactive({
  id: props.projectId || '',
  name: '',
  description: ''
})

const errors = reactive({
  name: '',
  description: ''
})

if (isEditing.value) {
  getProject(props.projectId!).then((fetchedProject) => {
    Object.assign(project, fetchedProject)
  }).catch((error) => {
    console.error('Failed to fetch project:', error)
    emit('error', error)
  })
}

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.description = ''

  if (!project.name.trim()) {
    errors.name = 'Project name is required'
    isValid = false
  }

  if (!project.description.trim()) {
    errors.description = 'Project description is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    if (isEditing.value) {
      await updateProject(project)
    } else {
      const newProject = await createProject(project)
      project.id = newProject.id
    }
    emit('submit', project)
  } catch (error) {
    console.error('Failed to save project:', error)
    emit('error', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>