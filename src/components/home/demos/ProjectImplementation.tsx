'use client';

import { Card, Row, Col, Typography, Button, Tree, Space, Tag, Input, Drawer, List, Avatar, Divider } from 'antd';
import { RobotOutlined, UserOutlined, EditOutlined, BranchesOutlined, CommentOutlined, PlusOutlined, CodeOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { TreeProps } from 'antd/es/tree';
import { Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

export default function ProjectImplementation() {
  const [showNodeDetail, setShowNodeDetail] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>('');
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['frontend', 'backend', 'ai']);

  const treeData: TreeProps['treeData'] = [
    {
      title: '前端开发',
      key: 'frontend',
      icon: <CodeOutlined />,
      children: [
        {
          title: '布局系统',
          key: 'layout',
          children: [
            { title: '网格布局', key: 'grid-layout' },
            { title: '列表布局', key: 'list-layout' },
            { title: '移动端适配', key: 'mobile-adapt' }
          ]
        },
        {
          title: '网站卡片组件',
          key: 'site-card',
          children: [
            { title: '基础信息展示', key: 'card-basic' },
            { title: '网站截图', key: 'card-screenshot' },
            { title: '状态指示器', key: 'card-status' }
          ]
        }
      ]
    },
    {
      title: '后端服务',
      key: 'backend',
      icon: <ApiOutlined />,
      children: [
        {
          title: '数据导入',
          key: 'data-import',
          children: [
            { title: 'Chrome书签解析', key: 'chrome-bookmarks' },
            { title: 'GitHub API集成', key: 'github-stars' }
          ]
        },
        {
          title: '监控系统',
          key: 'monitoring',
          children: [
            { title: '可用性检查', key: 'availability' },
            { title: '性能监控', key: 'performance' },
            { title: '告警系统', key: 'alerts' }
          ]
        }
      ]
    },
    {
      title: 'AI功能',
      key: 'ai',
      icon: <BranchesOutlined />,
      children: [
        {
          title: '智能分类',
          key: 'auto-category',
          children: [
            { title: '内容分析', key: 'content-analysis' },
            { title: '标签生成', key: 'tag-generation' }
          ]
        },
        {
          title: '网站推荐',
          key: 'recommendation',
          children: [
            { title: '相似度计算', key: 'similarity' },
            { title: '个性化推荐', key: 'personalized' }
          ]
        }
      ]
    }
  ];

  const nodeDetails = {
    'site-card': {
      title: '网站卡片组件',
      description: '展示单个网站的核心信息和状态的可复用组件',
      tasks: [
        '实现卡片基础布局',
        '集成网站截图功能',
        '添加状态指示器',
        '优化加载性能'
      ],
      aiSuggestions: [
        {
          title: '技术选型',
          content: '建议使用CSS Grid实现自适应布局，考虑使用React Suspense处理图片加载'
        },
        {
          title: '性能优化',
          content: '可以使用图片懒加载和渐进式加载提升用户体验'
        },
        {
          title: '交互设计',
          content: '建议添加hover效果展示更多信息，长按支持拖拽排序'
        }
      ]
    }
  };

  const aiAnalysis = [
    {
      type: '依赖分析',
      content: 'frontend/site-card 组件依赖 backend/monitoring 提供的状态数据，建议先完成监控接口'
    },
    {
      type: '复杂度评估',
      content: 'ai/auto-category 模块复杂度较高，建议优先处理基础分类逻辑，后续迭代优化'
    },
    {
      type: '并行建议',
      content: 'frontend/layout 和 backend/data-import 可以并行开发，互不影响'
    }
  ];

  const [discussions, setDiscussions] = useState([
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>根据项目需求，我建议将SitePin拆分为以下模块：</Text>
          <ul>
            <li>前端UI系统（布局、组件）</li>
            <li>数据导入服务（Chrome、GitHub）</li>
            <li>监控系统</li>
            <li>AI分类与推荐</li>
          </ul>
          <Text type="secondary">您觉得这个拆分合理吗？</Text>
        </Space>
      ),
      time: '5分钟前'
    },
    {
      author: '用户A',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "监控系统是否需要再细分？比如分为数据采集和告警两个部分",
      time: '4分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>好建议！我来调整监控系统的结构：</Text>
          <Card size="small">
            <Text strong>监控系统</Text>
            <ul>
              <li>数据采集
                <ul>
                  <li>可用性检查</li>
                  <li>性能指标采集</li>
                </ul>
              </li>
              <li>告警系统
                <ul>
                  <li>告警规则配置</li>
                  <li>通知分发</li>
                </ul>
              </li>
            </ul>
          </Card>
          <Text type="secondary">我已更新项目树，您可以查看新的结构</Text>
        </Space>
      ),
      time: '3分钟前'
    },
    {
      author: '用户B',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "前端的网站卡片组件是不是应该考虑性能优化？比如图片懒加载",
      time: '2分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>是的，我来补充前端性能相关的任务：</Text>
          <Card size="small">
            <Text strong>网站卡片组件</Text>
            <ul>
              <li>基础功能
                <ul>
                  <li>信息展示</li>
                  <li>状态指示器</li>
                </ul>
              </li>
              <li>性能优化
                <ul>
                  <li>图片懒加载</li>
                  <li>虚拟列表</li>
                  <li>预加载策略</li>
                </ul>
              </li>
            </ul>
          </Card>
          <Space className="mt-2">
            <Tag color="blue">已更新项目树</Tag>
            <Tag color="green">添加性能优化节点</Tag>
          </Space>
        </Space>
      ),
      time: '1分钟前'
    }
  ]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card title="项目结构规划" className="mb-4">
          <Tree
            defaultExpandAll={true}
            treeData={treeData}
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            onSelect={(keys) => {
              if (keys.length > 0) {
                setSelectedNode(keys[0] as string);
                setShowNodeDetail(true);
              }
            }}
          />
          <Space className="mt-4">
            <Button icon={<PlusOutlined />}>添加节点</Button>
            <Button icon={<EditOutlined />}>编辑节点</Button>
            <Button icon={<CommentOutlined />}>添加评论</Button>
          </Space>
        </Card>

        <Card 
          title="实时讨论" 
          extra={<Tag color="processing">AI实时优化中</Tag>}
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
            <TextArea 
              rows={3} 
              placeholder="对当前结构有什么想法？AI会帮你优化..." 
            />
            <Button type="primary" className="mt-2">发送</Button>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="AI 分析" className="mb-4">
          <List
            itemLayout="vertical"
            dataSource={aiAnalysis}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />}
                  title={<Tag color="blue">{item.type}</Tag>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card title="开发建议">
          <Collapse ghost>
            <Panel header="优先级建议" key="1">
              <Space direction="vertical" className="w-full">
                <Tag color="red">高优先级</Tag>
                <ul>
                  <li>基础布局系统</li>
                  <li>数据导入功能</li>
                </ul>
                <Tag color="orange">中优先级</Tag>
                <ul>
                  <li>网站监控系统</li>
                  <li>基础分类功能</li>
                </ul>
                <Tag color="green">低优先级</Tag>
                <ul>
                  <li>高级推荐功能</li>
                  <li>性能优化</li>
                </ul>
              </Space>
            </Panel>
            <Panel header="技术栈建议" key="2">
              <Space direction="vertical" className="w-full">
                <Text strong>前端</Text>
                <Space>
                  <Tag>Next.js</Tag>
                  <Tag>TailwindCSS</Tag>
                  <Tag>React-Grid-Layout</Tag>
                </Space>
                <Text strong>后端</Text>
                <Space>
                  <Tag>Node.js</Tag>
                  <Tag>PostgreSQL</Tag>
                  <Tag>Redis</Tag>
                </Space>
              </Space>
            </Panel>
          </Collapse>
        </Card>
      </Col>

      <Drawer
        title="节点详情"
        placement="right"
        onClose={() => setShowNodeDetail(false)}
        open={showNodeDetail}
        width={480}
      >
        {selectedNode && nodeDetails[selectedNode] && (
          <Space direction="vertical" className="w-full">
            <Title level={4}>{nodeDetails[selectedNode].title}</Title>
            <Paragraph>{nodeDetails[selectedNode].description}</Paragraph>
            
            <Text strong>任务列表：</Text>
            <ul>
              {nodeDetails[selectedNode].tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>

            <Divider />

            <Text strong>AI 建议：</Text>
            <List
              itemLayout="vertical"
              dataSource={nodeDetails[selectedNode].aiSuggestions}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.content}
                  />
                </List.Item>
              )}
            />

            <div className="mt-4">
              <Button type="primary" block>认领任务</Button>
              <Button block className="mt-2">添加讨论</Button>
            </div>
          </Space>
        )}
      </Drawer>
    </Row>
  );
} 