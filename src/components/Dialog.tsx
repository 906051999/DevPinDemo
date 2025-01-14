'use client'

import { useState, useEffect } from 'react'
import { User } from '@/types'
import { Modal, Input, Select, Form, Button, Space } from 'antd'
import { fakerZH_CN, fakerEN } from '@faker-js/faker'

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
    const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    onSubmit({ name, avatar, role, ...(role === 'ai' ? { prompt } : {}) })
    setName('')
    setRole('user')
    setPrompt('')
  }

  const generateRandomName = (type: 'zh' | 'en') => {
    if (type === 'zh') {
      setName(fakerZH_CN.person.lastName() + fakerZH_CN.person.firstName())
    } else {
      setName(fakerEN.person.firstName())
    }
  }

  return (
    <Modal
      title={editingUser ? '编辑面具' : '添加新面具'}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="确定"
      cancelText="取消"
    >
      <Form layout="vertical">
        <Form.Item label="名称">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="面具名称..."
            />
            <Space>
              <Button size="small" onClick={() => generateRandomName('zh')}>
                随机中文名
              </Button>
              <Button size="small" onClick={() => generateRandomName('en')}>
                随机英文名
              </Button>
            </Space>
          </Space>
        </Form.Item>
        <Form.Item label="面具类型">
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
          <Form.Item label="Prompt">
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