'use client'

import { User } from '@/types'
import { Menu, Button, Avatar, Typography, Dropdown } from 'antd'
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
    <div className="h-full">
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <Text strong className="text-lg">Users</Text>
          <Button type="primary" onClick={onAddUser} size="small">
            + Add Role
          </Button>
        </div>
        
        <Menu 
          mode="inline"
          items={users.map(user => ({
            key: user.id,
            label: (
              <div className="flex items-center justify-between group">
                <div className="flex items-center">
                  <Avatar src={user.avatar} size="small">
                    {user.name[0]}
                  </Avatar>
                  <span className="ml-2">{user.name}</span>
                  <Text type="secondary" className="text-xs ml-2">({user.role})</Text>
                </div>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EditOutlined />}
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditUser(user)
                  }}
                />
              </div>
            )
          }))}
        />
      </div>
    </div>
  )
}
