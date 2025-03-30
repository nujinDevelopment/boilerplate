<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">{{ isEditing ? 'Edit Content' : 'Create Content' }}</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <!-- Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            v-model="form.type"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="page">Page</option>
            <option value="post">Post</option>
            <option value="article">Article</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <!-- Status -->
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
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <!-- Schedule Publish -->
        <div v-if="form.status === 'scheduled'">
          <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule Publish Date</label>
          <input
            id="schedule"
            v-model="form.schedule_publish_at"
            type="datetime-local"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <!-- Categories -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Categories</label>
          <div class="mt-1 flex flex-wrap gap-2">
            <div
              v-for="category in form.metadata.categories"
              :key="category"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
            >
              {{ category }}
              <button
                type="button"
                @click="removeCategory(category)"
                class="ml-2 inline-flex items-center p-0.5 rounded-full text-primary-800 hover:bg-primary-200 focus:outline-none"
              >
                <span class="sr-only">Remove category</span>
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <input
              v-model="newCategory"
              @keydown.enter.prevent="addCategory"
              type="text"
              placeholder="Add category"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Tags</label>
          <div class="mt-1 flex flex-wrap gap-2">
            <div
              v-for="tag in form.metadata.tags"
              :key="tag"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(tag)"
                class="ml-2 inline-flex items-center p-0.5 rounded-full text-gray-800 hover:bg-gray-200 focus:outline-none"
              >
                <span class="sr-only">Remove tag</span>
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              type="text"
              placeholder="Add tag"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <!-- Featured Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Featured Image</label>
          <div class="mt-1 flex items-center space-x-4">
            <div
              v-if="form.metadata.media.featured_image"
              class="relative w-32 h-32 rounded-lg overflow-hidden"
            >
              <img
                :src="form.metadata.media.featured_image"
                class="w-full h-full object-cover"
                alt="Featured image"
              />
              <button
                type="button"
                @click="removeFeaturedImage"
                class="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <input
              type="file"
              ref="featuredImageInput"
              @change="handleFeaturedImageUpload"
              accept="image/*"
              class="hidden"
            />
            <button
              type="button"
              @click="handleImageClick"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {{ form.metadata.media.featured_image ? 'Change Image' : 'Upload Image' }}
            </button>
          </div>
        </div>

        <!-- Content Editor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <div class="min-h-[400px] border rounded-lg overflow-hidden">
            <editor-content :editor="editor" />
          </div>
        </div>

        <!-- SEO Settings -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">SEO Title</label>
              <input
                v-model="form.metadata.seo.title"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                v-model="form.metadata.seo.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Keywords</label>
              <input
                v-model="newKeyword"
                @keydown.enter.prevent="addKeyword"
                type="text"
                placeholder="Add keyword and press Enter"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="keyword in form.metadata.seo.keywords"
                  :key="keyword"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {{ keyword }}
                  <button
                    type="button"
                    @click="removeKeyword(keyword)"
                    class="ml-1 inline-flex items-center p-0.5 rounded-full text-gray-800 hover:bg-gray-200 focus:outline-none"
                  >
                    <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Layout Settings -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Layout Settings</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Template</label>
              <select
                v-model="form.metadata.layout.template"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="default">Default</option>
                <option value="full-width">Full Width</option>
                <option value="sidebar">With Sidebar</option>
                <option value="landing">Landing Page</option>
              </select>
            </div>
            <div class="flex items-center space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.metadata.layout.sidebar"
                  class="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span class="ml-2 text-sm text-gray-700">Show Sidebar</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.metadata.layout.header"
                  class="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span class="ml-2 text-sm text-gray-700">Show Header</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.metadata.layout.footer"
                  class="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span class="ml-2 text-sm text-gray-700">Show Footer</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Version History -->
        <div v-if="isEditing && contentVersions.length > 0" class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Version History</h3>
          <div class="space-y-4">
            <div v-for="version in contentVersions" :key="version.id" class="flex items-center justify-between">
              <div>
                <span class="text-sm font-medium">Version {{ version.version_number }}</span>
                <span class="text-sm text-gray-500 ml-2">{{ formatDate(version.created_at) }}</span>
                <span v-if="version.restored_from" class="text-xs text-gray-500 ml-2">(Restored)</span>
              </div>
              <button
                type="button"
                @click="restoreVersion(version.id)"
                class="text-sm text-primary hover:text-primary-focus"
              >
                Restore this version
              </button>
            </div>
          </div>
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
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {{ isEditing ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useContent } from '../composables/useContent'
import type { Content, CreateContentDTO, UpdateContentDTO, ContentType, ContentStatus, ContentMetadata } from '../types'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import type { Editor } from '@tiptap/core'

const props = defineProps<{
  contentId?: string
}>()

const router = useRouter()
const { 
  currentContent,
  contentVersions,
  loading,
  error,
  createContent,
  updateContent,
  fetchContent,
  restoreVersion: restoreContentVersion,
  uploadMedia
} = useContent()

const isEditing = computed(() => !!props.contentId)

interface FormMetadata extends Required<ContentMetadata> {
  seo: Required<NonNullable<ContentMetadata['seo']>>
  layout: Required<NonNullable<ContentMetadata['layout']>>
  media: Required<NonNullable<ContentMetadata['media']>>
}

interface FormData {
  title: string
  type: ContentType
  status?: ContentStatus
  content: string
  schedule_publish_at?: string
  metadata: FormMetadata
}

const defaultMetadata: FormMetadata = {
  seo: {
    title: '',
    description: '',
    keywords: []
  },
  layout: {
    template: 'default',
    sidebar: true,
    header: true,
    footer: true
  },
  media: {
    featured_image: '',
    gallery: [],
    attachments: []
  },
  categories: [],
  tags: [],
  custom: {}
}

const form = ref<FormData>({
  title: '',
  type: 'page',
  content: '',
  metadata: defaultMetadata
})

// Rich Text Editor
const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: false
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableCell,
    TableHeader
  ],
  onUpdate: ({ editor }) => {
    form.value.content = editor.getHTML()
  }
})

// Category Management
const newCategory = ref('')
const addCategory = () => {
  if (newCategory.value && !form.value.metadata.categories.includes(newCategory.value)) {
    form.value.metadata.categories.push(newCategory.value)
    newCategory.value = ''
  }
}
const removeCategory = (category: string) => {
  form.value.metadata.categories = form.value.metadata.categories.filter(c => c !== category)
}

// Tag Management
const newTag = ref('')
const addTag = () => {
  if (newTag.value && !form.value.metadata.tags.includes(newTag.value)) {
    form.value.metadata.tags.push(newTag.value)
    newTag.value = ''
  }
}
const removeTag = (tag: string) => {
  form.value.metadata.tags = form.value.metadata.tags.filter(t => t !== tag)
}

// SEO Keywords
const newKeyword = ref('')
const addKeyword = () => {
  if (newKeyword.value && !form.value.metadata.seo.keywords.includes(newKeyword.value)) {
    form.value.metadata.seo.keywords.push(newKeyword.value)
    newKeyword.value = ''
  }
}
const removeKeyword = (keyword: string) => {
  form.value.metadata.seo.keywords = form.value.metadata.seo.keywords.filter(k => k !== keyword)
}

// Media Handling
const featuredImageInput = ref<HTMLInputElement | null>(null)

const handleImageClick = () => {
  if (featuredImageInput.value) {
    featuredImageInput.value.click()
  }
}
const handleFeaturedImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const url = await uploadMedia(file)
    if (url) {
      form.value.metadata.media.featured_image = url
    }
  }
}
const removeFeaturedImage = () => {
  form.value.metadata.media.featured_image = ''
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

const restoreVersion = async (versionId: string) => {
  if (props.contentId) {
    await restoreContentVersion(props.contentId, versionId)
    await fetchContent(props.contentId)
  }
}

const handleSubmit = async () => {
  try {
    if (isEditing.value && props.contentId) {
      const updateData: UpdateContentDTO = {
        title: form.value.title,
        type: form.value.type,
        content: form.value.content,
        status: form.value.status,
        metadata: form.value.metadata,
        schedule_publish_at: form.value.schedule_publish_at
      }
      await updateContent(props.contentId, updateData)
    } else {
      const createData: CreateContentDTO = {
        title: form.value.title,
        type: form.value.type,
        content: form.value.content,
        metadata: form.value.metadata,
        schedule_publish_at: form.value.schedule_publish_at
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
    await fetchContent(props.contentId)
    if (currentContent.value) {
      form.value = {
        title: currentContent.value.title,
        type: currentContent.value.type,
        status: currentContent.value.status,
        content: currentContent.value.latest_version?.content || '',
        metadata: {
          ...defaultMetadata,
          ...currentContent.value.metadata
        }
      }
      editor?.value?.commands.setContent(form.value.content)
    }
  }
})

onBeforeUnmount(() => {
  editor?.value?.destroy()
})
</script>

<style src="@/assets/css/prosemirror.css"></style>
