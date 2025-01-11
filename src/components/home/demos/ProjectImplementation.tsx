'use client';

import { Card, Row, Col, Typography, Button, Tree, Space, Tag, Input, Drawer, List, Avatar, Divider, Tabs, Empty, Tooltip, Alert } from 'antd';
import { RobotOutlined, UserOutlined, EditOutlined, BranchesOutlined, CommentOutlined, PlusOutlined, CodeOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { TreeProps } from 'antd/es/tree';
import { Collapse } from 'antd';
import { useTheme } from '@/app/providers';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

export default function ProjectImplementation() {
  const [selectedNode, setSelectedNode] = useState<string>('prosemirror');
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['frontend', 'backend', 'ai']);
  const { isDark } = useTheme();

  const treeData: TreeProps['treeData'] = [
    {
      title: '前端开发',
      key: 'frontend',
      icon: <CodeOutlined />,
      children: [
        {
          title: '编辑器系统',
          key: 'editor',
          children: [
            { title: 'ProseMirror集成', key: 'prosemirror' },
            { title: 'CRDT同步', key: 'crdt-sync' },
            { title: '协作状态显示', key: 'collab-status' }
          ]
        },
        {
          title: '项目可视化',
          key: 'visualization',
          children: [
            { title: 'Mermaid图表', key: 'mermaid' },
            { title: '思维导图', key: 'mindmap' },
            { title: '动画效果', key: 'animations' }
          ]
        }
      ]
    },
    {
      title: 'AI集成',
      key: 'ai',
      icon: <BranchesOutlined />,
      children: [
        {
          title: '实时分析',
          key: 'realtime-analysis',
          children: [
            { title: 'OpenAI集成', key: 'openai' },
            { title: '上下文管理', key: 'context' }
          ]
        },
        {
          title: '智能建议',
          key: 'suggestions',
          children: [
            { title: '项目结构生成', key: 'structure-gen' },
            { title: '代码优化建议', key: 'code-suggestions' }
          ]
        }
      ]
    }
  ];

  const nodeDetails = {
    'prosemirror': {
      title: 'ProseMirror编辑器集成',
      description: '实现基于ProseMirror的协同编辑器核心功能',
      tasks: [
        '基础编辑器设置',
        'Yjs集成',
        '光标同步',
        '协作状态展示'
      ],
      aiSuggestions: [
        {
          title: '技术选型',
          content: '建议使用@tiptap/core作为上层封装，简化ProseMirror的使用'
        },
        {
          title: '性能优化',
          content: '大文档编辑时考虑使用虚拟滚动，可以参考prosemirror-virtual-scroll'
        }
      ]
    }
  };

  const aiAnalysis = [
    {
      type: '依赖分析',
      content: 'editor/prosemirror 需要等待 crdt-sync 模块完成基础设置'
    },
    {
      type: '复杂度评估',
      content: 'ai/realtime-analysis 的上下文管理较为复杂，建议先实现基础分析功能'
    },
    {
      type: '并行建议',
      content: 'visualization/mermaid 和 editor/prosemirror 可以并行开发'
    }
  ];

  const nodeDiscussions = {
    'prosemirror': [
      {
        type: 'feature',
        author: 'dev_alex',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
        content: "我们需要考虑多人同时编辑时的冲突处理，建议实现一个乐观锁机制，让用户能看到谁在编辑哪个部分。",
        time: '5分钟前'
      },
      {
        type: 'feature',
        author: 'product_owner',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
        content: "用户反馈说希望能有类似Word的评论功能，可以在文档边缘标注评论，这个优先级如何？",
        time: '10分钟前'
      },
      {
        type: 'feature',
        author: 'senior_dev',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#531dab' }} />,
        content: "评论功能可以考虑用ProseMirror的decoration实现，这样能和文档内容完美集成。不过建议先完成基础编辑功能。",
        time: '8分钟前'
      }
    ],
    'crdt-sync': [
      {
        type: 'feature',
        author: 'backend_guru',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
        content: "我们需要考虑弱网环境下的用户体验，建议在UI上增加同步状态指示器，并实现本地优先的更新策略。",
        time: '10分钟前'
      },
      {
        type: 'feature',
        author: 'dev_sarah',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
        content: "同意，我们可以参考Notion的处理方式，离线时也能编辑，等网络恢复后自动同步。",
        time: '5分钟前'
      },
      {
        type: 'feature',
        author: 'product_owner',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
        content: "用户反馈在多人协作时不知道谁在编辑哪部分，能否在文档中显示其他用户的光标位置？",
        time: '3分钟前'
      }
    ],
    'collab-status': [
      {
        type: 'feature',
        author: 'ux_designer',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
        content: "协作状态的展示要尽量不影响用户的编辑体验，建议使用悬浮小气泡显示其他用户的位置。",
        time: '15分钟前'
      },
      {
        type: 'feature',
        author: 'dev_tom',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
        content: "可以考虑在右侧边栏显示当前在线用户列表，点击用户头像可以快速跳转到他们的编辑位置。",
        time: '10分钟前'
      },
      {
        type: 'feature',
        author: 'senior_dev',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#531dab' }} />,
        content: "建议添加一个简单的状态指示器，显示文档是否有未保存的更改。",
        time: '5分钟前'
      }
    ],
    'mermaid': [
      {
        type: 'feature',
        author: 'ux_designer',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
        content: "图表编辑时最好能分屏预览，左边编辑代码，右边实时显示效果。",
        time: '15分钟前'
      },
      {
        type: 'feature',
        author: 'pm_lisa',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />,
        content: "收到用户反馈，希望能提供常用图表模板，减少学习成本。",
        time: '10分钟前'
      }
    ],
    'mindmap': [
      {
        type: 'feature',
        author: 'ux_designer',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
        content: "思维导图需要支持拖拽调整节点位置，最好能记住用户的自定义布局。",
        time: '20分钟前'
      },
      {
        type: 'feature',
        author: 'dev_alex',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
        content: "建议加入快捷键支持，比如Tab键添加子节点，Enter键添加同级节点等。",
        time: '15分钟前'
      }
    ],
    'animations': [
      {
        type: 'feature',
        author: 'perf_expert',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
        content: "动画效果要注意性能，建议使用CSS动画代替JavaScript动画，必要时可以使用transform代替位置改变。",
        time: '30分钟前'
      },
      {
        type: 'feature',
        author: 'ux_designer',
        avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
        content: "动画时长建议控制在200-300ms，过长会影响操作流畅度。",
        time: '25分钟前'
      }
    ],
  };

  const aiNodeAnalysis = {
    'prosemirror': [
      "检测到多人对评论功能有需求，建议将其提升为高优先级任务",
      "建议引入自动保存机制，避免用户意外丢失内容",
      "考虑添加格式刷功能，提高编辑效率"
    ],
    'crdt-sync': [
      "建议实现渐进式的冲突解决策略",
      "可以考虑添加操作历史回溯功能",
      "建议增加网络状态可视化指示器"
    ],
    'collab-status': [
      "建议实现用户在线状态的实时更新",
      "可以考虑添加简单的用户互动功能",
      "推荐使用WebSocket保持连接状态"
    ],
    'mermaid': [
      "建议添加图表导出功能",
      "可以考虑实现图表版本对比功能",
      "推荐添加常用模板库"
    ],
    'mindmap': [
      "建议支持多种布局算法",
      "可以考虑添加节点折叠功能",
      "推荐实现导入导出功能"
    ],
    'animations': [
      "建议添加动画预设库",
      "注意性能优化，避免动画卡顿",
      "考虑添加动画时间轴编辑器"
    ]
  };

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
          title="节点讨论室" 
          extra={
            <Space>
              <Tag color="processing">AI实时优化中</Tag>
              {selectedNode && aiNodeAnalysis[selectedNode] && (
                <Tooltip title={aiNodeAnalysis[selectedNode].join('\n')}>
                  <Button icon={<RobotOutlined />}>AI分析</Button>
                </Tooltip>
              )}
            </Space>
          }
        >
          <Tabs
            activeKey={selectedNode}
            items={Object.keys(nodeDiscussions).map(nodeKey => ({
              key: nodeKey,
              label: treeData.map(item => 
                item.children?.map(child => 
                  child.children?.find(node => node.key === nodeKey)?.title
                )
              ).flat().filter(Boolean)[0] || nodeKey,
              children: (
                <Space direction="vertical" className="w-full">
                  <List
                    itemLayout="horizontal"
                    dataSource={nodeDiscussions[nodeKey] || []}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={item.avatar}
                          title={
                            <Space>
                              <Text strong>{item.author}</Text>
                              <Text type="secondary" className="text-sm">{item.time}</Text>
                              <Tag color={item.type === 'code' ? 'blue' : 'green'}>
                                {item.type === 'code' ? '代码细节' : '功能变更'}
                              </Tag>
                            </Space>
                          }
                          description={item.content}
                        />
                      </List.Item>
                    )}
                  />
                  {aiNodeAnalysis[nodeKey] && (
                    <Card size="small" className="mt-4" title="AI 分析">
                      <List
                        size="small"
                        dataSource={aiNodeAnalysis[nodeKey]}
                        renderItem={item => (
                          <List.Item>
                            <Text>{item}</Text>
                          </List.Item>
                        )}
                      />
                    </Card>
                  )}
                  <div className="mt-4">
                    <TextArea 
                      rows={3} 
                      placeholder={`关于 ${nodeKey} 节点，你有什么想法...`} 
                    />
                    <Space className="mt-2">
                      <Button type="primary">发送</Button>
                      <Button icon={<CodeOutlined />}>插入代码</Button>
                    </Space>
                  </div>
                </Space>
              )
            }))}
            onChange={(key) => setSelectedNode(key)}
          />
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
          <Collapse ghost defaultActiveKey={['1', '2', '3']}>
            <Panel header="优先级建议" key="1">
              <Space direction="vertical" className="w-full">
                <Tag color="red">高优先级</Tag>
                <ul>
                  <li>ProseMirror基础编辑器集成</li>
                  <li>CRDT离线协同编辑支持</li>
                  <li>多人协作状态显示</li>
                </ul>
                <Tag color="orange">中优先级</Tag>
                <ul>
                  <li>Mermaid图表实时预览</li>
                  <li>思维导图基础功能</li>
                  <li>文档评论系统</li>
                </ul>
                <Tag color="green">低优先级</Tag>
                <ul>
                  <li>动画效果优化</li>
                  <li>模板系统</li>
                  <li>高级图表功能</li>
                </ul>
              </Space>
            </Panel>
            <Panel header="技术栈建议" key="2">
              <Space direction="vertical" className="w-full">
                <Text strong>编辑器核心</Text>
                <Space>
                  <Tag>ProseMirror</Tag>
                  <Tag>Yjs</Tag>
                  <Tag>TipTap</Tag>
                </Space>
                <Text strong>协同编辑</Text>
                <Space>
                  <Tag>WebSocket</Tag>
                  <Tag>IndexedDB</Tag>
                  <Tag>WebRTC</Tag>
                </Space>
                <Text strong>可视化</Text>
                <Space>
                  <Tag>Mermaid.js</Tag>
                  <Tag>React-Flow</Tag>
                  <Tag>Framer Motion</Tag>
                </Space>
              </Space>
            </Panel>
            <Panel header="开发注意事项" key="3">
              <Space direction="vertical" className="w-full">
                <Alert
                  message="性能优化重点"
                  description="大文档编辑时使用虚拟滚动，协同编辑时注意状态同步性能"
                  type="info"
                  showIcon
                />
                <Alert
                  message="用户体验"
                  description="保证弱网环境下的编辑体验，添加适当的加载状态和错误提示"
                  type="warning"
                  showIcon
                />
                <Alert
                  message="协作冲突"
                  description="实现乐观更新，同时做好冲突解决机制"
                  type="error"
                  showIcon
                />
              </Space>
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
} 