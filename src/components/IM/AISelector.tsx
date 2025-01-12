'use client'

import { User } from '@/types'
import { Select, Avatar, Space, Switch, Form, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import type { SelectProps } from 'antd'

interface AIConfig {
  autoReply: boolean
  randomReply: boolean
  interactWithOthers: boolean
}

interface AISelectorProps {
  users: User[]
  selectedAIs: string[]
  config: AIConfig
  onChange: (aiIds: string[]) => void
  onConfigChange: (config: AIConfig) => void
  className?: string
}

export function AISelector({ 
  users, 
  selectedAIs, 
  config,
  onChange, 
  onConfigChange,
  className 
}: AISelectorProps) {
  const aiUsers = users.filter(user => user.role === 'ai')
  
  const options: SelectProps['options'] = aiUsers.map(ai => ({
    value: ai.id,
    label: (
      <div className="flex items-center gap-2">
        <Avatar src={ai.avatar} size="small">
          {ai.name[0]}
        </Avatar>
        <span>{ai.name}</span>
      </div>
    )
  }))

  return (
    <div className={className}>
      <Select
        mode="multiple"
        placeholder="选择要加入对话的AI"
        value={selectedAIs}
        onChange={onChange}
        options={options}
        optionLabelProp="label"
        style={{ width: '100%' }}
      />
      {selectedAIs.length > 0 && (
        <Form layout="horizontal" className="mt-2 flex items-center gap-6">
          <Space>
            <Tooltip title="AI将自动回复消息">
              <QuestionCircleOutlined className="text-gray-400" />
            </Tooltip>
            <Switch
              size="small"
              checked={config.autoReply}
              onChange={(checked) => onConfigChange({ ...config, autoReply: checked })}
            />
            <span className="text-sm">自动回复</span>
          </Space>

          <Space>
            <Tooltip title="AI将随机选择何时回复">
              <QuestionCircleOutlined className="text-gray-400" />
            </Tooltip>
            <Switch
              size="small"
              checked={config.randomReply}
              onChange={(checked) => onConfigChange({ ...config, randomReply: checked })}
            />
            <span className="text-sm">随机回复</span>
          </Space>

          <Space>
            <Tooltip title="AI可以相互互动">
              <QuestionCircleOutlined className="text-gray-400" />
            </Tooltip>
            <Switch
              size="small"
              checked={config.interactWithOthers}
              onChange={(checked) => onConfigChange({ ...config, interactWithOthers: checked })}
            />
            <span className="text-sm">AI互动</span>
          </Space>
        </Form>
      )}
    </div>
  )
} 