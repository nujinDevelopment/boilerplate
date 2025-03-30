<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Content Management</h2>
      <NuxtLink 
        to="/app/content/create" 
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Create Content
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <select v-model="filters.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Types</option>
            <option value="page">Page</option>
            <option value="post">Post</option>
            <option value="article">Article</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select v-model="filters.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input 
            v-model="filters.search"
            type="text"
            placeholder="Search content..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Sort By</label>
          <select v-model="sort.field" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="title">Title</option>
            <option value="created_at">Created Date</option>
            <option value="updated_at">Updated Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Content List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Versions</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="content in contents" :key="content.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img 
                    v-if="content.metadata?.media?.featured_image"
                    :src="content.metadata.media.featured_image"
                    class="h-8 w-8 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ content.title }}</div>
                    <div v-if="content.metadata?.categories?.length" class="text-sm text-gray-500">
                      {{ content.metadata.categories.join(', ') }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ content.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': content.status === 'published',
                  'bg-yellow-100 text-yellow-800': content.status === 'draft',
                  'bg-red-100 text-red-800': content.status === 'archived',
                  'bg-blue-100 text-blue-800': content.status === 'scheduled'
                }">
                  {{ content.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(content.updated_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-500">
                  v{{ content.versions?.length || 1 }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <NuxtLink 
                    :to="`/app/content/${content.id}/edit`"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </NuxtLink>
                  <button 
                    @click="handleStatusChange(content)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    {{ getNextStatus(content.status) }}
                  </button>
                  <button 
                    @click="deleteContent(content.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="pagination.page--"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="pagination.page++"
              :disabled="pagination.page * pagination.perPage >= pagination.total"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ ((pagination.page - 1) * pagination.perPage) + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(pagination.page * pagination.perPage, pagination.total) }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <select
                v-model="pagination.perPage"
                class="mr-4 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option :value="10">10 per page</option>
                <option :value="25">25 per page</option>
                <option :value="50">50 per page</option>
                <option :value="100">100 per page</option>
              </select>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="pagination.page = page"
                  :class="[
                    pagination.page === page
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useContent } from '../composables/useContent'
import type { Content, ContentFilter, ContentSort, ContentPagination, ContentStatus } from '../types'

const { contents, loading, error, fetchContents, removeContent, updateContent } = useContent()

const filters = ref<ContentFilter>({
  type: undefined,
  status: undefined,
  search: ''
})

const sort = ref<ContentSort>({
  field: 'updated_at',
  direction: 'desc'
})

const pagination = ref<ContentPagination>({
  page: 1,
  perPage: 10,
  total: 0
})

const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.perPage))

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getNextStatus = (currentStatus: ContentStatus): string => {
  switch (currentStatus) {
    case 'draft':
      return 'Publish'
    case 'published':
      return 'Archive'
    case 'archived':
      return 'Restore'
    case 'scheduled':
      return 'Publish Now'
    default:
      return 'Change Status'
  }
}

const handleStatusChange = async (content: Content) => {
  let newStatus: ContentStatus
  switch (content.status) {
    case 'draft':
      newStatus = 'published'
      break
    case 'published':
      newStatus = 'archived'
      break
    case 'archived':
      newStatus = 'draft'
      break
    case 'scheduled':
      newStatus = 'published'
      break
    default:
      newStatus = 'draft'
  }

  await updateContent(content.id, { status: newStatus })
  await loadContents()
}

const deleteContent = async (id: string) => {
  if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
    await removeContent(id)
    await loadContents()
  }
}

const loadContents = async () => {
  await fetchContents(filters.value)
}

// Watch for changes in filters, sort, or pagination
watch([filters, sort, pagination], () => {
  loadContents()
}, { deep: true })

onMounted(() => {
  loadContents()
})
</script>
