<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Content Management</h2>
      <NuxtLink 
        to="/app/content/create" 
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Create Content
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="content in contents" :key="content.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ content.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ content.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': content.status === 'published',
                  'bg-yellow-100 text-yellow-800': content.status === 'draft',
                  'bg-red-100 text-red-800': content.status === 'archived'
                }">
                  {{ content.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(content.updatedAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <NuxtLink 
                    :to="`/app/content/${content.id}/edit`"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </NuxtLink>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContent } from '../composables/useContent'
import type { Content } from '../types'

const { fetchContents, removeContent } = useContent()
const contents = ref<Content[]>([])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const deleteContent = async (id: string) => {
  if (confirm('Are you sure you want to delete this content?')) {
    await removeContent(id)
    contents.value = contents.value.filter(content => content.id !== id)
  }
}

onMounted(async () => {
  contents.value = await fetchContents()
})
</script>
