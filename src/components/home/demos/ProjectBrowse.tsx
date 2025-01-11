'use client';

import { Card, Row, Col, Typography, Timeline, Avatar, Space, Tag, Button, List, Divider } from 'antd';
import { RobotOutlined, UserOutlined, BulbOutlined, ExperimentOutlined, CodeOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function ProjectBrowse() {
  const projectInfo = {
    title: "Bot社交模拟系统",
    status: "构思中",
    tags: ["AI", "社交模拟", "人设生成"]
  };

  const aiAnalysis = [
    {
      title: "项目定位",
      icon: <BulbOutlined className="text-xl text-blue-500" />,
      content: "这是一个探索AI社交行为的创新项目。通过构建虚拟社交环境或分析真实群聊数据，实现更自然的AI社交互动。",
    },
    {
      title: "技术挑战",
      icon: <ExperimentOutlined className="text-xl text-green-500" />,
      content: "核心难点在于实现自然的社交行为模拟。需要解决记忆连贯性、多轮对话、情感表达等问题。",
    },
    {
      title: "开发建议",
      icon: <CodeOutlined className="text-xl text-purple-500" />,
      content: "建议采用模块化设计，将人设生成、对话管理、记忆系统分开实现。可以先从简单的群聊场景开始测试。",
    },
    {
      title: "参与机会",
      icon: <TeamOutlined className="text-xl text-orange-500" />,
      content: "目前正在招募对NLP或社交模拟感兴趣的开发者。可以从人设模板设计或群聊数据分析开始参与。",
    }
  ];

  const conversation = [
    {
      author: "新手开发者",
      avatar: <Avatar icon={<UserOutlined />} />,
      content: "看起来很有趣！但我只会一点Python，能参与这个项目吗？",
    },
    {
      author: "AI助手",
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <>
          <Paragraph>
            当然可以！这个项目有多个适合新手的切入点：
          </Paragraph>
          <ul>
            <li>帮助收集和标注群聊数据</li>
            <li>使用Python编写简单的数据分析脚本</li>
            <li>参与人设模板的设计和测试</li>
          </ul>
          <Paragraph>
            建议从以下资源开始：
            <Tag color="blue">数据处理教程</Tag>
            <Tag color="green">新手任务列表</Tag>
            <Tag color="purple">项目文档</Tag>
          </Paragraph>
        </>
      ),
    },
    {
      author: "资深开发者",
      avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />,
      content: "记忆系统这块我有一些想法，我们是否考虑使用图数据库来存储bot的经历和关系网络？",
    },
    {
      author: "AI助手",
      avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
      content: (
        <>
          <Paragraph>
            这是个很棒的建议！使用图数据库确实能更好地表达社交关系。具体可以：
          </Paragraph>
          <ul>
            <li>用节点存储事件和记忆片段</li>
            <li>用边表示记忆之间的关联</li>
            <li>通过图遍历算法实现相关记忆的快速检索</li>
          </ul>
          <Paragraph>
            相关技术：
            <Tag color="blue">Neo4j</Tag>
            <Tag color="green">GraphQL</Tag>
            <Tag color="purple">Memory Networks</Tag>
          </Paragraph>
        </>
      ),
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card title="项目概览" className="mb-4">
          <Space direction="vertical" className="w-full">
            <Space>
              <Text strong>项目名称：</Text>
              <Text>{projectInfo.title}</Text>
            </Space>
            <Space>
              <Text strong>状态：</Text>
              <Tag color="processing">{projectInfo.status}</Tag>
            </Space>
            <Space>
              <Text strong>技术标签：</Text>
              {projectInfo.tags.map(tag => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </Space>
          </Space>
        </Card>

        <Card title="AI 多维度解读" className="mb-4">
          <Space direction="vertical" size="large" className="w-full">
            {aiAnalysis.map((analysis, index) => (
              <div key={index}>
                <Space className="mb-2">
                  {analysis.icon}
                  <Text strong>{analysis.title}</Text>
                </Space>
                <Paragraph className="ml-6">
                  {analysis.content}
                </Paragraph>
                {index < aiAnalysis.length - 1 && <Divider />}
              </div>
            ))}
          </Space>
        </Card>

        <Card title="智能交流" extra={<Tag color="green">AI辅助理解中</Tag>}>
          <List
            itemLayout="horizontal"
            dataSource={conversation}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.author}
                  description={item.content}
                />
              </List.Item>
            )}
          />
          <Button type="primary" className="mt-4">
            我要提问
          </Button>
          <Button className="mt-4 ml-2">
            加入讨论
          </Button>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="项目发展" extra={<Tag color="blue">实时更新</Tag>}>
          <Timeline
            items={[
              {
                color: 'green',
                children: '灵感来源 - Koishi的chatluna插件',
              },
              {
                color: 'green',
                children: '企划1：bot聊天群 - 基于issue的人设创建',
              },
              {
                color: 'blue',
                children: '企划2：复刻群友 - 基于群聊的人设生成',
              },
              {
                color: 'gray',
                children: '下一步：原型开发',
              },
            ]}
          />
        </Card>

        <Card title="参与方式" className="mt-4">
          <Space direction="vertical" className="w-full">
            <Button type="primary" block icon={<CodeOutlined />}>
              认领开发任务
            </Button>
            <Button block icon={<TeamOutlined />}>
              加入技术讨论
            </Button>
            <Button block icon={<ExperimentOutlined />}>
              提供测试反馈
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
} 