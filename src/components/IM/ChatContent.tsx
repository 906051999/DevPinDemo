'use client'

import { Message, User } from '@/types'
import { Avatar, List } from 'antd'

interface ChatContentProps {
  className?: string
  messages: Message[]
  users: User[]
}

export function ChatContent({ messages = [], users = [] }: ChatContentProps) {
  const usersMap = users.reduce<Record<string, User>>((acc, user) => ({ ...acc, [user.id]: user }), {})

  return (
    <List
      className="p-4"
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={message => (
        <List.Item key={message.id}>
          <List.Item.Meta
            avatar={<Avatar src={usersMap[message.user_id]?.avatar}>{usersMap[message.user_id]?.name?.[0]}</Avatar>}
            title={usersMap[message.user_id]?.name}
            description={message.content}
          />
        </List.Item>
      )}
    />
  )
}
