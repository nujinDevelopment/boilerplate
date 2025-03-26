<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">{{ isEditing ? 'Edit Content' : 'Create Content' }}</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            v-model="form.type"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="page">Page</option>
            <option value="post">Post</option>
            <option value="article">Article</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div v-if="isEditing">
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            v-model="form.status"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            v-model="form.content"
            rows="10"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
        </div>

        <div>
          <label for="metadata" class="block text-sm font-medium text-gray-700">Metadata (JSON)</label>
          <textarea
            id="metadata"
            v-model="metadataStr"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            @input="validateMetadata"
          ></textarea>
          <p v-if="metadataError" class="mt-1 text-sm text-red-600">{{ metadataError }}</p>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <NuxtLink
          to="/app/content"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {{ isEditing ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useContent } from '../composables/useContent'
import type { Content, CreateContentDTO, UpdateContentDTO, ContentType, ContentStatus } from '../types'

const props = defineProps<{
  contentId?: string
}>()

const router = useRouter()
const { createContent, updateContent, fetchContent, loading, error } = useContent()

const isEditing = computed(() => !!props.contentId)
const metadataError = ref<string | null>(null)

const form = ref<{
  title: string
  type: ContentType
  status?: ContentStatus
  content: string
  metadata?: Record<string, any>
}>({
  title: '',
  type: 'page',
  content: '',
})

const metadataStr = ref('{}')

const validateMetadata = () => {
  try {
    const parsed = JSON.parse(metadataStr.value)
    form.value.metadata = parsed
    metadataError.value = null
  } catch (e) {
    metadataError.value = 'Invalid JSON format'
  }
}

const handleSubmit = async () => {
  try {
    if (metadataError.value) return

    if (isEditing.value && props.contentId) {
      const updateData: UpdateContentDTO = {
        title: form.value.title,
        type: form.value.type,
        content: form.value.content,
        status: form.value.status,
        metadata: form.value.metadata
      }
      await updateContent(props.contentId, updateData)
    } else {
      const createData: CreateContentDTO = {
        title: form.value.title,
        type: form.value.type,
        content: form.value.content,
        metadata: form.value.metadata
      }
      await createContent(createData)
    }
    
    router.push('/app/content')
  } catch (e) {
    console.error('Failed to save content:', e)
  }
}

onMounted(async () => {
  if (props.contentId) {
    const content = await fetchContent(props.contentId)
    if (content) {
      form.value = {
        title: content.title,
        type: content.type,
        status: content.status,
        content: content.content,
        metadata: content.metadata
      }
      metadataStr.value = JSON.stringify(content.metadata, null, 2)
    }
  }
})
</script>
