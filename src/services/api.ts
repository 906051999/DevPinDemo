import { Message, Room, User } from '@/types'

type MessageListener = (message: Message) => void

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
    subscribe: (roomId: string, onMessage: MessageListener) => {
      const eventSource = new EventSource(`/api/messages/stream?room_id=${roomId}`)
      
      eventSource.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          onMessage(message)
        } catch (e) {
          console.error('Failed to parse message:', e)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE error:', error)
        eventSource.close()
      }

      // 返回清理函数
      return () => {
        eventSource.close()
      }
    },
    
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
      return res.json()
    }
  },
  
  rooms: {
    getAll: async (): Promise<Room[]> => {
      const res = await fetch('/api/rooms')
      console.log(res)
      return res.json()
    },
    update: async (id: string, data: Partial<Room>): Promise<Room> => {
      const res = await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return res.json()
    }
  }
} 