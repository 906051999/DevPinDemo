'use client';

import { Card, Row, Col, Typography, Button, Drawer } from 'antd';
import { TeamOutlined, BulbOutlined, RocketOutlined } from '@ant-design/icons';
import DemoScenes from '@/components/home/DemoScenes';
import { useState } from 'react';
import { useTheme } from '@/app/providers';

const { Title, Paragraph } = Typography;

export default function ProjectPage() {
  const [moduleDrawer, setModuleDrawer] = useState(false);
  const [featureDrawer, setFeatureDrawer] = useState(false);
  const { isDark } = useTheme();

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
      <Card className="mb-6">
        <Title level={1} className="text-center mb-8">DevPin 互联协作平台</Title>
        <Title level={5} className="text-center mb-8">只有一个目标，好用到想哭</Title>
        
        <Paragraph className="text-lg mb-8 text-center">
          DevPin 突破传统项目管理模式，通过 AI 增强表达、优化理解，
          让每位参与者都能全面把握项目细节，在多重角色中自如切换。
        </Paragraph>

        <div className="flex justify-center gap-4 mb-8">
          <Button className={`${isDark ? 'bg-blue-800' : 'bg-blue-500'}`} type="primary" onClick={() => setModuleDrawer(true)}>
            查看核心模块
          </Button>
          <Button className={`${isDark ? 'bg-blue-800' : 'bg-blue-500'}`} type="primary" onClick={() => setFeatureDrawer(true)}>
            了解系统特色
          </Button>
        </div>
      </Card>

      <Card>
        <Title level={3} className="text-center mb-6">功能体验</Title>
        <Paragraph className="text-lg mb-4 text-center">
          跟随引导，体验完整的项目生命周期 👇
        </Paragraph>
        <DemoScenes />
      </Card>

      <Drawer
        title="核心模块"
        placement="right"
        width={500}
        open={moduleDrawer}
        onClose={() => setModuleDrawer(false)}
      >
        <Row gutter={[16, 16]}>
          {modules.map((module, index) => (
            <Col key={index} span={24}>
              <Card className="text-center">
                {module.icon}
                <Title level={4} className="my-2">{module.title}</Title>
                <Paragraph>{module.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Drawer>

      <Drawer
        title="系统特色"
        placement="right"
        width={500}
        open={featureDrawer}
        onClose={() => setFeatureDrawer(false)}
      >
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col key={index} span={24}>
              <Card>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Drawer>
    </div>
  );
} 