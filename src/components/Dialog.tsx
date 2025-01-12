'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types'
import { Modal, Input, Select, Form } from 'antd'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; avatar: string; role: 'user' | 'ai'; prompt?: string }) => void
  editingUser?: User | null
}

export function Dialog({ isOpen, onClose, onSubmit, editingUser }: DialogProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'user' | 'ai'>('user')
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name)
      setRole(editingUser.role)
      setPrompt(editingUser.prompt || '')
    } else {
      setName('')
      setRole('user')
      setPrompt('')
    }
  }, [editingUser])

  const handleSubmit = () => {
    const avatar = editingUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    onSubmit({ name, avatar, role, ...(role === 'ai' ? { prompt } : {}) })
    setName('')
    setRole('user')
    setPrompt('')
  }

  return (
    <Modal
      title={editingUser ? '编辑角色' : '添加新角色'}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="确定"
      cancelText="取消"
    >
      <Form layout="vertical">
        <Form.Item label="名称">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="角色名称..."
          />
        </Form.Item>
        <Form.Item label="角色类型">
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            options={[
              { label: '用户', value: 'user' },
              { label: 'AI', value: 'ai' }
            ]}
          />
        </Form.Item>
        {role === 'ai' && (
          <Form.Item label="AI Prompt">
            <Input.TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="输入AI提示..."
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
} 