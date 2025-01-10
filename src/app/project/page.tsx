'use client';

import { Card, Row, Col, Typography } from 'antd';
import { TeamOutlined, BulbOutlined, RocketOutlined } from '@ant-design/icons';
import DemoScenes from '@/components/project/DemoScenes';

const { Title, Paragraph } = Typography;

export default function ProjectPage() {
  const modules = [
    {
      title: '语',
      icon: <TeamOutlined className="text-2xl" />,
      desc: '通过AI辅助的项目聊天室，优化沟通表达，降低理解成本'
    },
    {
      title: '生',
      icon: <BulbOutlined className="text-2xl" />,
      desc: 'AI增强分析，将想法转化为可执行方案'
    },
    {
      title: '象',
      icon: <RocketOutlined className="text-2xl" />,
      desc: '直观的项目可视化，展示项目进度和开发流程'
    }
  ];

  const features = [
    {
      title: '无门槛理解',
      description: '通过AI辅助，让非专业人士也能快速理解项目内容'
    },
    {
      title: '智能优化',
      description: 'AI辅助优化表达，让建议更专业、更优雅'
    },
    {
      title: '自由参与',
      description: '对感兴趣的功能点随时加入讨论和开发'
    },
    {
      title: '快速落地',
      description: 'AI助力将想法转化为可执行方案，自动拆分任务节点'
    }
  ];

  return (
    <div className="p-6">
      <Card>
        <Title level={2} className="text-center mb-8">DevPin 项目管理系统</Title>
        
        <Paragraph className="text-lg mb-8">
          DevPin 突破传统项目管理模式，通过 AI 增强表达、优化理解，
          让每位参与者都能全面把握项目细节，在多重角色中自如切换。
        </Paragraph>

        <Title level={3} className="mb-6">核心模块</Title>
        <Row gutter={[16, 16]} className="mb-8">
          {modules.map((module, index) => (
            <Col key={index} xs={24} md={8}>
              <Card className="text-center h-full">
                {module.icon}
                <Title level={4} className="my-2">{module.title}</Title>
                <Paragraph>{module.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Title level={3} className="mb-6">系统特色</Title>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} md={12}>
              <Card className="h-full">
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Title level={3} className="mb-6">功能体验</Title>
        <DemoScenes />
      </Card>
    </div>
  );
} 