<template>
  <div>
    <div class="mb-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search by Category</span>
        </label>
        <input v-model="categoryFilter" type="text" placeholder="Search logs by category" class="input input-bordered w-full" />
      </div>
    </div>

    <div class="mb-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Filter by Level</span>
        </label>
        <select v-model="levelFilter" class="input input-bordered w-full">
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
        </select>
      </div>  
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Category</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="text-center">
              <span class="loading loading-spinner loading-lg"></span>
            </td>
          </tr>
          <tr v-else-if="logs.length === 0">
            <td colspan="4" class="text-center">No logs found</td>
          </tr>
          <tr v-else v-for="log in logs" :key="log.id">
            <td>{{ formatDate(log.createdAt) }}</td>
            <td>
              <div class="badge" :class="{
                'badge-info': log.level === 'info',
                'badge-warning': log.level === 'warn',
                'badge-error': log.level === 'error',
                'badge-outline': log.level === 'debug',
              }">
                {{ log.level }}
              </div>
            </td>
            <td>{{ log.category }}</td>
            <td>
              <div class="collapse">
                <input type="checkbox" /> 
                <div class="collapse-title text-sm">
                  {{ truncateMessage(log.message) }}
                </div>
                <div class="collapse-content"> 
                  <pre><code>{{ log.message }}</code></pre>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-col justify-center items-center mt-4">
      <div class="flex flex-col justify-center items-center mt-4">
        <span class="p-4">Page {{ pagination.page }} of {{ totalPages }}</span>
        <select v-model="pagination.pageSize" class="select select-bordered select-sm input input-bordered" @change="updatePageSize">
          <option :value="10">10 per page</option>
          <option :value="25">25 per page</option>
          <option :value="50">50 per page</option>
        </select>
      </div>
      <div class="btn-group pt-4">
        <button class="btn btn-sm" :disabled="pagination.page === 1" @click="setPage(pagination.page - 1)">«</button>
        <button class="btn btn-sm">Page {{ pagination.page }}</button>
        <button class="btn btn-sm" :disabled="pagination.page === totalPages" @click="setPage(pagination.page + 1)">»</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLogger } from '../composables/useLogger'

const { logs, fetchLogs, loading, page, pageSize, setPage, setPageSize, totalCount, setLevel, setCategory } = useLogger()

const isLoading = ref(true)
const categoryFilter = ref('')
const levelFilter = ref('')

const pagination = computed(() => ({
  page: page.value,
  pageSize: pageSize.value
}))

const totalPages = computed(() => Math.ceil(totalCount.value / pagination.value.pageSize))

const truncateMessage = (msg: string, length = 100) => {
  if (msg.length <= length) return msg
  return msg.slice(0, length) + '...'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

const updatePageSize = () => {
  setPageSize(pagination.value.pageSize)
}

watch([categoryFilter, levelFilter], () => {
  setCategory(categoryFilter.value)
  setLevel(levelFilter.value)
  setPage(1) // Reset to first page when filters change
})

fetchLogs().then(() => {
  isLoading.value = false
})
</script>