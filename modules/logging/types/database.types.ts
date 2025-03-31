export interface Database {
  public: {
    Tables: {
      logs: {
        Row: {
          id: string
          message: string
          level: 'info' | 'warn' | 'error' | 'debug'
          category: string
          metadata: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['logs']['Insert']>
      }
    }
  }
}
