'use client';

import { useRouter } from 'next/navigation';
import { Layout, Button, Card, Typography, theme } from 'antd';
import { GithubOutlined, RobotOutlined } from '@ant-design/icons';
import { ForkOutlined, MessageOutlined } from '@ant-design/icons';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from './providers';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const router = useRouter();
  const { token } = theme.useToken();
  const { isDark, setIsDark } = useTheme();

  return (
    <Layout className="min-h-screen">
      {/* 顶部导航 */}
      <Header 
        className="flex justify-between items-center px-4 border-b"
        style={{ 
          background: token.colorBgContainer,
          borderColor: token.colorBorderSecondary 
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
      <Content className="max-w-7xl mx-auto w-full py-20 px-4">
        <div className="text-center mb-16">
          <Title level={1} className="mb-4">
            DevPin <Text type="secondary" className="text-2xl font-normal">Demo</Text>
          </Title>
          <Text className="text-xl" type="secondary">就一个要求，好用到想哭</Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI拆解 */}
          <Card
            hoverable
            onClick={() => router.push('/generate')}
            className="text-center"
          >
            <RobotOutlined className="text-3xl mb-4" />
            <Title level={3}>智能项目规划</Title>
            <Text type="secondary">使用AI优化项目需求，自动拆解项目子节点</Text>
          </Card>

          {/* 思维导图看板 */}
          <Card
            hoverable
            onClick={() => router.push('/kanban')}
            className="text-center"
          >
            <ForkOutlined className="text-3xl mb-4" />
            <Title level={3}>思维导图看板</Title>
            <Text type="secondary">直观展示项目结构，通过思维导图触发灵感，以节点为单位进行任务追踪</Text>
          </Card>

          {/* 聊天室 */}
          <Card
            hoverable
            onClick={() => router.push('/chat')}
            className="text-center"
          >
            <MessageOutlined className="text-3xl mb-4" />
            <Title level={3}>项目节点聊天</Title>
            <Text type="secondary">以项目为房间，以节点为聊天话题，精确的讨论项目细节，与项目元素保持零距离</Text>
          </Card>
        </div>
      </Content>

      {/* 底部版权 */}
      <Footer className="text-center">
        <Text type="secondary">© 2025 MindMorbius. All rights reserved.</Text>
      </Footer>
    </Layout>
  );
}