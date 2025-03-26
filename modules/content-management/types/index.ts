export interface Content {
  id: string
  title: string
  type: ContentType
  status: ContentStatus
  content: string
  metadata: Record<string, any>
  createdAt: string
  updatedAt: string
}

export type ContentType = 'page' | 'post' | 'article' | 'custom'

export type ContentStatus = 'draft' | 'published' | 'archived'

export interface CreateContentDTO {
  title: string
  type: ContentType
  content: string
  metadata?: Record<string, any>
}

export interface UpdateContentDTO extends Partial<CreateContentDTO> {
  status?: ContentStatus
}
