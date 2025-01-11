'use client';

import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Input, Space, Steps } from 'antd';
import { RobotOutlined, UserOutlined, LinkOutlined, BulbOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

export default function ProjectSuggestion() {
  const [currentStep, setCurrentStep] = useState(0);

  const selectedNode = {
    path: "记忆系统/数据存储",
    content: "目前使用简单的JSON格式存储bot的记忆，按时间顺序排列。",
    tags: ["存储", "记忆系统"]
  };

  const suggestionSteps = [
    {
      title: '选择节点',
      description: '点击项目树，选择要优化的功能点'
    },
    {
      title: '编写建议',
      description: '描述你的想法和建议'
    },
    {
      title: 'AI优化',
      description: 'AI助手帮助优化表达'
    },
    {
      title: '确认提交',
      description: '确认优化后的建议内容'
    }
  ];

  const aiSuggestions = [
    {
      type: "专业术语",
      original: "可以把记忆之间的关系也存起来",
      optimized: "建议引入图数据库（如Neo4j）来存储记忆节点之间的关联关系",
      explanation: "使用专业术语更准确地表达技术方案"
    },
    {
      type: "实现细节",
      original: "存储时间和关系",
      optimized: "记忆节点应包含时间戳、情感标签、关系权重等属性，便于后续的记忆检索和情感分析",
      explanation: "补充具体的实现细节，使建议更可执行"
    },
    {
      type: "参考依据",
      original: "这样可能会更好",
      optimized: "参考人类认知科学中的联想记忆模型，这种存储方式更接近自然的记忆形成过程",
      explanation: "添加理论依据，增强建议的说服力"
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card title="建议优化" className="mb-4">
          <Steps current={currentStep} items={suggestionSteps} />
          
          <div className="mt-8">
            {currentStep === 0 && (
              <Card type="inner" title="已选择节点">
                <Space direction="vertical" className="w-full">
                  <Space>
                    <LinkOutlined />
                    <Text strong>{selectedNode.path}</Text>
                  </Space>
                  <Paragraph>{selectedNode.content}</Paragraph>
                  <Space>
                    {selectedNode.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Space>
              </Card>
            )}

            {currentStep === 1 && (
              <Card type="inner" title="编写建议">
                <Space direction="vertical" className="w-full">
                  <TextArea
                    rows={4}
                    placeholder="描述你对这个功能点的建议..."
                    className="mb-4"
                  />
                  <Text type="secondary">提示：可以从实现方式、性能优化、用户体验等角度提出建议</Text>
                </Space>
              </Card>
            )}

            {currentStep === 2 && (
              <Card type="inner" title="AI优化建议表达">
                <List
                  itemLayout="vertical"
                  dataSource={aiSuggestions}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<><Tag color="blue">{item.type}</Tag></>}
                        description={
                          <Space direction="vertical" className="w-full">
                            <Card size="small">
                              <Text type="secondary">原始表达：</Text>
                              <Paragraph>{item.original}</Paragraph>
                            </Card>
                            <Card size="small">
                              <Text type="secondary">优化建议：</Text>
                              <Paragraph>{item.optimized}</Paragraph>
                            </Card>
                            <Text type="secondary">{item.explanation}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {currentStep === 3 && (
              <Card type="inner" title="最终建议">
                <Space direction="vertical" className="w-full">
                  <Paragraph>
                    <Text strong>优化建议：记忆系统存储架构改进</Text>
                  </Paragraph>
                  <Paragraph>
                    建议采用图数据库（如Neo4j）重构记忆存储系统，将记忆节点之间的关联关系显式存储。
                    每个记忆节点应包含时间戳、情感标签、关系权重等属性，便于后续的记忆检索和情感分析。
                    这种基于图的存储方式更接近人类认知科学中的联想记忆模型，有助于实现更自然的对话生成。
                  </Paragraph>
                  <Space className="mt-4">
                    <Tag color="blue">存储优化</Tag>
                    <Tag color="green">性能提升</Tag>
                    <Tag color="purple">可扩展性</Tag>
                  </Space>
                </Space>
              </Card>
            )}

            <div className="mt-4 text-right">
              <Button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                上一步
              </Button>
              <Button 
                type="primary"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="ml-2"
                disabled={currentStep === 3}
              >
                下一步
              </Button>
              {currentStep === 3 && (
                <Button type="primary" className="ml-2">
                  提交建议
                </Button>
              )}
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card title="AI助手" className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                avatar: <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#87d068' }} />,
                title: "优化建议",
                description: "我会帮助你：1. 使用更专业的术语 2. 补充必要的细节 3. 增加理论依据 4. 改善表达方式"
              }
            ]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card title="提示与技巧">
          <Space direction="vertical" className="w-full">
            <Paragraph>
              <BulbOutlined className="mr-2" />
              引用具体的项目节点，使建议更有针对性
            </Paragraph>
            <Paragraph>
              <EditOutlined className="mr-2" />
              描述问题的同时，最好能提供可能的解决方案
            </Paragraph>
            <Paragraph>
              <LinkOutlined className="mr-2" />
              可以关联相关的技术文档或最佳实践
            </Paragraph>
          </Space>
        </Card>
      </Col>
    </Row>
  );
} 