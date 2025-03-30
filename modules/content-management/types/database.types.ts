export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contents: {
        Row: {
          id: string
          title: string
          type: string
          status: string
          metadata: Json
          created_by: string
          created_at: string
          updated_at: string
          schedule_publish_at: string | null
        }
        Insert: {
          id?: string
          title: string
          type: string
          status?: string
          metadata?: Json
          created_by: string
          created_at?: string
          updated_at?: string
          schedule_publish_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          type?: string
          status?: string
          metadata?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
          schedule_publish_at?: string | null
        }
      }
      content_versions: {
        Row: {
          id: string
          content_id: string
          content: string
          version_number: number
          change_summary: string | null
          restored_from: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          content: string
          version_number: number
          change_summary?: string | null
          restored_from?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          content?: string
          version_number?: number
          change_summary?: string | null
          restored_from?: string | null
          created_by?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
