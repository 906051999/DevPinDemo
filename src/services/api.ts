import { Message, Room, User } from '@/types'

export const api = {
  users: {
    getAll: async (): Promise<User[]> => {
      const res = await fetch('/api/users')
      console.log(res)
      return res.json()
    },
    create: async (data: { name: string; avatar: string; role: 'user' | 'ai'; prompt?: string }): Promise<User> => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return res.json()
    },
    update: async (id: string, data: Partial<User>): Promise<User> => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return res.json()
    }
  },
  
  messages: {
    getByRoom: async (roomId: string): Promise<Message[]> => {
      const res = await fetch(`/api/messages?room_id=${roomId}`)
      return res.json()
    },
    
    send: async (content: string, roomId: string, userId: string): Promise<Message> => {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, room_id: roomId, user_id: userId })
      })
      console.log(res)
      return res.json()
    }
  },
  
  rooms: {
    getAll: async (): Promise<Room[]> => {
      const res = await fetch('/api/rooms')
      console.log(res)
      return res.json()
    }
  }
} 