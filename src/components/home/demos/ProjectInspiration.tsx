'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Input, Space, Timeline, Image, Statistic, Progress } from 'antd';
import { BulbOutlined, RobotOutlined, UserOutlined, SearchOutlined, StarOutlined, ShareAltOutlined, CheckOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons';
import { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from '@/app/providers';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ProjectInspiration() {
  const [currentIdea, setCurrentIdea] = useState('');
  const { isDark } = useTheme();

  const chatHistory = [
    {
      type: 'user',
      content: '最近在刷视频的时候经常冒出一些想法，但是每次都是看完就忘，感觉错过了很多灵感。用备忘录记又显得太正式了，而且想法也不够成熟...'
    },
    {
      type: 'ai',
      content: '这个很有意思。能具体说说是什么样的场景吗？比如最近一次产生想法是在什么情况下？'
    },
    {
      type: 'user',
      content: '对，比如昨天和朋友聊天，聊着聊着突然想到一个点子。但是又不好意思打断话题专门去记录，结果后来就忘了。\n\n感觉生活中经常有这种情况，灵感总是在闲聊中产生，也在闲聊中消失...'
    },
    {
      type: 'ai',
      content: '我明白了。让我分析一下市面上现有的一些解决方案：\n\n1. **备忘录类**\n- Apple Notes, Evernote\n- 优点：随时记录\n- 缺点：太正式，不够灵活\n\n2. **社交平台**\n- Twitter, 即刻\n- 优点：轻松分享\n- 缺点：缺乏深度互动\n\n3. **项目平台**\n- GitHub Discussions, ProductHunt\n- 优点：专业社区\n- 缺点：门槛高，更适合成熟项目\n\n看起来确实缺少一个"轻量级创意收集+孵化"的平台。你觉得呢？'
    },
    {
      type: 'user',
      content: '对！而且我发现和别人分享想法的时候总是很难获得认真的反馈。因为想法还不够完整，表达起来比较碎片化，别人可能觉得是在说空话...'
    },
    {
      type: 'ai',
      content: '这是个很好的观察。让我们深入分析一下这个问题：\n\n**现有痛点：**\n1. 灵感捕捉困难\n2. 表达不够完整\n3. 难获得有效反馈\n\n**根本原因：**\n- 缺乏从"碎片想法"到"完整创意"的转化过程\n- 没有合适的平台承载早期创意\n\n你觉得如果有一个平台，通过对话的方式帮你完善想法，会有帮助吗？就像我们现在这样。'
    },
    {
      type: 'user',
      content: '这个想法很棒！关键是要让记录变得特别轻松，像跟朋友聊天一样。而且最好能有AI像你这样，帮我把想法梳理得更清晰。'
    },
    {
      type: 'ai',
      content: '让我们具体设想一下这个产品：\n\n**核心功能设计：**\n1. 轻松记录\n- 语音转文字\n- 截图+注释\n- 对话式记录\n\n2. AI辅助分析\n- 自动提取关键点\n- 引导式问答\n- 市场机会分析\n\n3. 创意展示\n- 自动生成创意卡片\n- 可视化呈现\n- 多媒体展示\n\n这些功能听起来如何？需要补充或调整吗？'
    },
    {
      type: 'user',
      content: '完全说到点子上了！特别是自动提取关键点这个，因为有时候自己也说不清楚想法的重点在哪。不过除了记录和展示，最后还是希望能找到志同道合的人一起做...'
    },
    {
      type: 'ai',
      content: '明白了，让我们再加入协作维度：\n\n**创意发展路径：**\n1. 💡 **创意收集**\n- 对话式记录\n- AI辅助提炼\n\n2. 🔄 **创意完善**\n- 引导式深化\n- 自动化整理\n\n3. 🎯 **创意对接**\n- 基于技能匹配\n- 兴趣标签筛选\n- 贡献度跟踪\n\n这样就形成了一个完整的"创意-协作"生态。我们可以把这个产品命名为"DevPin - 让创意自然生长的对话平台"，你觉得怎么样？'
    },
    {
      type: 'user',
      content: '这个名字很贴切！感觉这就是我想要的。但是你觉得这个想法有市场吗？会不会太小众了？'
    },
    {
      type: 'ai',
      content: '让我分析一下市场潜力：\n\n**目标用户群：**\n1. 开发者/创作者\n- 经常有项目想法\n- 需要技术合作\n- 规模: 庞大且持续增长\n\n**市场机会：**\n1. 现有平台的不足\n- GitHub: 过于正式\n- 社交平台: 过于碎片\n- 项目管理工具: 过于重量级\n\n2. 差异化优势\n- 对话式体验\n- AI辅助优化\n- 精准协作匹配\n\n**发展潜力：**\n- 可扩展到其他创意领域\n- AI技术持续进化\n- 社区网络效应\n\n从数据来看，这是个小众但精准的市场，而且有很强的用户粘性和扩展性。你觉得这个分析合理吗？'
    },
    {
      type: 'user',
      content: '分析得很到位！确实，虽然是小众市场，但痛点很明确。而且开发者群体的特点是愿意尝试新工具，如果真的解决了问题，应该会有不错的口碑传播。'
    },
    {
      type: 'ai',
      content: '完全同意！那让我总结一下这个产品的核心价值：\n\n**DevPin - 让创意自然生长的对话平台**\n\n1. **核心理念**\n- 像聊天一样记录灵感\n- 让每个想法都被认真对待\n- 通过对话激发更多可能\n\n2. **独特价值**\n- 对话式创意收集，无需刻意整理\n- AI辅助思考分析，完善创意细节\n- 精准的协作者匹配，基于技能和兴趣\n\n3. **愿景**\n- 成为开发者的创意孵化器\n- 连接想法与实现的桥梁\n- 让每个好点子都有落地的机会\n\n要不要把这个想法先发到公共聊天群里，看看大家的反应？'
    }
  ];

  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card title="创意讨论空间" className="mb-4">
            <div className="flex flex-col gap-4">
              {chatHistory.map((chat, index) => (
                <div key={index} 
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] items-start ${chat.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar 
                      icon={chat.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                      style={chat.type === 'ai' ? { backgroundColor: '#87d068' } : {}}
                      className="flex-shrink-0"
                    />
                    <div 
                      className={`rounded-lg p-3 ${
                        chat.type === 'user' 
                          ? isDark ? 'bg-blue-900 text-white' : 'bg-blue-500 text-white' 
                          : isDark ? 'bg-gray-500 text-white' : 'bg-gray-100'
                      }`}
                    >
                      <div className={chat.type === 'user' ? 'text-white' : ''}>
                        <MarkdownPreview 
                          source={chat.content}
                          style={{ 
                            background: 'transparent',
                            color: chat.type === 'user' ? 'white' : (isDark ? 'white' : 'inherit'),
                          }}
                          className="markdown-preview"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="项目亮点" className="mb-4">
            <Space direction="vertical" className="w-full">
              <div className="mb-4">
                <Title level={5}>💡 核心理念</Title>
                <List
                  size="small"
                  dataSource={[
                    '像聊天一样轻松记录创意',
                    '让每个想法都被认真对待',
                    '通过对话激发更多可能',
                    '让创意更容易被理解和传播'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
              </div>

              <div className="mb-4">
                <Title level={5}>🔥 独特价值</Title>
                <List
                  size="small"
                  dataSource={[
                    {
                      title: '对话式创意收集',
                      desc: '像跟朋友聊天一样记录灵感，无需刻意整理'
                    },
                    {
                      title: 'AI创意助手',
                      desc: '通过提问引导你深入思考，完善创意细节'
                    },
                    {
                      title: '即时反馈',
                      desc: '实时获得建议和启发，让想法不断进化'
                    },
                    {
                      title: '创意展示',
                      desc: '自动整理对话精华，让他人快速理解你的想法'
                    }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Space direction="vertical" size={0}>
                        <Text strong>{item.title}</Text>
                        <Text type="secondary">{item.desc}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>

              <div>
                <Title level={5}>✨ 与众不同</Title>
                <List
                  size="small"
                  dataSource={[
                    '不是冰冷的表单，而是有温度的对话',
                    '不是被动记录，而是主动引导思考',
                    '不是孤单思考，而是有AI陪你头脑风暴',
                    '不是生硬展示，而是用对话讲述创意故事'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Tag color="blue">{item}</Tag>
                    </List.Item>
                  )}
                />
              </div>
            </Space>
          </Card>
          <Card title="🎯 创意演进过程" className="w-full">
        <Timeline mode="alternate">
          <Timeline.Item 
            dot={<BulbOutlined style={{ fontSize: '16px' }} />}
            color="blue"
          >
            <Card size="small" className="mb-2">
              <Space direction="vertical">
                <Text strong>💭 灵感捕捉</Text>
                <div className="flex gap-2 mt-2">
      
                  <Card size="small">
                    "最近经常有一些想法，但是记录在笔记里后就忘记了，感觉挺可惜的"
                  </Card>
                </div>
              </Space>
            </Card>
          </Timeline.Item>

          <Timeline.Item 
            dot={<RobotOutlined style={{ fontSize: '16px' }} />}
            color="green"
          >
            <Card size="small" className="mb-2">
              <Space direction="vertical">
                <Text strong>🤖 需求分析</Text>
                <div className="flex gap-2 mt-2">
                  <Card size="small">
                    <Space direction="vertical">
                      <Text>已识别的核心需求：</Text>
                      <List
                        size="small"
                        dataSource={[
                          '轻松记录创意的方式',
                          '防止想法被遗忘',
                          '获得反馈和建议',
                          '帮助完善创意'
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <CheckOutlined className="mr-2 text-green-500" />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Card>
                </div>
              </Space>
            </Card>
          </Timeline.Item>

          <Timeline.Item 
            dot={<StarOutlined style={{ fontSize: '16px' }} />}
            color="orange"
          >
            <Card size="small" className="mb-2">
              <Space direction="vertical">
                <Text strong>✨ 解决方案</Text>
                <Row gutter={[8, 8]} className="mt-2">
                  <Col span={24}>
                    <Card size="small">
                      <Space direction="vertical">
                        <Text strong>DevPin - 让创意浮现的对话平台</Text>
                        <List
                          size="small"
                          dataSource={[
                            '对话式创意收集',
                            'AI辅助思考分析',
                            '自动提取创意精华',
                            '创意展示和分享'
                          ]}
                          renderItem={item => (
                            <List.Item>
                              <Text>{item}</Text>
                            </List.Item>
                          )}
                        />
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Timeline.Item>

          <Timeline.Item 
            dot={<ShareAltOutlined style={{ fontSize: '16px' }} />}
            color="purple"
          >
            <Card size="small">
              <Space direction="vertical">
                <Text strong>🚀 成果展示</Text>
                <div className="mt-2">
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Statistic 
                        title="创意完整度" 
                        value={90} 
                        suffix="%" 
                        prefix={<CheckCircleOutlined />}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic 
                        title="可执行度" 
                        value={85} 
                        suffix="%" 
                        prefix={<RocketOutlined />}
                      />
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Button type="primary" icon={<ShareAltOutlined />} block>
                      分享创意
                    </Button>
                  </div>
                </div>
              </Space>
            </Card>
          </Timeline.Item>
        </Timeline>
      </Card>
        </Col>
      </Row>


    </Space>
  );
} 