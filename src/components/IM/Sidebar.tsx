'use client'

import { User } from '@/types'
import { Menu, Button, Avatar, Typography, Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Text } = Typography

interface SidebarProps {
  className?: string
  users: User[]
  onAddUser: () => void
  onEditUser: (user: User) => void
}

export function Sidebar({ className, users = [], onAddUser, onEditUser }: SidebarProps) {
  return (
    <Card className="h-full lg:block shadow-none" bordered={false}>
      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="mb-4 flex justify-between items-center">
          <Text strong className="text-lg">Users</Text>
          <Button type="primary" onClick={onAddUser} size="small">
            + Add Role
          </Button>
        </div>
        
        <div className="space-y-2">
          {users.map(user => (
            <Card 
              key={user.id}
              size="small" 
              className="group transition-colors cursor-pointer"
              bodyStyle={{ padding: '12px' }}
              bordered
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <Avatar src={user.avatar} size="default">
                    {user.name[0]}
                  </Avatar>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="font-medium truncate">{user.name}</div>
                    <Text type="secondary" className="text-xs">
                      {user.role}
                    </Text>
                  </div>
                </div>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EditOutlined />}
                  className="opacity-0 group-hover:opacity-100 ml-2"
                  onClick={() => onEditUser(user)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <Text strong>Users</Text>
          <Button type="primary" onClick={onAddUser} size="small">
            + Add Role
          </Button>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-2">
          {users.map(user => (
            <Card 
              key={user.id} 
              size="small" 
              className="flex-shrink-0 relative group w-20 hover:shadow-md transition-shadow"
              bodyStyle={{ padding: '8px', textAlign: 'center' }}
            >
              <div className="relative inline-block">
                <Avatar src={user.avatar} size="large">
                  {user.name[0]}
                </Avatar>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EditOutlined />}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 rounded-full shadow-sm"
                  onClick={() => onEditUser(user)}
                />
              </div>
              <div className="text-xs mt-2 truncate">
                {user.name}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}
