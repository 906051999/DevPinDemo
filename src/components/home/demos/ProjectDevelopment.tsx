'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Tree, Space, Progress } from 'antd';
import { RobotOutlined, UserOutlined, CodeOutlined, BranchesOutlined, CheckCircleOutlined, MessageOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd';
import { useState } from 'react';

const { Paragraph, Text } = Typography;

export default function ProjectDevelopment() {
  const [selectedNode, setSelectedNode] = useState<string>('memory-system');

  const treeData: TreeProps['treeData'] = [
    {
      title: '记忆系统重构',
      key: 'memory-system',
      icon: <BranchesOutlined />,
      children: [
        {
          title: '图数据库集成',
          key: 'graph-db',
          icon: <CodeOutlined />,
        },
        {
          title: '记忆节点设计',
          key: 'memory-node',
          icon: <CodeOutlined />,
        },
        {
          title: '关系权重计算',
          key: 'relation-weight',
          icon: <CodeOutlined />,
        },
      ],
    },
  ];

  const nodeDetails = {
    'memory-system': {
      title: '记忆系统重构',
      status: '进行中',
      progress: 60,
      owner: 'Alex',
      priority: '高',
      deadline: '2025-04-01',
      description: '使用图数据库重构bot的记忆存储系统，提升记忆检索效率',
      tasks: [
        { title: '调研图数据库方案', status: 'done' },
        { title: '设计数据模型', status: 'done' },
        { title: '实现基础CRUD', status: 'in-progress' },
        { title: '性能测试', status: 'todo' },
      ],
      discussions: [
        {
          author: '开发者A',
          content: '建议使用Neo4j，对关系查询支持比较好',
          time: '2天前'
        },
        {
          author: 'AI助手',
          content: '补充一下Neo4j的优势：1. 原生图查询语言 2. 可视化工具支持 3. 活跃的社区',
          time: '2天前'
        },
        {
          author: '开发者B',
          content: '我们需要考虑数据量大了以后的分片策略',
          time: '1天前'
        }
      ]
    }
  };

  const aiSuggestions = [
    {
      title: '开发建议',
      content: '建议先实现一个简单的原型，验证图数据库的查询性能是否满足需求。可以使用以下测试数据：...',
      tags: ['性能测试', '原型验证']
    },
    {
      title: '相关资源',
      content: '这里有一些可能有帮助的资源：1. Neo4j最佳实践指南 2. 图数据库性能优化技巧 3. 示例代码仓库',
      tags: ['学习资源', '参考实现']
    },
    {
      title: '潜在问题',
      content: '需要注意的几个关键点：1. 数据一致性 2. 备份策略 3. 扩展性设计',
      tags: ['风险提示', '技术要点']
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card title="开发任务" className="mb-4">
          <Tree
            treeData={treeData}
            selectedKeys={[selectedNode]}
            onSelect={(selectedKeys) => {
              if (selectedKeys.length > 0) {
                setSelectedNode(selectedKeys[0] as string);
              }
            }}
          />
        </Card>

        <Card title="AI 助手" className="mb-4">
          <List
            itemLayout="vertical"
            dataSource={aiSuggestions}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<Space>
                    <RobotOutlined style={{ color: '#52c41a' }} />
                    <Text strong>{item.title}</Text>
                  </Space>}
                  description={
                    <>
                      <Paragraph>{item.content}</Paragraph>
                      <Space>
                        {item.tags.map(tag => (
                          <Tag key={tag} color="blue">{tag}</Tag>
                        ))}
                      </Space>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col xs={24} md={16}>
        {selectedNode && nodeDetails[selectedNode] && (
          <>
            <Card title="任务详情" className="mb-4">
              <Space direction="vertical" className="w-full">
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>负责人：</Text>
                    <Tag icon={<UserOutlined />}>{nodeDetails[selectedNode].owner}</Tag>
                  </Col>
                  <Col span={12}>
                    <Text strong>优先级：</Text>
                    <Tag color="red">{nodeDetails[selectedNode].priority}</Tag>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>状态：</Text>
                    <Tag color="processing">{nodeDetails[selectedNode].status}</Tag>
                  </Col>
                  <Col span={12}>
                    <Text strong>截止日期：</Text>
                    <Tag color="orange">{nodeDetails[selectedNode].deadline}</Tag>
                  </Col>
                </Row>
                <Paragraph className="mt-4">
                  {nodeDetails[selectedNode].description}
                </Paragraph>
                <Progress percent={nodeDetails[selectedNode].progress} />
              </Space>
            </Card>

            <Card title="子任务" className="mb-4">
              <List
                dataSource={nodeDetails[selectedNode].tasks}
                renderItem={task => (
                  <List.Item>
                    <Space>
                      <CheckCircleOutlined style={{ 
                        color: task.status === 'done' ? '#52c41a' : 
                               task.status === 'in-progress' ? '#1890ff' : '#d9d9d9' 
                      }} />
                      <Text>{task.title}</Text>
                      <Tag color={
                        task.status === 'done' ? 'success' : 
                        task.status === 'in-progress' ? 'processing' : 'default'
                      }>
                        {task.status === 'done' ? '已完成' : 
                         task.status === 'in-progress' ? '进行中' : '待开始'}
                      </Tag>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>

            <Card 
              title={<Space><MessageOutlined />开发讨论</Space>}
              extra={<Button type="primary" icon={<MessageOutlined />}>参与讨论</Button>}
            >
              <List
                itemLayout="horizontal"
                dataSource={nodeDetails[selectedNode].discussions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={item.author === 'AI助手' ? <RobotOutlined /> : <UserOutlined />} />}
                      title={<Space>
                        <Text strong>{item.author}</Text>
                        <Text type="secondary" className="text-sm">{item.time}</Text>
                      </Space>}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </>
        )}
      </Col>
    </Row>
  );
} 