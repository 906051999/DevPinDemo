'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/IM/Sidebar'
import { ChatContent } from '@/components/IM/ChatContent'
import { MessageInput } from '@/components/IM/MessageInput'
import { api } from '@/services/api'
import { Message, Room, User } from '@/types'
import { Dialog } from '@/components/Dialog'
import { Layout } from 'antd'
import { RoomTabs } from '@/components/IM/RoomTabs'
import { AISelector } from '@/components/IM/AISelector'
const { Sider, Content } = Layout

export default function IMPage() {
  const [users, setUsers] = useState<User[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [currentRoom, setCurrentRoom] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<string>('') // 临时用户ID，之后替换为认证
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [selectedAIs, setSelectedAIs] = useState<string[]>([])
  const [aiConfig, setAIConfig] = useState({
    autoReply: true,
    randomReply: false,
    interactWithOthers: false
  })
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    const initData = async () => {
      try {
        const [usersData, roomsData] = await Promise.all([
          api.users.getAll(),
          api.rooms.getAll()
        ])
        setUsers(usersData || [])
        setRooms(Array.isArray(roomsData) ? roomsData : [])
        if (roomsData?.length > 0) {
          setCurrentRoom(roomsData[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error)
        setUsers([])
        setRooms([])
      }
    }
    initData()
  }, [])

  useEffect(() => {
    if (!currentRoom) return
    
    // 初始加载消息
    api.messages.getByRoom(currentRoom).then(setMessages)
    
    // 订阅新消息
    const unsubscribe = api.messages.subscribe(currentRoom, (newMessage) => {
      setMessages(prev => [...prev, newMessage])
    })

    // 清理函数
    return () => {
      unsubscribe()
    }
  }, [currentRoom])

  const handleSendMessage = async (content: string) => {
    if (!currentRoom || !currentUser) return
    
    const newMessage = await api.messages.send(content, currentRoom, currentUser)
    setMessages(prev => [...prev, newMessage])
  }

  const handleRoomChange = (roomId: string) => {
    setCurrentRoom(roomId)
  }

  const handleAddUser = async (data: { name: string; avatar: string; role: 'user' | 'ai'; prompt?: string }) => {
    try {
      const newUser = await api.users.create(data)
      setUsers(prev => [...prev, newUser])
      setIsAddUserOpen(false)
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  const handleEditUser = async (data: { name: string; avatar: string; role: 'user' | 'ai'; prompt?: string }) => {
    if (!editingUser) return
    
    try {
      const updatedUser = await api.users.update(editingUser.id, {
        ...editingUser,
        ...data
      })
      
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ))
      
      // 如果用户类型改为 AI，且当前是选中的用户，则取消选中
      if (data.role === 'ai' && currentUser === editingUser.id) {
        setCurrentUser('')
      }
      
      // 如果用户类型改为 AI，且在选中的 AI 列表中，则添加到 AI 列表
      if (data.role === 'ai' && !selectedAIs.includes(editingUser.id)) {
        setSelectedAIs(prev => [...prev, editingUser.id])
      }
      
      // 如果用户类型改为普通用户，且在 AI 列表中，则从 AI 列表移除
      if (data.role === 'user' && selectedAIs.includes(editingUser.id)) {
        setSelectedAIs(prev => prev.filter(id => id !== editingUser.id))
      }

      setEditingUser(null)
      setIsAddUserOpen(false)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleRoomUpdate = async (roomId: string, name: string) => {
    try {
      const updatedRoom = await api.rooms.update(roomId, { name })
      setRooms(prev => prev.map(room => 
        room.id === roomId ? updatedRoom : room
      ))
    } catch (error) {
      console.error('Failed to update room:', error)
    }
  }

  const handleRoomReorder = (newRooms: Room[]) => {
    setRooms(newRooms)
    // 如果需要持久化排序，这里可以调用 API
  }

  return (
    <Layout className="h-[90dvh]">
      <Sider width={320} theme="light" className="hidden lg:block">
        <Sidebar 
          users={users}
          onAddUser={() => {
            setEditingUser(null)
            setIsAddUserOpen(true)
          }}
          onEditUser={(user) => {
            setEditingUser(user)
            setIsAddUserOpen(true)
          }}
        />
      </Sider>
      <Content>
        <Layout className="h-full relative">
          <div className="lg:hidden">
            <Sidebar 
              users={users}
              onAddUser={() => {
                setEditingUser(null)
                setIsAddUserOpen(true)
              }}
              onEditUser={(user) => {
                setEditingUser(user)
                setIsAddUserOpen(true)
              }}
            />
          </div>
          <RoomTabs
            rooms={rooms}
            currentRoom={currentRoom}
            onRoomChange={handleRoomChange}
            onRoomUpdate={handleRoomUpdate}
            onRoomReorder={handleRoomReorder}
          />
          <AISelector
            className="px-4 py-2 border-b"
            users={users}
            selectedAIs={selectedAIs}
            config={aiConfig}
            onChange={setSelectedAIs}
            onConfigChange={setAIConfig}
          />
          <Content className="overflow-y-auto pb-24">
            <ChatContent 
              messages={messages}
              users={users}
            />
          </Content>
          <MessageInput 
            className="absolute bottom-0 left-0 right-0 border-t p-4"
            onSendMessage={handleSendMessage}
            users={users}
            currentUser={currentUser}
            onUserChange={setCurrentUser}
          />
        </Layout>
      </Content>
      <Dialog
        isOpen={isAddUserOpen}
        onClose={() => {
          setIsAddUserOpen(false)
          setEditingUser(null)
        }}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        editingUser={editingUser}
      />
    </Layout>
  )
}
