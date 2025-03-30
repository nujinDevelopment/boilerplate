export interface Content {
  id: string
  title: string
  type: ContentType
  status: ContentStatus
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  created_by: string
  versions?: ContentVersion[]
  latest_version?: ContentVersion
}

export interface ContentVersion {
  id: string
  content_id: string
  content: string
  version_number: number
  created_at: string
  created_by: string
  restored_from?: string
  change_summary?: string
}

export type ContentType = 'page' | 'post' | 'article' | 'custom'

export type ContentStatus = 'draft' | 'published' | 'archived' | 'scheduled'

export interface CreateContentDTO {
  title: string
  type: ContentType
  content: string
  metadata?: Record<string, any>
  schedule_publish_at?: string
}

export interface UpdateContentDTO extends Partial<CreateContentDTO> {
  status?: ContentStatus
}

export interface ContentMetadata {
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  layout?: {
    template?: string
    sidebar?: boolean
    header?: boolean
    footer?: boolean
  }
  media?: {
    featured_image?: string
    gallery?: string[]
    attachments?: Array<{
      url: string
      name: string
      type: string
      size: number
    }>
  }
  categories?: string[]
  tags?: string[]
  custom?: Record<string, any>
}

export interface ContentFilter {
  type?: ContentType
  status?: ContentStatus
  category?: string
  tag?: string
  search?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface ContentSort {
  field: 'title' | 'created_at' | 'updated_at' | 'status'
  direction: 'asc' | 'desc'
}

export interface ContentPagination {
  page: number
  perPage: number
  total: number
}
