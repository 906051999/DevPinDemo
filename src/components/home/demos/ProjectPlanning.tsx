'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Space, Tree, Input, Badge, Tooltip } from 'antd';
import { RobotOutlined, UserOutlined, LikeOutlined, BulbOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text, Title } = Typography;
const { TextArea } = Input;

export default function ProjectPlanning() {
  const [discussions] = useState([
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "欢迎来到DevPin项目空间！让我们开始细化项目规划。@AI助手 帮我们梳理下核心功能？",
      time: '10分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>基于前期讨论，我整理了MVP阶段的核心功能：</Text>
          <Card size="small">
            <Tree
              treeData={[
                {
                  title: 'MVP核心功能',
                  key: '0',
                  children: [
                    {
                      title: '创意收集',
                      key: '1',
                      children: [
                        { title: '对话式输入界面', key: '1-1' },
                        { title: 'AI实时分析', key: '1-2' },
                        { title: '基础版本控制', key: '1-3' },
                      ],
                    },
                    {
                      title: '协作系统',
                      key: '2',
                      children: [
                        { title: '实时编辑（CRDT）', key: '2-1' },
                        { title: '变更历史', key: '2-2' },
                      ],
                    },
                    {
                      title: '反馈系统',
                      key: '3',
                      children: [
                        { title: '评论功能', key: '3-1' },
                        { title: '简单投票', key: '3-2' },
                      ],
                    },
                  ],
                },
              ]}
            />
          </Card>
        </Space>
      ),
      time: '9分钟前'
    },
    {
      author: 'junior_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ffa940' }} />,
      content: "我是新手，想问问CRDT是什么？看起来很重要的样子",
      time: '8分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>让我用简单的比喻解释CRDT：</Text>
          <Card size="small">
            <Text>想象一个共享的画布，多个人可以同时在上面画画。CRDT就像是一个神奇的画布，不管大家以什么顺序画，最终都能自动把所有人的创作完美融合在一起，不会互相覆盖或冲突。</Text>
          </Card>
          <Text>在DevPin中，这项技术能让多人同时编辑创意而不会互相干扰。</Text>
        </Space>
      ),
      time: '7分钟前'
    },
    {
      author: 'rust_lover',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fa541c' }} />,
      content: "补充一下，我们可以用automerge-rs实现CRDT，性能会比较好。@junior_dev 如果你感兴趣，我可以指导你这部分的开发",
      time: '6分钟前'
    },
    {
      author: 'sarah_codes',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "协作界面这块，我建议先做最基础的文本编辑，等CRDT跑通了再加富文本功能",
      time: '6分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>好的建议，我把功能按照复杂度排序：</Text>
          <Card size="small">
            <ul>
              <li>🎯 最小可用版本：
                <ul>
                  <li>纯文本协作编辑</li>
                  <li>基础CRDT同步</li>
                  <li>简单的版本历史</li>
                </ul>
              </li>
              <li>✨ 后续增强：
                <ul>
                  <li>富文本支持</li>
                  <li>高级冲突处理</li>
                  <li>完整历史回溯</li>
                </ul>
              </li>
            </ul>
            <Text type="secondary">建议先实现最小可用版本验证核心功能</Text>
          </Card>
        </Space>
      ),
      time: '5分钟前'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "这样拆分很清晰，我先去看看AI集成这块。有兴趣的小伙伴可以一起来探讨~",
      time: '4分钟前'
    },
    {
      author: 'creative_mind',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
      content: (
        <Space direction="vertical">
          <Text>刚在 Product Hunt 上看到一个类似的协作工具，他们的亮点是用 AI 自动生成项目结构图，感觉我们也可以加入这个功能！</Text>
          <img src="/demo/product-hunt-example.jpg" alt="Product Hunt Example" className="rounded-lg max-w-[300px]" />
        </Space>
      ),
      time: '3分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>这是个不错的想法！可以加入到功能备案：</Text>
          <Card size="small">
            <Tree
              treeData={[
                {
                  title: 'AI增强功能',
                  key: 'ai-1',
                  children: [
                    { title: '自动生成项目结构图', key: 'ai-1-1' },
                    { title: '智能依赖分析', key: 'ai-1-2' },
                    { title: '代码关系可视化', key: 'ai-1-3' },
                  ]
                }
              ]}
            />
          </Card>
        </Space>
      ),
      time: '3分钟前'
    },
    {
      author: 'backend_guru',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "看了下CRDT的讨论，推荐用Yjs，我之前用过，性能不错而且社区活跃。这里有个demo可以参考：[链接]",
      time: '2分钟前'
    },
    {
      author: 'ux_designer',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "建议在协作编辑时加入用户光标位置显示，类似Figma那样。对实时协作体验很重要！",
      time: '2分钟前'
    },
    {
      author: 'student_tim',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#faad14' }} />,
      content: "作为学生，我在想能不能加入一个功能：当我们讨论项目时，AI能自动生成思维导图，这样更容易理解整体架构...",
      time: '5分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>这是个很棒的想法！让我帮你完善一下这个功能：</Text>
          <Card size="small">
            <Tree
              treeData={[
                {
                  title: '智能可视化功能',
                  key: 'viz-1',
                  children: [
                    { title: '实时思维导图生成', key: 'viz-1-1' },
                    { title: '项目依赖关系图', key: 'viz-1-2' },
                    { title: '进度时间线展示', key: 'viz-1-3' },
                  ]
                }
              ]}
            />
          </Card>
          <Text>@senior_dev 你觉得可以用D3.js实现这个功能吗？</Text>
        </Space>
      ),
      time: '4分钟前'
    },
    {
      author: 'senior_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#531dab' }} />,
      content: "@student_tim 很有创意！我建议用Mermaid.js，比D3更轻量，特别适合生成这类图表。我可以帮你开始这部分工作",
      time: '3分钟前'
    },
    {
      author: 'ux_designer',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "说到可视化，我觉得可以加入动画效果，展示想法是如何演进的。这样对新加入的人更友好",
      time: '3分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>结合大家的想法，我们可以这样设计：</Text>
          <Card size="small">
            <ul>
              <li>✨ 基础版：
                <ul>
                  <li>使用Mermaid.js生成静态图表</li>
                  <li>支持基本的思维导图布局</li>
                </ul>
              </li>
              <li>🚀 进阶版：
                <ul>
                  <li>添加动画过渡效果</li>
                  <li>支持交互式编辑</li>
                  <li>历史版本切换动画</li>
                </ul>
              </li>
            </ul>
          </Card>
          <Text>@student_tim 你可以先从基础版开始尝试，有问题随时问我们</Text>
        </Space>
      ),
      time: '2分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>我来更新下MVP功能列表：</Text>
          <Card size="small">
            <Tree
              treeData={[
                {
                  title: 'MVP功能更新',
                  key: 'mvp-update',
                  children: [
                    {
                      title: '智能可视化（新增）',
                      key: 'mvp-viz',
                      children: [
                        { title: '基础思维导图', key: 'mvp-viz-1' },
                        { title: '简单动画效果', key: 'mvp-viz-2' },
                      ]
                    }
                  ]
                }
              ]}
            />
          </Card>
          <Text>同时我建议创建一个专门的学习资源清单，帮助新手快速上手相关技术</Text>
        </Space>
      ),
      time: '刚刚'
    },


    {
      author: 'product_owner',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#237804' }} />,
      content: "这个可视化真不错，确实能帮助理解项目结构。要不要考虑加入实时协作编辑图表的功能？",
      time: '1分钟前'
    },
    {
      author: 'webdev_jane',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
      content: "说到实时协作，SSE和WebSocket哪个更合适？考虑到创意收集可能不需要特别高的实时性",
      time: '刚刚'
    }
  ]);

  const projectTree = [
    {
      title: (
        <Space>
          <Text>DevPin核心功能</Text>
        </Space>
      ),
      key: '0',
      children: [
        {
          title: (
            <Space>
              <Badge status="processing" text="创意收集" />
              <Tooltip title="2人参与开发中">
                <SyncOutlined spin style={{ color: '#1890ff' }} />
              </Tooltip>
            </Space>
          ),
          key: '1',
          children: [
            { 
              title: <Badge status="success" text="对话式输入界面" />,
              key: '1-1'
            },
            { 
              title: <Badge status="processing" text="AI实时分析" />,
              key: '1-2'
            },
            { 
              title: <Badge status="default" text="基础版本控制" />,
              key: '1-3'
            },
          ],
        },
        {
          title: (
            <Space>
              <Badge status="default" text="协作系统" />
              <Tooltip title="等待开发">
                <ClockCircleOutlined style={{ color: '#d9d9d9' }} />
              </Tooltip>
            </Space>
          ),
          key: '2',
          children: [
            { 
              title: <Badge status="default" text="实时编辑（CRDT）" />,
              key: '2-1'
            },
            { 
              title: <Badge status="default" text="变更历史" />,
              key: '2-2'
            },
          ],
        },
      ],
    },
  ];

  const todoList = [
    {
      title: '实现基础的文本编辑器',
      votes: 5,
      status: 'in_progress',
      description: '基于 ProseMirror 实现纯文本编辑器，支持基础快捷键和协同编辑',
      aiExplanation: `这个任务包括：
- 集成 ProseMirror 编辑器框架
- 实现基础文本操作（加粗、列表等）
- 添加协同编辑支持
- 处理光标同步
推荐参考 ProseMirror 官方文档和 Yjs 集成指南`
    },
    {
      title: '集成 OpenAI API',
      votes: 3,
      status: 'todo',
      description: '实现AI实时分析和建议生成功能',
      aiExplanation: `需要实现的核心功能：
- OpenAI API 封装和错误处理
- 流式响应处理
- 上下文管理
- 提示词优化
可以参考 OpenAI 官方的 Node.js SDK`
    },
    {
      title: '设计协作界面原型',
      votes: 2,
      status: 'in_progress',
      description: '设计多人实时协作的界面交互',
      aiExplanation: `关键设计点：
- 用户光标和选区显示
- 协作状态指示
- 冲突提示UI
- 历史记录时间轴
建议参考 Figma 的协作交互设计`
    }
  ];

  const ideaList = [
    {
      title: '添加AI自动生成项目结构图功能',
      author: 'creative_mind',
      votes: 8,
      reason: '通过AI分析项目描述，自动生成项目结构图，可以大大提高项目初期的规划效率',
      aiAnalysis: `这个想法的价值点：
1. 加速项目启动阶段
2. 统一团队理解
3. 减少初期沟通成本

技术可行性：
- 可以使用 GPT-4 处理自然语言
- Mermaid.js 生成图表
- 支持人工微调

建议先做MVP验证效果`
    },
    {
      title: '支持Figma设计稿导入',
      author: 'ux_designer',
      votes: 6,
      reason: '很多团队已经在用Figma做设计，如果能直接导入设计稿并转换为可编辑内容，会大大提高效率',
      aiAnalysis: `集成价值分析：
1. 无缝设计流程
2. 提高还原效率
3. 设计协作打通

技术挑战：
- Figma API 调用
- 设计稿解析
- 样式转换处理
- 实时同步策略

建议先支持基础组件导入`
    },
    {
      title: '添加项目模板系统',
      author: 'student_tim',
      votes: 4,
      reason: '作为学生经常需要做课程项目，如果有现成的模板可以直接开始会很方便',
      aiAnalysis: `用户需求分析：
1. 快速项目启动
2. 标准化项目结构
3. 学习最佳实践

实现建议：
- 支持自定义模板
- 分类管理（课程、毕设等）
- 模板评分系统
- 社区分享机制

可以先添加几个基础模板验证需求`
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={16}>
        <Card title="项目规划">
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
            <TextArea rows={3} placeholder="输入你的想法..." />
            <Button type="primary" className="mt-2">发送</Button>
          </div>
        </Card>
      </Col>
      
      <Col xs={24} lg={8}>
        <Space direction="vertical" className="w-full">
          <Card title="项目进度" size="small">
            <Tree
              treeData={projectTree}
              defaultExpandAll
            />
          </Card>

          <Card 
            title={
              <Space>
                <CheckCircleOutlined />
                <span>待办事项</span>
              </Space>
            } 
            size="small"
          >
            <List
              size="small"
              dataSource={todoList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Space key="votes">
                      <LikeOutlined />
                      <span>{item.votes}</span>
                    </Space>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Badge 
                        status={item.status === 'in_progress' ? 'processing' : 'default'} 
                        text={item.title}
                      />
                    }
                    description={
                      <Space direction="vertical" className="mt-2">
                        <Text>{item.description}</Text>
                        <Card size="small">
                          <Text type="secondary">AI助手解释：</Text>
                          <pre className="text-sm mt-1 whitespace-pre-wrap">{item.aiExplanation}</pre>
                        </Card>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card 
            title={
              <Space>
                <BulbOutlined />
                <span>创意投票</span>
              </Space>
            } 
            size="small"
          >
            <List
              size="small"
              dataSource={ideaList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button size="small" icon={<LikeOutlined />} key="votes">
                      {item.votes}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <Space direction="vertical" className="mt-2">
                        <Text type="secondary">提议者: {item.author}</Text>
                        <Text>理由: {item.reason}</Text>
                        <Card size="small">
                          <Text type="secondary">AI分析：</Text>
                          <pre className="text-sm mt-1 whitespace-pre-wrap">{item.aiAnalysis}</pre>
                        </Card>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Space>
      </Col>
    </Row>
  );
} 