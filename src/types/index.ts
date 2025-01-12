export interface User {
  id: string
  name: string
  role: 'user' | 'ai' | 'system'
  prompt?: string
  avatar?: string
  created_at: Date
}

export interface Room {
  id: string
  name: string
  created_at: Date
}

export interface Message {
  id: string
  content: string
  user_id: string
  room_id: string
  created_at: Date
} 