'use client';

import { useRouter } from 'next/navigation';
import { Layout, Button, Card, Typography, theme, Space, Tag, Timeline, Tabs, Avatar } from 'antd';
import { GithubOutlined, RobotOutlined, MobileOutlined, DesktopOutlined, SyncOutlined, NodeExpandOutlined, NodeCollapseOutlined, LinkOutlined, BranchesOutlined, PullRequestOutlined, IssuesCloseOutlined, CommentOutlined, CodeOutlined, FileTextOutlined, ProfileOutlined } from '@ant-design/icons';
import { ForkOutlined, MessageOutlined } from '@ant-design/icons';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from './providers';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// 定义元素类型和能力
const elementTypes = {
  code: {
    icon: <CodeOutlined />,
    abilities: {
      chat: ['代码评审', '实时讨论', '上下文追踪'],
      ai: ['代码生成', '重构建议', '性能优化'],
      view: ['依赖关系图', '变更可视化', '架构演进']
    }
  },
  doc: {
    icon: <FileTextOutlined />,
    abilities: {
      chat: ['多人协作', '版本追踪', '评论讨论'],
      ai: ['内容优化', '格式转换', '自动生成'],
      view: ['知识图谱', '文档结构图', '关联分析']
    }
  },
  requirement: {
    icon: <ProfileOutlined />,
    abilities: {
      chat: ['需求讨论', '场景分析', '优先级排序'],
      ai: ['需求分解', '技术方案', '工作量评估'],
      view: ['需求地图', '依赖关系', '进度追踪']
    }
  }
};

// 更新模块定义，强调能力而非固定功能
const modules = [
  {
    concept: '语',
    appName: 'DevPin Chat',
    color: 'blue',
    icon: <MessageOutlined className="text-4xl" />,
    description: '实时交流与协作，支持任意元素的多维度讨论',
    abilities: ['实时对话', '上下文关联', '多人协作', '版本追踪']
  },
  {
    concept: '生',
    appName: 'DevPin AI',
    color: 'green',
    icon: <RobotOutlined className="text-4xl" />,
    description: '智能分析与生成，为任意元素提供AI增强能力',
    abilities: ['智能分析', '内容生成', '优化建议', '自动化处理']
  },
  {
    concept: '象',
    appName: 'DevPin View',
    color: 'purple',
    icon: <ForkOutlined className="text-4xl" />,
    description: '可视化呈现与管理，连接所有元素的关系与演进',
    abilities: ['关系图谱', '时间轴', '看板视图', '进度追踪']
  }
];

export default function Home() {
  const router = useRouter();
  const { token } = theme.useToken();
  const { isDark, setIsDark } = useTheme();

  const DeviceSync = () => (
    <div className="flex flex-col items-center gap-8 p-4">
      {/* 桌面端展示 */}
      <div className={`
        w-full max-w-[320px] md:max-w-[500px]
        aspect-[16/9]
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        rounded-lg shadow-lg border
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
        relative
        overflow-hidden
      `}>
        {/* 窗口控制按钮 */}
        <div className={`
          h-6 
          ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
          rounded-t-lg 
          flex items-center px-3
        `}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* 应用内容网格 - 修复超出问题 */}
        <div className="grid grid-cols-2 gap-2 p-2 h-[calc(100%-1.5rem)]">
          {[
            { icon: <MessageOutlined />, color: 'blue', label: 'Chat' },
            { icon: <RobotOutlined />, color: 'green', label: 'AI' },
            { icon: <ForkOutlined />, color: 'purple', label: 'View' }
          ].map((app, index) => (
            <div
              key={index}
              className={`
                p-2
                rounded-lg
                ${isDark ? 'bg-gray-700' : `bg-${app.color}-50`}
                flex flex-col gap-1.5
              `}
            >
              <div className={`text-${app.color}-500 text-lg`}>{app.icon}</div>
              <div className={`h-1.5 rounded w-3/4 ${isDark ? 'bg-gray-600' : `bg-${app.color}-200`}`}></div>
              <div className={`h-1.5 rounded w-1/2 ${isDark ? 'bg-gray-600' : `bg-${app.color}-200`}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* 同步指示器 */}
      <div className="flex items-center gap-3">
        <SyncOutlined spin className="text-2xl text-blue-500" />
        <div className="text-sm text-gray-500">实时同步中...</div>
      </div>

      {/* 移动设备展示 - 简化设计 */}
      <div className="flex gap-4 justify-center flex-wrap">
        {[
          { icon: <MessageOutlined />, color: 'blue', label: 'Chat' },
          { icon: <RobotOutlined />, color: 'green', label: 'AI' },
          { icon: <ForkOutlined />, color: 'purple', label: 'View' }
        ].map((app, index) => (
          <div
            key={index}
            className={`
              w-[90px] h-[160px]
              ${isDark ? 'bg-gray-800' : 'bg-white'}
              rounded-lg shadow-lg border
              ${isDark ? 'border-gray-700' : 'border-gray-200'}
              flex flex-col
              overflow-hidden
            `}
          >
            {/* 状态栏 */}
            <div className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
            
            {/* 应用图标和名称 */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-3">
              <div className={`
                w-12 h-12
                rounded-lg
                ${isDark ? 'bg-gray-700' : `bg-${app.color}-50`}
                flex items-center justify-center
              `}>
                <div className={`text-${app.color}-500 text-xl`}>{app.icon}</div>
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                DevPin {app.label}
              </div>
            </div>
            
            {/* 底部导航栏 */}
            <div className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );

  const CollaborationSpace = () => {
    const [activeTab, setActiveTab] = useState('code');
    
    return (
      <div className={`
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        p-8 rounded-lg shadow-lg
      `}>
        <Title level={3} className="mb-6">智能协作空间</Title>
        <div className="grid grid-cols-2 gap-8">
          {/* 左侧协作区域 */}
          <div className="space-y-4">
            <Card 
              title="实时协作区"
              extra={
                <Space>
                  <Button icon={<CodeOutlined />} type={activeTab === 'code' ? 'primary' : 'text'} onClick={() => setActiveTab('code')} />
                  <Button icon={<FileTextOutlined />} type={activeTab === 'doc' ? 'primary' : 'text'} onClick={() => setActiveTab('doc')} />
                  <Button icon={<ProfileOutlined />} type={activeTab === 'requirement' ? 'primary' : 'text'} onClick={() => setActiveTab('requirement')} />
                </Space>
              }
            >
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div className={`
                    bg-gray-50 
                    ${isDark ? 'bg-gray-700' : 'bg-white'}
                    p-3 
                    rounded
                  `}>
                    <pre className="font-mono text-sm">
                      <code>{`function calculateMetrics(data) {
  // TODO: 优化性能
  return data.reduce((acc, val) => acc + val, 0);
}`}</code>
                    </pre>
                    <div className="mt-2 flex gap-2">
                      <Tag color="blue" icon={<MessageOutlined />}>3条讨论</Tag>
                      <Tag color="green" icon={<RobotOutlined />}>2条建议</Tag>
                    </div>
                  </div>
                  <div className={`
                    bg-blue-50 
                    ${isDark ? 'bg-gray-700' : 'bg-white'}
                    p-3 
                    rounded
                  `}>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar size="small">DX</Avatar>
                      <Text strong>David</Text>
                    </div>
                    <Text>建议使用 memoization 优化性能</Text>
                    <div className="mt-2">
                      <Button size="small" icon={<RobotOutlined />}>生成优化代码</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'doc' && (
                <div className="space-y-4">
                  <div className={`
                    bg-gray-50 
                    ${isDark ? 'bg-gray-700' : 'bg-white'}
                    p-3 
                    rounded
                  `}>
                    <Title level={5}>性能优化方案</Title>
                    <Text>1. 引入缓存机制</Text>
                    <Text>2. 实现数据预加载</Text>
                    <div className="mt-2 flex gap-2">
                      <Tag color="blue" icon={<MessageOutlined />}>正在编辑</Tag>
                      <Tag color="green" icon={<RobotOutlined />}>智能补充中</Tag>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirement' && (
                <div className="space-y-4">
                  <div className={`
                    bg-gray-50 
                    ${isDark ? 'bg-gray-700' : 'bg-white'}
                    p-3 
                    rounded
                  `}>
                    <Title level={5}>性能优化需求</Title>
                    <div className="pl-4 border-l-2 border-blue-500 space-y-2">
                      <Text>• 页面加载时间 小于 2s </Text>
                      <Text>• API响应时间 小于 200ms </Text>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Tag color="orange">优先级: P0</Tag>
                      <Tag color="green" icon={<RobotOutlined />}>AI评估中</Tag>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* 右侧上下文区域 */}
          <div className="space-y-4">
            <Card title="关联元素" size="small">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CodeOutlined />
                    <Text>性能优化代码</Text>
                  </div>
                  <Tag color="blue">当前焦点</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileTextOutlined />
                    <Text>优化方案文档</Text>
                  </div>
                  <Button size="small" type="link">切换</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ProfileOutlined />
                    <Text>性能优化需求</Text>
                  </div>
                  <Button size="small" type="link">切换</Button>
                </div>
              </div>
            </Card>

            <Card title="AI 助手" size="small">
              <div className="space-y-4">
                <div className={`
                  ${isDark ? 'bg-gray-700' : 'bg-white'}
                  p-3 
                  rounded
                `}>
                  <Text type="secondary">基于当前上下文的建议：</Text>
                  <ul className="list-disc pl-4 mt-2">
                    <li>添加性能测试用例</li>
                    <li>更新技术文档</li>
                    <li>同步团队成员</li>
                  </ul>
                </div>
                <Button icon={<RobotOutlined />} block>生成任务清单</Button>
              </div>
            </Card>

            <Card title="协作动态" size="small">
              <Timeline>
                <Timeline.Item dot={<CodeOutlined />}>
                  <Text style={{ color: token.colorText }}>
                    David 提交了代码优化
                  </Text>
                  <div className={`
                    text-xs 
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    2分钟前
                  </div>
                </Timeline.Item>
                <Timeline.Item dot={<FileTextOutlined />}>
                  <Text style={{ color: token.colorText }}>
                    Sarah 更新了文档
                  </Text>
                  <div className={`
                    text-xs 
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    5分钟前
                  </div>
                </Timeline.Item>
                <Timeline.Item dot={<ProfileOutlined />}>
                  <Text style={{ color: token.colorText }}>
                    PM 确认了需求优先级
                  </Text>
                  <div className={`
                    text-xs 
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    10分钟前
                  </div>
                </Timeline.Item>
              </Timeline>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const FeatureDemo = () => (
    <div className="space-y-8 md:space-y-20">
      <div className={`
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        p-4 md:p-8 
        rounded-lg 
        shadow-lg
      `}>
        <Title level={3} className="mb-4 md:mb-6">多维度协作视图</Title>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="技术视图" key="1">
                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <NodeExpandOutlined className="text-blue-500" />
                    <Text strong>项目概览</Text>
                  </div>
                  {/* 简化的思维导图示意 */}
                  <div className="pl-4 border-l-2 border-blue-500">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-green-500" />
                        <Text>后端架构</Text>
                        <Tag color="blue">进行中</Tag>
                      </div>
                      <div className="pl-4 border-l border-dashed border-green-500">
                        <Text className="block text-gray-500">• 数据库设计</Text>
                        <Text className="block text-gray-500">• API接口</Text>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-purple-500" />
                        <Text>前端开发</Text>
                        <Tag color="orange">规划中</Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="产品视图" key="2">
                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <NodeExpandOutlined className="text-orange-500" />
                    <Text strong>产品规划</Text>
                  </div>
                  <div className="pl-4 border-l-2 border-orange-500">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-yellow-500" />
                        <Text>用户需求</Text>
                        <Tag color="green">已确认</Tag>
                      </div>
                      <div className="pl-4 border-l border-dashed border-yellow-500">
                        <Text className="block text-gray-500">• 多端协同</Text>
                        <Text className="block text-gray-500">• 实时同步</Text>
                        <Text className="block text-gray-500">• AI辅助</Text>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-red-500" />
                        <Text>功能迭代</Text>
                        <Tag color="blue">进行中</Tag>
                      </div>
                      <div className="pl-4 border-l border-dashed border-red-500">
                        <Text className="block text-gray-500">• v1.0 基础协作</Text>
                        <Text className="block text-gray-500">• v1.1 AI增强</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="设计视图" key="3">
                <div className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <NodeExpandOutlined className="text-purple-500" />
                    <Text strong>设计系统</Text>
                  </div>
                  <div className="pl-4 border-l-2 border-purple-500">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-indigo-500" />
                        <Text>交互规范</Text>
                        <Tag color="purple">评审中</Tag>
                      </div>
                      <div className="pl-4 border-l border-dashed border-indigo-500">
                        <Text className="block text-gray-500">• 导航结构</Text>
                        <Text className="block text-gray-500">• 操作流程</Text>
                        <Text className="block text-gray-500">• 反馈机制</Text>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <NodeCollapseOutlined className="text-pink-500" />
                        <Text>视觉规范</Text>
                        <Tag color="cyan">已完成</Tag>
                      </div>
                      <div className="pl-4 border-l border-dashed border-pink-500">
                        <Text className="block text-gray-500">• 配色方案</Text>
                        <Text className="block text-gray-500">• 组件样式</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
          <div className="flex-1">
            <Card size="small" title="跨角色协作建议" className="mb-4">
              <Text type="secondary">当前上下文建议：</Text>
              <ul className="list-disc pl-4 mt-2">
                <li>与产品确认用户场景</li>
                <li>与设计讨论交互细节</li>
                <li>更新技术方案文档</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
      
      <CollaborationSpace />
      
      {/* Chat Integration Demo */}
      <div className={`
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        p-8 
        rounded-lg 
        shadow-lg
      `}>
        <Title level={3} className="mb-6">智能聊天室</Title>
        <div className="grid grid-cols-2 gap-8">
          <div className={`
            border 
            ${isDark ? 'border-gray-700' : 'border-gray-200'}
            rounded-lg 
            p-4
          `}>
            <div className="flex items-center justify-between mb-4">
              <Text strong>后端架构讨论</Text>
              <Tag icon={<LinkOutlined />} color="blue">已关联3个元素</Tag>
            </div>
            <div className="space-y-4">
              <div className={`
                bg-gray-50 
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <Text>我们需要考虑数据库的扩展性问题</Text>
                <div className="mt-2">
                  <Tag color="blue">引用: 数据库设计</Tag>
                </div>
              </div>
              <div className={`
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <div className="flex items-center gap-2 mb-2">
                  <RobotOutlined className="text-green-500" />
                  <Text strong>AI助手</Text>
                </div>
                <Text>建议采用分布式数据库架构，主要考虑以下几点：</Text>
                <ul className="list-disc pl-4 mt-2">
                  <li>水平扩展能力</li>
                  <li>读写分离</li>
                  <li>数据分片策略</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Card size="small" title="关联元素">
              <div className="space-y-2">
                <Tag icon={<NodeCollapseOutlined />}>数据库设计</Tag>
                <Tag icon={<NodeCollapseOutlined />}>API接口</Tag>
                <Tag icon={<NodeCollapseOutlined />}>性能指标</Tag>
              </div>
            </Card>
            <Card size="small" title="AI总结">
              <Text type="secondary">
                当前讨论主要围绕数据库架构选型，需要进一步明确：
                1. 具体的性能需求
                2. 数据一致性要求
                3. 成本预算
              </Text>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Enhancement Demo */}
      <div className={`
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        p-8 
        rounded-lg 
        shadow-lg
      `}>
        <Title level={3} className="mb-6">AI增强与优化</Title>
        <div className="grid grid-cols-2 gap-8">
          <Card title="内容优化">
            <div className="space-y-4">
              <div className={`
                bg-gray-50 
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <Text>原始讨论内容</Text>
                <div className="mt-2">
                  <Text type="secondary">后端要用分布式架构，需要考虑扩展性</Text>
                </div>
              </div>
              <Button icon={<RobotOutlined />} block>优化表达</Button>
              <div className={`
                bg-blue-50 
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <Text>优化后内容</Text>
                <div className="mt-2">
                  <Text>建议采用分布式微服务架构，重点关注：</Text>
                  <ul className="list-disc pl-4 mt-2">
                    <li>服务解耦与扩展</li>
                    <li>负载均衡策略</li>
                    <li>服务发现机制</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
          <Card title="智能分析">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <RobotOutlined className="text-green-500" />
                <Text strong>方案建议</Text>
              </div>
              <div className="space-y-2">
                <Tag color="green">可行性: 高</Tag>
                <Tag color="orange">复杂度: 中等</Tag>
                <Tag color="blue">投入: 中等</Tag>
              </div>
              <Text type="secondary">
                建议先完成核心服务的拆分，再逐步实现分布式架构转换，可分为以下阶段：
              </Text>
              <Timeline>
                <Timeline.Item>服务拆分与重构</Timeline.Item>
                <Timeline.Item>引入服务注册中心</Timeline.Item>
                <Timeline.Item>实现负载均衡</Timeline.Item>
                <Timeline.Item>监控体系搭建</Timeline.Item>
              </Timeline>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const GitHubIntegrationDemo = () => (
    <div className={`
      ${isDark ? 'bg-gray-800' : 'bg-white'}
      p-4 md:p-8 
      rounded-lg 
      shadow-lg
    `}>
      <Title level={3} className="mb-4 md:mb-6">GitHub 协同工作流</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-4">
          <Card title="代码仓库实时状态" extra={<GithubOutlined />}>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <BranchesOutlined /> 活跃分支
                </span>
                <Tag color="blue">feature/user-system</Tag>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <PullRequestOutlined /> 待处理PR
                </span>
                <Tag color="orange">3</Tag>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <IssuesCloseOutlined /> 待解决Issue
                </span>
                <Tag color="red">5</Tag>
              </div>
            </div>
          </Card>
          
          <Timeline>
            <Timeline.Item dot={<CommentOutlined />}>
              <Text strong>feat: 用户系统重构</Text>
              <div className="text-sm text-gray-500">
                <div>提交者: @dev1</div>
                <div>关联PR: #123</div>
              </div>
            </Timeline.Item>
            {/* ... 更多时间线项目 ... */}
          </Timeline>
        </div>

        <div className="space-y-4">
          <Card title="关联讨论" extra={<MessageOutlined />}>
            <div className="space-y-2">
              <div className={`
                bg-gray-50 
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <div className="flex items-center gap-2 mb-2">
                  <Tag color="blue">PR #123</Tag>
                  <Text strong>用户系统重构讨论</Text>
                </div>
                <div className="pl-4 border-l-2 border-blue-500">
                  <Text>建议拆分认证模块为独立服务</Text>
                  <div className="mt-2">
                    <Tag color="green">已采纳</Tag>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="AI 建议" extra={<RobotOutlined />}>
            <Text type="secondary">基于当前PR的改动建议：</Text>
            <ul className="list-disc pl-4 mt-2">
              <li>添加用户缓存机制</li>
              <li>补充认证失败处理</li>
              <li>增加性能测试用例</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );

  const ElementInteractionDemo = () => {
    const [activeElement, setActiveElement] = useState({
      type: 'code',
      content: '示例代码片段'
    });
    
    return (
      <div className={`
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        p-4 md:p-8 
        rounded-lg 
        shadow-lg
      `}>
        <Title level={3} className="mb-4 md:mb-6">元素能力交互</Title>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Chat Module */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <MessageOutlined className="text-blue-500" />
                <span>实时讨论</span>
              </div>
            }
            className="border-blue-200"
          >
            <div className="space-y-4">
              <div className={`
                bg-blue-50 
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <div className="flex items-center gap-2 mb-2">
                  {elementTypes[activeElement.type].icon}
                  <Text strong>当前元素讨论</Text>
                </div>
                <div className="pl-4 border-l-2 border-blue-500">
                  {elementTypes[activeElement.type].abilities.chat.map((ability, i) => (
                    <Tag key={i} color="blue">{ability}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* AI Module */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <RobotOutlined className="text-green-500" />
                <span>AI 分析</span>
              </div>
            }
            className="border-green-200"
          >
            <div className="space-y-4">
              <div className={`
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <div className="flex items-center gap-2 mb-2">
                  {elementTypes[activeElement.type].icon}
                  <Text strong>智能增强</Text>
                </div>
                <div className="pl-4 border-l-2 border-green-500">
                  {elementTypes[activeElement.type].abilities.ai.map((ability, i) => (
                    <Tag key={i} color="green">{ability}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* View Module */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <ForkOutlined className="text-purple-500" />
                <span>可视化</span>
              </div>
            }
            className="border-purple-200"
          >
            <div className="space-y-4">
              <div className={`
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-3 
                rounded
              `}>
                <div className="flex items-center gap-2 mb-2">
                  {elementTypes[activeElement.type].icon}
                  <Text strong>关系展示</Text>
                </div>
                <div className="pl-4 border-l-2 border-purple-500">
                  {elementTypes[activeElement.type].abilities.view.map((ability, i) => (
                    <Tag key={i} color="purple">{ability}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Element Selector */}
        <div className="mt-4 md:mt-8">
          <Space size="middle" wrap>
            {Object.entries(elementTypes).map(([type, config]) => (
              <Button
                key={type}
                icon={config.icon}
                onClick={() => setActiveElement({ type, content: `示例${type}内容` })}
                type={activeElement.type === type ? 'primary' : 'default'}
              >
                {type === 'code' ? '代码' : type === 'doc' ? '文档' : '需求'}
              </Button>
            ))}
          </Space>
        </div>
      </div>
    );
  };

  return (
    <Layout className="min-h-screen">
      {/* 顶部导航 */}
      <Header 
        className="flex justify-between items-center px-4 border-b"
        style={{ 
          background: token.colorBgContainer,
          borderColor: token.colorBorderSecondary,
          color: token.colorText
        }}
      >
        <div className="text-xl font-bold">DevPin</div>
        <div className="flex items-center gap-4">
          <Button
            type="text"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => setIsDark(!isDark)}
          />
          <a
            href="https://github.com/MindMorbius/DevPinDemo"
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
            <span>GitHub</span>
          </a>
        </div>
      </Header>

      {/* 主要内容 */}
      <Content className="max-w-7xl mx-auto w-full py-6 md:py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Title level={1} className="text-5xl mb-6">DevPin</Title>
          <Title level={3} className="text-5xl mb-6">一套理念 · 两端体验 · 三种能力</Title>
          <Title level={5} className="text-2xl mb-6">只有一个要求，好用到想哭</Title>
          <Button type="primary" size="large" onClick={() => router.push('/project')}>
              别走啊，体验一下模拟实况，真的好用到想哭
            </Button>
        </div>

        {/* Platform Introduction */}
        <div className="mb-20">
          <Card className={`
            ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50'
            }
          `}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Desktop Platform */}
              <div className={`
                p-6 
                ${isDark ? 'bg-gray-800' : 'bg-white'}
                rounded-xl 
                shadow-lg
              `}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg">
                    <DesktopOutlined className="text-2xl text-blue-500" />
                  </div>
                  <Title level={2} className="!mb-0">桌面端</Title>
                </div>
                <Text className="text-lg block mb-6">
                  统一的Web应用，模块化设计，组件自由组合
                </Text>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <Text>组件自由排列，按需显示</Text>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <Text>多任务并行处理</Text>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <Text>快捷键支持</Text>
                  </div>
                </div>
              </div>

              {/* Mobile Platform */}
              <div className={`
                p-6 
                ${isDark ? 'bg-gray-800' : 'bg-white'}
                rounded-xl 
                shadow-lg
              `}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg">
                    <MobileOutlined className="text-2xl text-purple-500" />
                  </div>
                  <Title level={2} className="!mb-0">移动端</Title>
                </div>
                <Text className="text-lg block mb-6">
                  三个独立APP，专注单一功能
                </Text>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <Text>利用系统后台切换</Text>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <Text>针对场景优化</Text>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <Text>数据实时同步</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Modules Section */}
        <Title level={2} className="text-center mb-12">三种核心能力</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className={`
                ${isDark ? 'bg-gray-800' : 'bg-white'}
                rounded-lg p-8 
                shadow-lg 
                border-t-4 
                border-${module.color}-500 
                hover:shadow-xl 
                transition-shadow
                ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
              `}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`text-${module.color}-500 mb-4`}>{module.icon}</div>
                <div>
                  <Text className={`text-${module.color}-500 text-3xl font-bold block mb-2`}>
                    {module.concept}
                  </Text>
                  <Title level={4} className="mb-4">{module.appName}</Title>
                </div>
                <Text className={`
                  text-gray-600 dark:text-gray-400
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {module.description}
                </Text>
              </div>
              
              <div className="space-y-4">
                <div className={`
                  ${isDark ? 'bg-gray-700' : `bg-${module.color}-50`} 
                  rounded-lg p-4
                `}>
                  <Text strong className="block mb-3">核心能力</Text>
                  <div className="flex flex-wrap gap-2">
                    {module.abilities.map((ability, i) => (
                      <Tag key={i} color={module.color}>{ability}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Demo */}
        <div className="mt-20">
          <Title level={2} className="text-center mb-12">功能演示</Title>
          <FeatureDemo />
        </div>

        {/* 添加元素交互演示 */}
        <div className="mt-20">
          <Title level={2} className="text-center mb-8">跨模块元素交互</Title>
          <ElementInteractionDemo />
        </div>
        
        {/* 新增 GitHub 集成展示 */}
        <div className="mt-20">
          <Title level={2} className="text-center mb-8">GitHub 深度集成</Title>
          <GitHubIntegrationDemo />
        </div>

        {/* Cross-device Demo */}
        <div className="mt-20">
          <Title level={2} className="text-center mb-8">跨设备协同演示</Title>
          <Card className="overflow-hidden">
            <DeviceSync />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Title level={4}>实时数据同步</Title>
                <Text type="secondary">所有设备之间无缝数据互通</Text>
              </div>
              <div>
                <Title level={4}>场景化切换</Title>
                <Text type="secondary">根据使用场景灵活切换设备</Text>
              </div>
              <div>
                <Title level={4}>多端协同</Title>
                <Text type="secondary">桌面端统一，移动端专注</Text>
              </div>
            </div>
          </Card>
        </div>

      </Content>

              {/* CTA Section */}
              <div className="text-center mt-20">
          <Space size="large" direction="vertical">
            <Button type="primary" size="large" onClick={() => router.push('/project')}>
              体验一下项目，好用到想哭
            </Button>
            <Space size="middle">
              <Button icon={<MobileOutlined />}>下载Chat</Button>
              <Button icon={<MobileOutlined />}>下载AI</Button>
              <Button icon={<MobileOutlined />}>下载View</Button>
            </Space>
          </Space>
        </div>

      {/* 底部版权 */}
      <Footer className="text-center">
        <Text type="secondary">© 2025 MindMorbius. All rights reserved.</Text>
      </Footer>
    </Layout>
  );
}