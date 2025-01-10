'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Input, Space } from 'antd';
import { RobotOutlined, UserOutlined, BulbOutlined, FileTextOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ProjectDiscussion() {
  const [discussions] = useState([
    {
      author: '用户A',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "我想做一个网站收藏工具，主要是为了解决Chrome书签管理不直观的问题。",
      time: '10分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>让我帮你梳理一下核心需求：</Text>
          <Card size="small" className="bg-gray-50">
            <ul>
              <li>网站收藏与管理</li>
              <li>可视化展示（截图、状态）</li>
              <li>多种布局方式</li>
              <li>移动端适配</li>
            </ul>
          </Card>
          <Text>建议考虑添加一些差异化功能，比如网站状态监控？</Text>
        </Space>
      ),
      time: '9分钟前'
    },
    {
      author: '用户B',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "监控功能很好！我经常需要检查一些网站是否可用。另外，能否支持导入Chrome书签？",
      time: '7分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>补充技术可行性分析：</Text>
          <Card size="small" className="bg-gray-50">
            <ul>
              <li>Chrome书签导入：可以解析HTML格式的书签文件</li>
              <li>网站监控：使用定时任务检查响应状态和时间</li>
              <li>网站截图：可以用Puppeteer实现</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '6分钟前'
    },
    {
      author: '用户C',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "我有很多GitHub上标星的项目，能否也把这些导入进来？最好能自动分类。",
      time: '4分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>这是个很好的想法！让我整理一下完整的功能列表：</Text>
          <Card size="small" className="bg-blue-50">
            <Title level={5}>核心功能</Title>
            <ul>
              <li>网站收藏与管理（卡片展示）</li>
              <li>多布局切换，移动端适配</li>
              <li>网站状态监控</li>
            </ul>
            <Title level={5}>数据导入</Title>
            <ul>
              <li>Chrome书签导入</li>
              <li>GitHub Star导入</li>
            </ul>
            <Title level={5}>智能功能</Title>
            <ul>
              <li>自动分类</li>
              <li>网站推荐</li>
            </ul>
          </Card>
          <Space className="mt-2">
            <Tag color="blue">前端开发</Tag>
            <Tag color="green">后端API</Tag>
            <Tag color="purple">AI分类</Tag>
          </Space>
        </Space>
      ),
      time: '2分钟前'
    }
  ]);

  const projectSummary = {
    name: 'SitePin',
    description: '智能网站收藏与监控工具',
    features: [
      '简洁界面，多布局切换',
      '网站卡片展示（名称、截图、状态）',
      '实时监控网站可用性',
      '书签导入（Chrome、GitHub）',
      '智能分类与推荐'
    ]
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card 
          title="需求讨论" 
          extra={<Button type="primary">加入讨论</Button>}
        >
          <List
            itemLayout="horizontal"
            dataSource={discussions}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={
                    <Space>
                      <Text strong>{item.author}</Text>
                      <Text type="secondary" className="text-sm">{item.time}</Text>
                    </Space>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />
          <div className="mt-4">
            <TextArea rows={3} placeholder="分享你的想法..." />
            <Button type="primary" className="mt-2">发送</Button>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="项目概要" className="mb-4">
          <Space direction="vertical" className="w-full">
            <Title level={4}>{projectSummary.name}</Title>
            <Paragraph>{projectSummary.description}</Paragraph>
            <Text strong>主要功能：</Text>
            <ul>
              {projectSummary.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Space>
        </Card>

        <Card title="AI 助手提示" className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                icon: <BulbOutlined className="text-blue-500" />,
                title: "需求完善",
                content: "描述具体使用场景，有助于细化功能"
              },
              {
                icon: <FileTextOutlined className="text-green-500" />,
                title: "技术建议",
                content: "讨论技术选型和实现方案"
              },
              {
                icon: <ApiOutlined className="text-purple-500" />,
                title: "接口设计",
                content: "考虑数据结构和API设计"
              }
            ]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={item.icon} />}
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
} 