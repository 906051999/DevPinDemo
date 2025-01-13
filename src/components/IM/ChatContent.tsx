'use client'

import { Message, User } from '@/types'
import { Avatar, List } from 'antd'
import dayjs from 'dayjs'

interface ChatContentProps {
  className?: string
  messages: Message[]
  users: User[]
}

export function ChatContent({ messages = [], users = [] }: ChatContentProps) {
  const usersMap = users.reduce<Record<string, User>>((acc, user) => ({ ...acc, [user.id]: user }), {})
  
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  return (
    <List
      className="p-4 space-y-4"
      itemLayout="horizontal"
      dataSource={sortedMessages}
      renderItem={message => {
        const user = usersMap[message.user_id]
        const messageDate = dayjs(message.created_at)
        const now = dayjs()
        const time = messageDate.format('HH:mm')
        
        let datePrefix = ''
        if (!messageDate.isSame(now, 'day')) {
          const diffDays = now.diff(messageDate, 'day')
          if (diffDays === 0) {
            datePrefix = '昨天 '
          } else if (diffDays === 1) {
            datePrefix = '前天 '
          } else if (diffDays < 6) {
            datePrefix = `${diffDays}天前 `
          } else {
            datePrefix = `${messageDate.format('MM-DD')} `
          }
        }

        return (
          <List.Item key={message.id} className="border-0 p-0">
            <div className="flex items-start gap-2 w-full">
              <Avatar src={user?.avatar}>{user?.name?.[0]}</Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs">{datePrefix + time}</span>
                </div>
                <div className="inline-block px-4 py-2 rounded-2xl max-w-[85%]">
                  {message.content}
                </div>
              </div>
            </div>
          </List.Item>
        )
      }}
    />
  )
}
