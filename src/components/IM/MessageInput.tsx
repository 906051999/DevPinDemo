'use client'

import { useState } from 'react'
import { User } from '@/types'
import { Input, Button, Avatar, Dropdown } from 'antd'

interface MessageInputProps {
  className?: string
  onSendMessage: (content: string) => void
  users: User[]
  currentUser: string
  onUserChange: (userId: string) => void
}

export function MessageInput({ className, onSendMessage, users, currentUser, onUserChange }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const currentUserData = users.find(u => u.id === currentUser)

  const userMenu = {
    items: users
      .filter(user => user.role !== 'ai' && user.role !== 'system')
      .map(user => ({
        key: user.id,
        label: (
          <Avatar 
            src={user.avatar} 
            className={currentUser === user.id ? 'ring-2 ring-blue-400' : ''}
          >
            {user.name[0]}
          </Avatar>
        ),
        onClick: () => onUserChange(user.id)
      }))
  }

  return (
    <div className={className}>
      <div className="flex gap-2 items-center">
        <Dropdown menu={userMenu} trigger={['click']}>
          <Avatar src={currentUserData?.avatar} className="cursor-pointer">
            {currentUserData?.name?.[0] || 'R'}
          </Avatar>
        </Dropdown>
        
        <Input.Search
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={currentUser ? "输入消息..." : "请先选择角色..."}
          disabled={!currentUser}
          enterButton="发送"
          onSearch={(value) => {
            if (value.trim()) {
              onSendMessage(value)
              setMessage('')
            }
          }}
        />
      </div>
    </div>
  )
}
