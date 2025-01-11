'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Input, Space, Divider } from 'antd';
import { RobotOutlined, UserOutlined, BulbOutlined, FileTextOutlined, ApiOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ProjectDiscussion() {
  const projectInfo = {
    name: 'DevPin',
    slogan: '让创意自然生长的对话平台',
    description: '通过AI辅助的对话式交互，帮助开发者更好地收集、整理和发展创意，并找到志同道合的合作伙伴。',
    features: [
      {
        title: '对话式创意收集',
        desc: '通过自然对话记录和发展想法，支持多种输入方式'
      },
      {
        title: 'AI辅助分析',
        desc: '实时分析对话内容，提取关键信息，引导深入思考'
      },
      {
        title: '创意版本管理',
        desc: '记录想法的演进过程，支持分支探索和合并'
      },
      {
        title: '协作者匹配',
        desc: '基于项目需求和个人特长，推荐潜在的合作伙伴'
      }
    ],
    status: {
      stage: '概念验证',
      progress: '讨论中',
      nextSteps: ['原型设计', '技术选型', '基础架构']
    }
  };

  const [discussions] = useState([
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "分享一个正在构思的项目 - DevPin。核心是解决创意收集和协作的问题，感觉现有工具都不太对味...",
      time: '10分钟前'
    },
    {
      author: 'sarah_codes',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "有意思。不过市面上不是已经有很多笔记和项目管理工具了吗？比如 Notion + GitHub",
      time: '9分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>让我解释下提到的工具：</Text>
          <Card size="small">
            <ul>
              <li>Notion：多功能协作平台，集成文档、任务和知识库</li>
              <li>GitHub：代码托管平台，主要用于软件开发协作</li>
            </ul>
          </Card>
          <Text>这个问题很好！DevPin和传统工具的主要区别在于，它更关注想法的「萌芽期」。@dev_alex 要不要分享下你遇到的具体痛点？</Text>
        </Space>
      ),
      time: '8分钟前'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "对，比如我经常在看技术分享时冒出一些想法，但Notion太重了，GitHub又太正式。而且这些想法往往需要和别人讨论才能发展起来",
      time: '7分钟前'
    },
    {
      author: 'tech_nova',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "所以本质是想做一个面向开发者的brainstorming工具？那AI在其中扮演什么角色？",
      time: '6分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>先解释下专业术语：</Text>
          <Card size="small">
            <ul>
              <li>brainstorming：头脑风暴，团队创意产生的方法</li>
              <li>AI (Artificial Intelligence)：人工智能，模拟人类思维的技术</li>
            </ul>
          </Card>
          <Text>从目前的讨论来看，AI主要有这几个作用：</Text>
          <Card size="small">
            <ul>
              <li>实时分析对话内容，提取关键信息</li>
              <li>基于上下文提供相关的技术建议</li>
              <li>帮助梳理想法的可行性和潜在问题</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '5分钟前'
    },
    {
      author: 'byte_wanderer',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />,
      content: "有没有考虑过版本控制的问题？创意讨论经常会有不同的分支，后期整理起来很麻烦",
      time: '4分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>解释一下版本控制相关概念：</Text>
          <Card size="small">
            <ul>
              <li>版本控制：追踪和管理内容变更的系统</li>
              <li>分支：从主要开发线分离出的独立版本</li>
              <li>Git：最流行的版本控制系统</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '4分钟前'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "这个想法很棒！确实需要类似git的版本管理，但UI要对非技术人员友好。比如可视化展示想法的演进树",
      time: '3分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>补充一些术语解释：</Text>
          <Card size="small">
            <ul>
              <li>UI (User Interface)：用户界面，用户与软件交互的界面</li>
              <li>可视化：将数据或概念以图形方式展示</li>
              <li>演进树：展示想法发展过程的树状图表</li>
            </ul>
          </Card>
          <Text>关于版本控制，我们可以借鉴Git的概念但简化交互：</Text>
          <Card size="small">
            <ul>
              <li>主线：核心想法的演进</li>
              <li>分支：不同方向的尝试</li>
              <li>合并：整合有价值的想法</li>
            </ul>
          </Card>
          <Text>这样既保留了灵活性，又不会让非技术用户感到困惑</Text>
        </Space>
      ),
      time: '2分钟前'
    },
    {
      author: 'sarah_codes',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "说到协作，如何处理不同背景的人之间的沟通障碍？比如开发和设计之间经常会有理解偏差",
      time: '1分钟前'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: "这是个很好的观察！DevPin可以尝试在对话中加入角色标签，AI根据不同角色自动调整表达方式。比如对开发者会用更技术化的语言，对设计师则更注重交互和视觉的描述",
      time: '刚刚'
    },
    {
      author: 'rust_lover',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fa541c' }} />,
      content: "对版本控制这块，我觉得可以用CRDT来实现多人实时协作，这样能保证数据一致性",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>补充解释一下：CRDT (Conflict-free Replicated Data Type) 是一种数据结构，能让多人同时编辑内容而不会冲突。类似于大家一起在线编辑文档的体验。</Text>
          <Text>@rust_lover 你是考虑用类似 Yjs 这样的框架吗？</Text>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'webdev_jane',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
      content: "说到实时协作，SSE和WebSocket哪个更合适？考虑到创意收集可能不需要特别高的实时性",
      time: '刚刚'
    },
    {
      author: 'rust_lover',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fa541c' }} />,
      content: "@AI助手 不太准确，Yjs主要是文档协作，我想的是更轻量的方案，比如automerge-rs，专注于数据结构的一致性",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>谢谢指正！让我解释下几个技术方案的区别：</Text>
          <Card size="small">
            <ul>
              <li>SSE：服务器主动推送，适合单向通知</li>
              <li>WebSocket：全双工通信，适合实时互动</li>
              <li>automerge-rs：Rust实现的CRDT库，更适合数据同步</li>
            </ul>
          </Card>
          <Text>@webdev_jane 考虑到需要即时反馈，WebSocket可能更合适。不过你提到的实时性要求确实是个好问题</Text>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'product_mind',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "这些技术细节有点跟不上...不过我关心的是数据安全，创意总是比较敏感的，特别是还在萌芽阶段",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: "这是个非常重要的问题！让我们用更通俗的方式来讨论数据安全。想象创意像是一个日记本，我们需要：1) 锁住日记本（加密）；2) 控制谁能看（访问控制）；3) 记录谁看过（审计日志）。大家觉得还有什么安全考虑吗？",
      time: '刚刚'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "可以借鉴Git的权限管理，比如private/internal/public，再加上细粒度的协作者权限。这样既保护创意，又不影响协作",
      time: '刚刚'
    },
    {
      author: 'cloud_expert',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#597ef7' }} />,
      content: "说到基础设施，建议考虑用k8s部署，可以更好地处理扩展性问题。毕竟AI服务可能会很吃资源",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>让我翻译下这个建议：k8s (Kubernetes) 是一个容器编排平台，简单说就是：</Text>
          <Card size="small">
            <ul>
              <li>可以根据使用量自动调整服务器资源</li>
              <li>服务出问题时自动恢复</li>
              <li>方便管理多个AI服务</li>
            </ul>
          </Card>
          <Text>不过在项目早期，可能先用serverless架构会更经济实惠，你们觉得呢？</Text>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'newbie_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ffd666' }} />,
      content: "作为新手，这些术语看得有点懵...能不能用更简单的方式解释下项目的核心架构？",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>当然！让我们把项目架构比作一个餐厅：</Text>
          <Card size="small">
            <ul>
              <li>前端界面 = 餐厅大堂（用户点餐和用餐的地方）</li>
              <li>后端服务 = 厨房（处理用户请求）</li>
              <li>AI服务 = 特级厨师（帮助分析和优化创意）</li>
              <li>数据库 = 食材仓库（存储所有信息）</li>
            </ul>
          </Card>
          <Text>这样解释是否更容易理解？</Text>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "我觉得可以用LangChain来做prompt管理，这样能更好地控制AI的输出质量",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>专业术语解释：</Text>
          <Card size="small">
            <ul>
              <li>LangChain：AI开发框架，用于构建AI应用</li>
              <li>Prompt：给AI的指令/提示词</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'ml_expert',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />,
      content: "@AI助手 解释不够准确。LangChain不只是管理prompt，它提供了完整的LLM应用开发链路，包括上下文管理、记忆机制等",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>感谢指正！让我重新解释一下：</Text>
          <Card size="small">
            <ul>
              <li>LangChain：大语言模型(LLM)应用开发框架，提供完整的开发工具链</li>
              <li>LLM：Large Language Model，大规模语言模型</li>
              <li>主要功能：prompt管理、上下文处理、记忆系统、外部工具集成等</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'frontend_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#13c2c2' }} />,
      content: "UI这块我建议用TailwindCSS + shadcn/ui，开发效率会更高。不过RSC可能会有一些坑要注意",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>让我解释下前端相关的术语：</Text>
          <Card size="small">
            <ul>
              <li>TailwindCSS：原子化CSS框架，通过组合类名来构建样式</li>
              <li>shadcn/ui：基于Radix UI的组件库，可定制性强</li>
              <li>RSC：React Server Components，React服务端组件</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'backend_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#389e0d' }} />,
      content: "后端考虑用tRPC+Prisma，类型安全很重要。要不要上GraphQL？",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>后端技术栈解释：</Text>
          <Card size="small">
            <ul>
              <li>tRPC：TypeScript的RPC框架，提供端到端类型安全</li>
              <li>Prisma：现代数据库ORM工具，简化数据库操作</li>
              <li>GraphQL：API查询语言，允许客户端精确指定所需数据</li>
              <li>类型安全：在编译时就能发现类型错误，减少运行时错误</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'db_expert',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#cf1322' }} />,
      content: "@AI助手 补充一下，Prisma不只是ORM，它还提供了数据库迁移、类型生成等功能，比传统ORM功能更丰富",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>感谢补充！完整的Prisma功能包括：</Text>
          <Card size="small">
            <ul>
              <li>ORM：对象关系映射，用代码操作数据库</li>
              <li>Migration：数据库结构版本控制</li>
              <li>Type Generation：自动生成TypeScript类型</li>
              <li>Studio：可视化数据库管理工具</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'newbie_dev',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ffd666' }} />,
      content: "这些工具看起来都很强大，但是学习曲线会不会太陡峭了？特别是对新手来说",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>这是个很好的问题！让我们评估下每个工具的学习曲线：</Text>
          <Card size="small">
            <ul>
              <li>TailwindCSS：入门快，主要是记忆类名</li>
              <li>tRPC：需要TypeScript基础，但文档友好</li>
              <li>Prisma：有很好的自动补全，适合新手</li>
              <li>建议：可以渐进式学习，先掌握基础功能</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "看大家讨论得很热烈，要不要把这个创意转为正式项目？这样我们就能在专属的项目空间里更系统地讨论了",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>平台会自动为正式项目创建：</Text>
          <Card size="small">
            <ul>
              <li>项目讨论区：深入的技术探讨</li>
              <li>创意版本管理：记录想法演进</li>
              <li>协作者角色管理：职责分工</li>
              <li>AI助手：持续提供建议</li>
            </ul>
          </Card>
        </Space>
      ),
      time: '刚刚'
    },
    {
      author: 'rust_lover',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fa541c' }} />,
      content: "我对CRDT那块的实现很感兴趣，点了关注，等项目空间建好我就来认领这部分工作",
      time: '刚刚'
    },
    {
      author: 'sarah_codes',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96' }} />,
      content: "前端这块我可以参与，对实时协作的UI/UX设计有一些想法。直接在项目空间里开个设计讨论帖？",
      time: '刚刚'
    },
    {
      author: 'dev_alex',
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "好，那我把创意转为正式项目了！大家可以在项目空间里创建具体的讨论主题，方便分类讨论。[DevPin项目空间已创建 →]",
      time: '刚刚'
    },
    {
      author: 'AI助手',
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Text>项目空间已自动创建以下讨论区：</Text>
          <Card size="small">
            <ul>
              <li>💡 创意演进：记录想法的发展过程</li>
              <li>🛠️ 技术方案：分模块讨论实现细节</li>
              <li>🎨 设计提案：UI/UX设计探讨</li>
              <li>📊 项目规划：进度和任务管理</li>
            </ul>
          </Card>
          <Text>欢迎感兴趣的开发者加入项目空间，在对应的讨论区深入交流！</Text>
        </Space>
      ),
      time: '刚刚'
    }
  ]);

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
            <Title level={4}>{projectInfo.name}</Title>
            <Tag color="blue">概念验证阶段</Tag>
            <Paragraph>{projectInfo.description}</Paragraph>
            <Divider />
            <Title level={5}>核心功能</Title>
            <List
              size="small"
              dataSource={projectInfo.features}
              renderItem={item => (
                <List.Item>
                  <Space direction="vertical" size={0}>
                    <Text strong>{item.title}</Text>
                    <Text type="secondary">{item.desc}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>下一步计划</Title>
            <List
              size="small"
              dataSource={projectInfo.status.nextSteps}
              renderItem={item => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
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