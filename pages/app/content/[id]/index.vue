<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="currentContent" class="space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold">{{ currentContent.title }}</h1>
          <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span>{{ currentContent.type }}</span>
            <span>•</span>
            <span>{{ formatDate(currentContent.updated_at) }}</span>
            <span>•</span>
            <span :class="{
              'px-2 py-1 text-xs rounded-full': true,
              'bg-green-100 text-green-800': currentContent.status === 'published',
              'bg-yellow-100 text-yellow-800': currentContent.status === 'draft',
              'bg-red-100 text-red-800': currentContent.status === 'archived',
              'bg-blue-100 text-blue-800': currentContent.status === 'scheduled'
            }">
              {{ currentContent.status }}
            </span>
          </div>
        </div>
        <div class="flex space-x-4">
          <NuxtLink
            :to="`/app/content/${currentContent.id}/edit`"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Edit
          </NuxtLink>
        </div>
      </div>

      <!-- Featured Image -->
      <div v-if="currentContent.metadata?.media?.featured_image" class="relative h-64 rounded-lg overflow-hidden">
        <img
          :src="currentContent.metadata.media.featured_image"
          class="w-full h-full object-cover"
          :alt="currentContent.title"
        />
      </div>

      <!-- Content -->
      <div class="prose max-w-none" v-html="currentContent.latest_version?.content"></div>

      <!-- Metadata -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Categories & Tags -->
        <div class="space-y-4">
          <div v-if="currentContent.metadata?.categories?.length">
            <h3 class="text-lg font-medium">Categories</h3>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="category in currentContent.metadata.categories"
                :key="category"
                class="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {{ category }}
              </span>
            </div>
          </div>

          <div v-if="currentContent.metadata?.tags?.length">
            <h3 class="text-lg font-medium">Tags</h3>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tag in currentContent.metadata.tags"
                :key="tag"
                class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- SEO Info -->
        <div v-if="currentContent.metadata?.seo" class="space-y-4">
          <h3 class="text-lg font-medium">SEO Information</h3>
          <div class="bg-gray-50 p-4 rounded-lg space-y-2">
            <p v-if="currentContent.metadata.seo.title">
              <span class="font-medium">Title:</span> {{ currentContent.metadata.seo.title }}
            </p>
            <p v-if="currentContent.metadata.seo.description">
              <span class="font-medium">Description:</span> {{ currentContent.metadata.seo.description }}
            </p>
            <div v-if="currentContent.metadata.seo.keywords?.length">
              <span class="font-medium">Keywords:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="keyword in currentContent.metadata.seo.keywords"
                  :key="keyword"
                  class="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Version History -->
      <div v-if="contentVersions.length > 1" class="space-y-4">
        <h3 class="text-lg font-medium">Version History</h3>
        <div class="bg-gray-50 p-4 rounded-lg space-y-4">
          <div
            v-for="version in contentVersions"
            :key="version.id"
            class="flex items-center justify-between"
          >
            <div>
              <span class="font-medium">Version {{ version.version_number }}</span>
              <span class="text-sm text-gray-500 ml-2">{{ formatDate(version.created_at) }}</span>
              <span v-if="version.restored_from" class="text-xs text-gray-500 ml-2">(Restored)</span>
            </div>
            <button
              v-if="version.id !== currentContent.latest_version?.id"
              @click="handleRestore(version.id)"
              class="text-sm text-primary-600 hover:text-primary-900"
            >
              Restore this version
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useContent } from '~/modules/content-management/composables/useContent'

const props = defineProps<{
  id: string
}>()

const { currentContent, contentVersions, fetchContent, restoreVersion: restoreContentVersion } = useContent()

const handleRestore = async (versionId: string) => {
  if (props.id) {
    await restoreContentVersion(props.id, versionId)
    await fetchContent(props.id)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  await fetchContent(props.id)
})
</script>
