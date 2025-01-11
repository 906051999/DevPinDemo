'use client';

import { Layout, Card, Typography, Avatar, Space, Tag, List, Input, Badge, Tabs, Row, Col, Progress,  } from 'antd';
import { RobotOutlined, UserOutlined, SendOutlined, BulbOutlined, ApiOutlined, TeamOutlined, PartitionOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Background,
  Controls,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const { Title, Text, Paragraph } = Typography;
const { Sider, Content } = Layout;
const { TextArea } = Input;

export default function ProjectHub() {
  const [selectedProject, setSelectedProject] = useState('devpin');
  const [selectedNode, setSelectedNode] = useState('general');
  const [message, setMessage] = useState('');
  
  const projects = [
    {
      id: 'devpin',
      name: 'DevPin',
      desc: '让创意自然生长的对话平台',
      status: '构思中',
      members: 12,
      tags: ['AI', '协作', 'Web']
    },
    {
      id: 'bot-social',
      name: 'Bot社交模拟',
      desc: '探索AI社交行为的实验项目',
      status: '开发中',
      members: 8,
      tags: ['AI', '社交', 'NLP']
    }
  ];

  const projectNodes = {
    devpin: [
      { id: 'editor', type: 'input', data: { label: '编辑器系统' }, position: { x: 250, y: 0 } },
      { id: 'crdt', data: { label: 'CRDT同步' }, position: { x: 100, y: 100 } },
      { id: 'collab', data: { label: '协作状态' }, position: { x: 400, y: 100 } },
      { id: 'ai', data: { label: 'AI分析' }, position: { x: 250, y: 200 } }
    ] as Node[],
    'bot-social': [
      { id: 'llm', type: 'input', data: { label: 'LLM选型' }, position: { x: 250, y: 0 } },
      { id: 'prompt', data: { label: 'Prompt设计' }, position: { x: 100, y: 100 } },
      { id: 'context', data: { label: '上下文管理' }, position: { x: 400, y: 100 } }
    ] as Node[]
  };

  const projectEdges = {
    devpin: [
      { id: 'e1-2', source: 'editor', target: 'crdt', markerEnd: { type: MarkerType.Arrow } },
      { id: 'e1-3', source: 'editor', target: 'collab', markerEnd: { type: MarkerType.Arrow } },
      { id: 'e2-4', source: 'crdt', target: 'ai', markerEnd: { type: MarkerType.Arrow } },
      { id: 'e3-4', source: 'collab', target: 'ai', markerEnd: { type: MarkerType.Arrow } }
    ] as Edge[],
    'bot-social': [
      { id: 'e1-2', source: 'llm', target: 'prompt', markerEnd: { type: MarkerType.Arrow } },
      { id: 'e1-3', source: 'llm', target: 'context', markerEnd: { type: MarkerType.Arrow } }
    ] as Edge[]
  };

  const projectChats = {
    devpin: {
      general: [
        {
          author: 'dev_alex',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
          content: '我们是否考虑使用图数据库来存储创意关系网络？',
          time: '10分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '图数据库确实适合存储关联关系。建议考虑Neo4j，它的查询语言直观且性能好。',
          time: '8分钟前'
        },
        {
          author: 'backend_guru',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: '同意用Neo4j。我们还需要考虑数据备份和恢复策略。',
          time: '7分钟前'
        }
      ],
      editor: [
        {
          author: 'sarah_dev',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
          content: '编辑器这块我建议用ProseMirror，对协同编辑支持比较好',
          time: '6分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '同意，ProseMirror的优势：1. 模块化设计 2. 协同编辑支持 3. 丰富的社区插件',
          time: '5分钟前'
        },
        {
          author: 'ui_master',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
          content: '我们需要自定义一些编辑器工具栏，ProseMirror的扩展机制很适合这个需求',
          time: '4分钟前'
        },
        {
          author: 'tech_lead',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: '记得处理图片上传和预览功能，这是用户经常用到的',
          time: '3分钟前'
        }
      ],
      crdt: [
        {
          author: 'tech_lead',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: 'CRDT同步这块，我们需要考虑离线场景',
          time: '15分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '建议使用Yjs + IndexedDB实现离线存储和同步',
          time: '12分钟前'
        },
        {
          author: 'backend_guru',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: '我们还需要考虑冲突解决策略，特别是在多人同时编辑时',
          time: '10分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '对于冲突解决，Yjs使用了CRDT算法，可以自动处理大多数冲突情况。对于特殊场景，我们可以添加自定义的合并策略。',
          time: '8分钟前'
        }
      ],
      ai: [
        {
          author: 'ml_expert',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
          content: '我们需要决定是用OpenAI的API还是自己部署开源模型',
          time: '20分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '建议采用混合策略：1. 基础功能用开源模型 2. 高级分析用OpenAI 3. 根据需求动态切换',
          time: '18分钟前'
        },
        {
          author: 'product_owner',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
          content: '成本是个问题，我们需要评估一下用量和预算',
          time: '15分钟前'
        }
      ]
    },
    'bot-social': {
      general: [
        {
          author: 'tech_lead',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: '大家觉得用哪个LLM比较合适？考虑到成本和效果的平衡。',
          time: '15分钟前'
        },
        {
          author: 'ml_expert',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
          content: '我们可以先用Llama 2做基础模型，然后针对社交场景做微调。',
          time: '10分钟前'
        }
      ],
      llm: [
        {
          author: 'ai_researcher',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#531dab' }} />,
          content: 'Llama 2的7B模型在社交场景下表现不错，而且资源占用适中',
          time: '8分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '补充一下Llama 2的优势：1. 开源免费 2. 社区活跃 3. 支持商用 4. 训练数据质量高',
          time: '7分钟前'
        },
        {
          author: 'dev_tim',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
          content: '我们需要考虑模型部署的基础设施，GPU资源够吗？',
          time: '5分钟前'
        }
      ],
      prompt: [
        {
          author: 'nlp_expert',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
          content: '我们需要设计一个统一的Prompt模板，方便后期维护和优化',
          time: '12分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '建议使用Langchain的PromptTemplate，可以更好地管理和复用Prompt',
          time: '10分钟前'
        }
      ],
      context: [
        {
          author: 'senior_dev',
          avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
          content: '上下文管理是个大问题，要考虑内存占用和检索效率',
          time: '15分钟前'
        },
        {
          author: 'AI助手',
          avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
          content: '可以考虑使用向量数据库（如Milvus）存储对话历史，按需检索相关上下文',
          time: '12分钟前'
        }
      ]
    }
  };

  const projectAnalysis = {
    devpin: {
      intro: {
        brief: 'DevPin是一个创新的开发者创意管理平台，致力于让技术创意的收集和发展变得更自然、高效。',
        highlights: [
          '实时协作编辑',
          'AI辅助分析',
          '知识图谱可视化'
        ],
        techStack: [
          'React + TypeScript',
          'ProseMirror + Yjs',
          'Neo4j + GraphQL'
        ]
      },
      stage: {
        current: '概念验证阶段',
        milestones: [
          { name: '编辑器核心', status: 'in_progress', progress: 30 },
          { name: '协同系统', status: 'in_progress', progress: 20 },
          { name: 'AI集成', status: 'planning', progress: 10 }
        ],
        nextSteps: [
          '完善离线协作机制',
          '实现基础AI分析功能',
          '优化编辑器性能'
        ]
      },
      opportunities: {
        features: [
          {
            title: '离线协作支持',
            detail: '让用户在无网络时也能继续工作，稍后自动同步',
            tasks: [
              '本地数据存储和缓存机制',
              '冲突检测和解决策略',
              '后台同步队列'
            ]
          },
          {
            title: '创意可视化展示',
            detail: '以图形化方式展示创意之间的关联',
            tasks: [
              '关系图谱交互设计',
              '节点布局优化算法',
              '大数据量下的渲染性能'
            ]
          },
          {
            title: 'AI辅助分析',
            detail: '实时分析讨论内容，提供建议和洞察',
            tasks: [
              '上下文相关性分析',
              '关键信息提取和总结',
              '智能建议生成'
            ]
          }
        ],
        improvements: [
          {
            title: '多人实时状态',
            detail: '优化多人同时在线时的协作体验',
            tasks: [
              '光标和选区同步',
              '用户行为状态展示',
              '实时通知机制'
            ]
          },
          {
            title: '创意版本管理',
            detail: '追踪和管理创意的演变过程',
            tasks: [
              '历史版本回溯',
              '分支管理和合并',
              '变更对比可视化'
            ]
          }
        ],
        explorations: [
          {
            title: '创意推荐系统',
            detail: '基于用户兴趣和项目上下文推荐相关创意',
            tasks: [
              '兴趣图谱构建',
              '相似度计算模型',
              '推荐算法设计'
            ]
          },
          {
            title: '多模态输入',
            detail: '支持图片、语音等多种形式的创意输入',
            tasks: [
              '语音转文字处理',
              '图片内容分析',
              '多模态数据融合'
            ]
          }
        ]
      }
    },
    'bot-social': {
      intro: {
        brief: 'Bot社交模拟是一个探索性项目，旨在研究和实现更自然的AI社交行为模式。',
        highlights: [
          'LLM多模型集成',
          '上下文管理系统',
          '行为模式分析'
        ],
        techStack: [
          'Python + FastAPI',
          'Llama 2 + LangChain',
          'Vue3 + TypeScript'
        ]
      },
      stage: {
        current: '开发阶段',
        milestones: [
          { name: 'LLM集成', status: 'in_progress', progress: 40 },
          { name: 'Prompt系统', status: 'in_progress', progress: 25 },
          { name: '上下文管理', status: 'in_progress', progress: 30 }
        ],
        nextSteps: [
          '完善多模型切换机制',
          '优化上下文处理性能',
          '增加行为分析模块'
        ]
      },
      opportunities: {
        features: [
          {
            title: '多模型对话系统',
            detail: '根据场景自动选择最合适的语言模型',
            tasks: [
              '模型评估和选择机制',
              '动态切换策略',
              '性能和成本平衡'
            ]
          },
          {
            title: '情境感知对话',
            detail: '理解和维护对话的上下文信息',
            tasks: [
              '上下文向量化存储',
              '相关性检索优化',
              '长期记忆管理'
            ]
          }
        ],
        improvements: [
          {
            title: '个性化交互',
            detail: '根据用户特点调整交互风格',
            tasks: [
              '用户画像构建',
              '交互风格适配',
              '反馈学习机制'
            ]
          }
        ],
        explorations: [
          {
            title: '群体行为模拟',
            detail: '模拟多个AI角色之间的互动',
            tasks: [
              '角色特征定义',
              '群体动态模拟',
              '互动规则设计'
            ]
          }
        ]
      }
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    // 这里可以添加发送消息的逻辑
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getTabs = () => {
    const tabs = [
      {
        key: 'general',
        label: '总体讨论',
        children: (
          <List
            className="flex-1 overflow-auto"
            dataSource={projectChats[selectedProject].general}
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
        )
      }
    ];

    projectNodes[selectedProject].forEach(node => {
      tabs.push({
        key: node.id,
        label: node.data.label,
        children: (
          <List
            className="flex-1 overflow-auto"
            dataSource={projectChats[selectedProject][node.id] || []}
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
        )
      });
    });

    return tabs;
  };

  const handleNodeClick = (_, node) => {
    setSelectedNode(node.id);
  };

  const handleTabChange = (key) => {
    setSelectedNode(key);
  };

  const getNodeStyle = (node) => {
    return {
      ...node.style,
      backgroundColor: node.id === selectedNode ? '#e6f7ff' : '#fff',
      border: node.id === selectedNode ? '2px solid #1890ff' : '1px solid #ccc'
    };
  };

  const nodesWithStyles = projectNodes[selectedProject].map(node => ({
    ...node,
    style: getNodeStyle(node)
  }));

  return (
    <Layout className="min-h-screen bg-transparent">
      <Sider width={300} className="bg-white p-4">
        <Title level={4}>项目广场</Title>
        <List
          dataSource={projects}
          renderItem={project => (
            <Card 
              className={`mb-4 cursor-pointer ${selectedProject === project.id ? 'border-blue-500' : ''}`}
              onClick={() => setSelectedProject(project.id)}
            >
              <Space direction="vertical" className="w-full">
                <Space className="w-full justify-between">
                  <Text strong>{project.name}</Text>
                  <Badge status="processing" text={project.status} />
                </Space>
                <Text type="secondary">{project.desc}</Text>
                <Space className="w-full justify-between">
                  <Space>
                    {project.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                  <Text type="secondary">{project.members}人参与</Text>
                </Space>
              </Space>
            </Card>
          )}
        />
      </Sider>
      
      <Content className="p-4">
        <Card 
          title={
            <Space>
              <Text strong>{projects.find(p => p.id === selectedProject)?.name}</Text>
              <Tag color="blue">{projects.find(p => p.id === selectedProject)?.status}</Tag>
            </Space>
          }
          className="h-full"
          bodyStyle={{ 
            height: 'calc(100vh - 150px)',
            padding: 0,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="p-4 overflow-auto">
            <Card size="small" className="mb-4">
              <Row gutter={16}>
                <Col span={8}>
                  <Space direction="vertical" className="w-full">
                    <Text strong>项目简介</Text>
                    <Paragraph>{projectAnalysis[selectedProject].intro.brief}</Paragraph>
                    <Space wrap>
                      {projectAnalysis[selectedProject].intro.techStack.map(tech => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" className="w-full">
                    <Text strong>实现阶段</Text>
                    <Tag color="blue" className="mb-2">{projectAnalysis[selectedProject].stage.current}</Tag>
                    {projectAnalysis[selectedProject].stage.milestones.map(milestone => (
                      <div key={milestone.name}>
                        <Space className="w-full justify-between">
                          <Text>{milestone.name}</Text>
                          <Badge 
                            status={milestone.status === 'in_progress' ? 'processing' : 'default'} 
                            text={`${milestone.progress}%`}
                          />
                        </Space>
                        <Progress percent={milestone.progress} size="small" />
                      </div>
                    ))}
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" className="w-full">
                    <Text strong>参与机会</Text>
                    <Tabs
                      size="small"
                      items={[
                        {
                          key: 'features',
                          label: '核心功能',
                          children: (
                            <List
                              size="small"
                              dataSource={projectAnalysis[selectedProject].opportunities.features}
                              renderItem={item => (
                                <List.Item>
                                  <Space direction="vertical" className="w-full">
                                    <Text strong>{item.title}</Text>
                                    <Text type="secondary">{item.detail}</Text>
                                    <div className="mt-1">
                                      {item.tasks.map(task => (
                                        <Tag key={task} className="mb-1">{task}</Tag>
                                      ))}
                                    </div>
                                  </Space>
                                </List.Item>
                              )}
                            />
                          )
                        },
                        {
                          key: 'improvements',
                          label: '优化提升',
                          children: (
                            <List
                              size="small"
                              dataSource={projectAnalysis[selectedProject].opportunities.improvements}
                              renderItem={item => (
                                <List.Item>
                                  <Space direction="vertical" className="w-full">
                                    <Text strong>{item.title}</Text>
                                    <Text type="secondary">{item.detail}</Text>
                                    <div className="mt-1">
                                      {item.tasks.map(task => (
                                        <Tag key={task} className="mb-1">{task}</Tag>
                                      ))}
                                    </div>
                                  </Space>
                                </List.Item>
                              )}
                            />
                          )
                        },
                        {
                          key: 'explorations',
                          label: '探索方向',
                          children: (
                            <List
                              size="small"
                              dataSource={projectAnalysis[selectedProject].opportunities.explorations}
                              renderItem={item => (
                                <List.Item>
                                  <Space direction="vertical" className="w-full">
                                    <Text strong>{item.title}</Text>
                                    <Text type="secondary">{item.detail}</Text>
                                    <div className="mt-1">
                                      {item.tasks.map(task => (
                                        <Tag key={task} className="mb-1">{task}</Tag>
                                      ))}
                                    </div>
                                  </Space>
                                </List.Item>
                              )}
                            />
                          )
                        }
                      ]}
                    />
                  </Space>
                </Col>
              </Row>
            </Card>

            <div style={{ height: 300 }} className="mb-4">
              <ReactFlow
                nodes={nodesWithStyles}
                edges={projectEdges[selectedProject]}
                onNodeClick={handleNodeClick}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>

            <Tabs
              className="flex-1"
              activeKey={selectedNode}
              onChange={handleTabChange}
              items={getTabs()}
            />

            <div className="mt-4 px-4">
              <TextArea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入消息..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                className="mb-2"
              />
              <div className="text-right">
                <Text type="secondary" className="mr-4 text-sm">
                  Shift + Enter 换行，Enter 发送
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
} 