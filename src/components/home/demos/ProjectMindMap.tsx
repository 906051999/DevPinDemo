'use client';

import { Card, Row, Col, Typography, Space, Tag, Drawer, Timeline, Avatar } from 'antd';
import ReactFlow, { 
  Background, 
  Controls,
  MarkerType,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useState } from 'react';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { theme } from 'antd';

const { Text } = Typography;

const ProjectMindMap = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { token } = theme.useToken();

  // 添加节点样式生成函数
  const getNodeStyle = (type: 'primary' | 'success' | 'default') => ({
    background: type === 'primary' ? token.colorPrimaryBg :
                type === 'success' ? token.colorSuccessBg :
                token.colorBgContainer,
    border: `2px solid ${
      type === 'primary' ? token.colorPrimary :
      type === 'success' ? token.colorSuccess :
      token.colorBorder
    }`,
    borderRadius: '8px',
    padding: '10px',
    width: type === 'default' ? 150 : 180,
  });

  const nodes: Node[] = [
    // SitePin 项目节点
    {
      id: 'sitepin',
      type: 'default',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text strong>SitePin</Text>
            <Tag color="processing">进行中</Tag>
          </Space>
        )
      },
      position: { x: 300, y: 100 },
      style: getNodeStyle('primary')
    },
    // SitePin 子节点
    {
      id: 'sitepin-frontend',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>前端模块</Text>
            <Tag color="blue">进行中</Tag>
          </Space>
        )
      },
      position: { x: 100, y: 250 },
      style: getNodeStyle('default')
    },
    {
      id: 'sitepin-monitor',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>监控系统</Text>
            <Tag color="green">活跃</Tag>
          </Space>
        )
      },
      position: { x: 300, y: 250 },
      style: getNodeStyle('default')
    },
    {
      id: 'sitepin-ai',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>AI分类</Text>
            <Tag color="orange">规划中</Tag>
          </Space>
        )
      },
      position: { x: 500, y: 250 },
      style: getNodeStyle('default')
    },
    // DevPin 项目节点
    {
      id: 'devpin',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text strong>DevPin</Text>
            <Tag color="success">活跃</Tag>
          </Space>
        )
      },
      position: { x: 900, y: 100 },
      style: getNodeStyle('success')
    },
    // DevPin 子节点
    {
      id: 'devpin-project',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>项目管理</Text>
            <Tag color="blue">进行中</Tag>
          </Space>
        )
      },
      position: { x: 700, y: 250 },
      style: getNodeStyle('default')
    },
    {
      id: 'devpin-ai',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>AI协作</Text>
            <Tag color="green">活跃</Tag>
          </Space>
        )
      },
      position: { x: 900, y: 250 },
      style: getNodeStyle('default')
    },
    {
      id: 'devpin-analysis',
      data: { 
        label: (
          <Space direction="vertical" align="center">
            <Text>数据分析</Text>
            <Tag color="purple">开发中</Tag>
          </Space>
        )
      },
      position: { x: 1100, y: 250 },
      style: getNodeStyle('default')
    }
  ];

  const edges: Edge[] = [
    // SitePin 内部连接
    {
      id: 'sitepin-to-frontend',
      source: 'sitepin',
      target: 'sitepin-frontend',
      animated: true,
      label: '核心功能',
    },
    {
      id: 'sitepin-to-monitor',
      source: 'sitepin',
      target: 'sitepin-monitor',
      animated: true,
      label: '状态追踪',
    },
    {
      id: 'sitepin-to-ai',
      source: 'sitepin',
      target: 'sitepin-ai',
      animated: true,
      label: '智能分类',
    },
    // DevPin 内部连接
    {
      id: 'devpin-to-project',
      source: 'devpin',
      target: 'devpin-project',
      animated: true,
      label: '核心功能',
    },
    {
      id: 'devpin-to-ai',
      source: 'devpin',
      target: 'devpin-ai',
      animated: true,
      label: 'AI辅助',
    },
    {
      id: 'devpin-to-analysis',
      source: 'devpin',
      target: 'devpin-analysis',
      animated: true,
      label: '数据支持',
    },
    // 项目间连接
    {
      id: 'devpin-to-sitepin',
      source: 'devpin',
      target: 'sitepin',
      animated: true,
      label: '开发支持',
      type: 'smoothstep',
      style: { stroke: '#1890ff', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }
  ];

  const nodeDetails = {
    'sitepin-frontend': {
      title: '前端模块',
      status: '进行中',
      owner: 'Alex',
      subNodes: [
        { name: '网站卡片组件', status: '开发中' },
        { name: '布局系统', status: '已完成' },
        { name: '移动端适配', status: '规划中' }
      ],
      discussions: [
        {
          user: 'Alex',
          content: '图片加载优化方案已提交',
          time: '2小时前'
        },
        {
          user: 'AI助手',
          content: '建议考虑添加骨架屏',
          time: '1小时前'
        }
      ]
    },
    'devpin-ai': {
      title: 'AI协作',
      status: '活跃',
      owner: 'Sarah',
      subNodes: [
        { name: '代码分析', status: '活跃' },
        { name: '需求优化', status: '开发中' },
        { name: '文档生成', status: '规划中' }
      ],
      discussions: [
        {
          user: 'Sarah',
          content: '新增代码review功能',
          time: '3小时前'
        },
        {
          user: 'AI助手',
          content: '可以集成提交信息分析',
          time: '2小时前'
        }
      ]
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="项目节点图" className="mb-4">
          <div style={{ 
            height: '600px',
            background: token.colorBgContainer
          }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={(_, node) => setSelectedNode(node.id)}
              fitView
              proOptions={{
                style: {
                  backgroundColor: token.colorBgContainer,
                }
              }}
            >
              <Background color={token.colorBorder} />
              <Controls />
            </ReactFlow>
          </div>
        </Card>
      </Col>

      <Drawer
        title="节点详情"
        placement="right"
        onClose={() => setSelectedNode(null)}
        open={selectedNode !== null && nodeDetails[selectedNode] !== undefined}
        width={400}
      >
        {selectedNode && nodeDetails[selectedNode] && (
          <Space direction="vertical" className="w-full">
            <Space className="w-full justify-between">
              <Text strong>{nodeDetails[selectedNode].title}</Text>
              <Tag color="processing">{nodeDetails[selectedNode].status}</Tag>
            </Space>
            
            <Space className="mb-4">
              <UserOutlined />
              <Text>负责人：{nodeDetails[selectedNode].owner}</Text>
            </Space>

            <Text strong>子节点：</Text>
            <Space direction="vertical" className="w-full mb-4">
              {nodeDetails[selectedNode].subNodes.map((node, index) => (
                <Space key={index} className="w-full justify-between">
                  <Text>{node.name}</Text>
                  <Tag color={
                    node.status === '已完成' ? 'success' :
                    node.status === '开发中' ? 'processing' :
                    node.status === '活跃' ? 'blue' : 'default'
                  }>
                    {node.status}
                  </Tag>
                </Space>
              ))}
            </Space>

            <Text strong>最近讨论：</Text>
            <Timeline
              items={nodeDetails[selectedNode].discussions.map(disc => ({
                dot: disc.user === 'AI助手' ? 
                  <Avatar icon={<RobotOutlined />} size="small" style={{ backgroundColor: '#87d068' }} /> :
                  <Avatar icon={<UserOutlined />} size="small" />,
                children: (
                  <Space direction="vertical">
                    <Space>
                      <Text strong>{disc.user}</Text>
                      <Text type="secondary">{disc.time}</Text>
                    </Space>
                    <Text>{disc.content}</Text>
                  </Space>
                )
              }))}
            />
          </Space>
        )}
      </Drawer>
    </Row>
  );
};

export default ProjectMindMap; 