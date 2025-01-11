'use client';

import { Card, Row, Col, Typography, Space, Tag, List, Avatar, Timeline, Button, Tooltip } from 'antd';
import { UserOutlined, RobotOutlined, MessageOutlined, BranchesOutlined, CodeOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

export default function ProjectMonitoring() {
  const nodeActivities = [
    {
      node: "网站卡片组件",
      activities: [
        {
          type: "discussion",
          user: "Alex",
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
          content: "图片懒加载导致首屏加载时出现空白，需要添加占位图",
          time: "10分钟前",
          responses: [
            {
              user: "Sarah",
              content: "可以用blur-up技术，先加载一个很小的缩略图"
            },
            {
              user: "AI助手",
              content: "建议参考这个实现：[代码链接] 使用 LQIP (Low Quality Image Placeholder) 方案"
            }
          ]
        },
        {
          type: "commit",
          user: "Sarah",
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: "添加图片加载占位组件",
          time: "30分钟前",
          details: {
            files: ["CardImage.tsx", "ImagePlaceholder.tsx"],
            additions: 156,
            deletions: 23
          }
        }
      ]
    },
    {
      node: "监控系统",
      activities: [
        {
          type: "question",
          user: "Mike",
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
          content: "如何处理网站响应超时的情况？",
          time: "1小时前",
          responses: [
            {
              user: "AI助手",
              content: "建议实现重试机制，具体可以：1. 设置最大重试次数 2. 使用指数退避算法 3. 记录失败原因"
            }
          ]
        }
      ]
    }
  ];

  const developerInsights = [
    {
      developer: "Alex",
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      focus: ["网站卡片组件", "布局系统"],
      recentActivity: "高",
      collaboration: ["Sarah", "Mike"],
      expertise: ["React", "性能优化"]
    },
    {
      developer: "Sarah",
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      focus: ["监控系统", "数据可视化"],
      recentActivity: "中",
      collaboration: ["Alex", "Mike"],
      expertise: ["后端架构", "监控系统"]
    }
  ];

  const aiObservations = [
    {
      type: "协作建议",
      content: "Sarah和Alex在图片加载优化上有很好的配合，建议继续保持这种即时反馈的模式",
      time: "5分钟前"
    },
    {
      type: "潜在问题",
      content: "监控系统的超时处理问题可能影响到网站卡片组件的状态显示，建议两个模块的开发者协调一下",
      time: "20分钟前"
    },
    {
      type: "知识共享",
      content: "发现多人在讨论图片加载优化，已整理相关最佳实践文档：[链接]",
      time: "1小时前"
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card title="节点活动" className="mb-4">
          {nodeActivities.map((node, index) => (
            <div key={index} className="mb-6">
              <Space className="mb-2">
                <BranchesOutlined />
                <Text strong>{node.node}</Text>
              </Space>
              <Timeline
                items={node.activities.map(activity => ({
                  color: activity.type === 'question' ? 'red' : 'blue',
                  dot: activity.avatar,
                  children: (
                    <Card size="small" className="mb-2">
                      <Space direction="vertical" className="w-full">
                        <Space className="w-full justify-between">
                          <Space>
                            <Text strong>{activity.user}</Text>
                            <Tag color={
                              activity.type === 'discussion' ? 'blue' :
                              activity.type === 'commit' ? 'green' : 'red'
                            }>
                              {activity.type}
                            </Tag>
                          </Space>
                          <Text type="secondary">{activity.time}</Text>
                        </Space>
                        <Paragraph>{activity.content}</Paragraph>
                        {activity.responses && (
                          <div className="ml-8 mt-2">
                            {activity.responses.map((response, idx) => (
                              <div key={idx} className="mb-2">
                                <Space>
                                  <Avatar 
                                    icon={response.user === 'AI助手' ? <RobotOutlined /> : <UserOutlined />}
                                    size="small"
                                    style={{ backgroundColor: response.user === 'AI助手' ? '#87d068' : '#1890ff' }}
                                  />
                                  <Text strong>{response.user}:</Text>
                                  <Text>{response.content}</Text>
                                </Space>
                              </div>
                            ))}
                          </div>
                        )}
                        {activity.details && (
                          <div className="mt-2">
                            <Space>
                              <Tag color="blue">{activity.details.files.join(', ')}</Tag>
                              <Tag color="green">+{activity.details.additions}</Tag>
                              <Tag color="red">-{activity.details.deletions}</Tag>
                            </Space>
                          </div>
                        )}
                      </Space>
                    </Card>
                  )
                }))}
              />
            </div>
          ))}
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card 
          title="开发者洞察" 
          extra={<Button type="link" icon={<MessageOutlined />}>联系开发者</Button>}
          className="mb-4"
        >
          <List
            itemLayout="horizontal"
            dataSource={developerInsights}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={
                    <Space>
                      <Text strong>{item.developer}</Text>
                      <Tag color="blue">活跃度: {item.recentActivity}</Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" className="w-full">
                      <Space>
                        <Text type="secondary">关注:</Text>
                        {item.focus.map(f => (
                          <Tag key={f}>{f}</Tag>
                        ))}
                      </Space>
                      <Space>
                        <Text type="secondary">协作:</Text>
                        {item.collaboration.map(c => (
                          <Tag key={c}>{c}</Tag>
                        ))}
                      </Space>
                      <Space>
                        <Text type="secondary">专长:</Text>
                        {item.expertise.map(e => (
                          <Tag key={e} color="purple">{e}</Tag>
                        ))}
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Card title="AI 观察" className="mb-4">
          <Timeline
            items={aiObservations.map(obs => ({
              color: 'green',
              dot: <RobotOutlined style={{ fontSize: '16px' }} />,
              children: (
                <Space direction="vertical">
                  <Space>
                    <Tag color="blue">{obs.type}</Tag>
                    <Text type="secondary">{obs.time}</Text>
                  </Space>
                  <Text>{obs.content}</Text>
                </Space>
              )
            }))}
          />
        </Card>
      </Col>
    </Row>
  );
} 