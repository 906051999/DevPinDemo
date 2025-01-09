'use client';

import { useNodes } from '@/contexts/NodesContext';
import { Node } from '@/types/node';
import { useState } from 'react';
import { splitNode, generateRoot } from '@/lib/api';
import { AIResponseParser } from '@/lib/parser';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Typography, Space, message } from 'antd';
import { RobotOutlined, MessageOutlined, ThunderboltOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@/app/providers';
import MarkdownPreview from '@uiw/react-markdown-preview';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ExportPage() {
  const { nodes, updateNode, deleteNode, createGenerateNode, setNodes } = useNodes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [splittingId, setSplittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const router = useRouter();

  const handleAIOptimize = async (node: Node) => {
    setGeneratingId(node.id);
    setError(null);
    
    try {
      const response = await generateRoot(
        `标题: ${node.title}\n内容: ${node.content}`
      );
      const result = AIResponseParser.parseRoot(response);
      
      await updateNode(node.id, {
        generateTitle: result.title,
        generateContent: result.description + '\n\n' + "功能点: \n" + result.features.join('\n')
      });
      message.success('AI优化成功');
    } catch (error) {
      console.error('AI优化失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请重试');
      message.error('AI优化失败，请重试');
    } finally {
      setGeneratingId(null);
    }
  };

  const handleAISplit = async (node: Node) => {
    setSplittingId(node.id);
    setError(null);
    
    try {
      const response = await splitNode(
        `标题: ${node.title}\n内容: ${node.content}`
      );
      const result = AIResponseParser.parseSplitNodes(response);
      
      const newNodes = [];
      let index = 1;
      const currentMaxNumber = Math.max(...nodes.map(n => n.number), -1);
      
      for (const suggestion of result.nodes) {
        const siblingCount = nodes.filter(n => 
          n.sequence.startsWith(node.sequence + '.') &&
          n.sequence.split('.').length === node.level + 2
        ).length;
        
        const newNode = await createGenerateNode(node.sequence, node.level + 1, {
          title: suggestion.title,
          content: suggestion.description,
          generateTitle: suggestion.title,
          generateContent: suggestion.description,
          sequence: `${node.sequence}.${siblingCount + index}`,
          number: currentMaxNumber + index
        });
        newNodes.push(newNode);
        index++;
      }
      
      setNodes([...nodes, ...newNodes]);
      message.success('AI拆分成功');
    } catch (error) {
      console.error('AI拆分失败:', error);
      setError(error instanceof Error ? error.message : 'AI拆分失败，请重试');
      message.error('AI拆分失败，请重试');
    } finally {
      setSplittingId(null);
    }
  };

  const handleChatClick = (nodeId: string) => {
    router.push('/chat');
    document.cookie = `nodeId=${nodeId}; path=/`;
  };

  const renderNode = (node: Node) => {
    const headingLevel = '#'.repeat(node.level + 1);
    const childNodes = nodes.filter(n => 
      n.sequence.startsWith(node.sequence + '.') &&
      n.sequence.split('.').length === node.sequence.split('.').length + 1
    );

    const isEditing = editingId === node.id;
    const hasAiContent = node.generateTitle || node.generateContent;
    const chatCount = node.chatHistory?.length || 0;

    return (
      <Card 
        key={node.id} 
        className="m-4"
        title={
          <div className="flex items-center gap-2">
            <Text>{headingLevel}</Text>
            {hasAiContent && <RobotOutlined className="text-primary" />}
          </div>
        }
      >
        {isEditing ? (
          <Space direction="vertical" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <Text type="secondary">标题</Text>
              <Button 
                danger
                type="text"
                size="normal"
                icon={<DeleteOutlined />}
                onClick={async () => {
                  await deleteNode(node.id);
                  setEditingId(null);
                }}
              />
            </div>

            <div>
              <Input
                defaultValue={node.title}
                onBlur={(e) => updateNode(node.id, { title: e.target.value })}
              />
              {node.generateTitle && (
                <div className="mt-2">
                  <Text type="secondary">AI 标题</Text>
                  <Input
                    defaultValue={node.generateTitle}
                    onBlur={(e) => updateNode(node.id, { generateTitle: e.target.value })}
                    placeholder={generatingId === node.id ? "AI 正在生成..." : undefined}
                  />
                </div>
              )}
            </div>

            <div>
              <Text type="secondary">内容</Text>
              <TextArea
                defaultValue={node.content}
                onBlur={(e) => updateNode(node.id, { content: e.target.value })}
                rows={4}
              />
              {node.generateContent && (
                <div className="mt-2">
                  <Text type="secondary">AI 内容</Text>
                  <TextArea
                    defaultValue={node.generateContent}
                    onBlur={(e) => updateNode(node.id, { generateContent: e.target.value })}
                    placeholder={generatingId === node.id ? "AI 正在生成..." : undefined}
                    rows={6}
                  />
                </div>
              )}
            </div>

            {error && <Text type="danger">{error}</Text>}

            <div className="flex justify-between items-center">
              <Space>
                <Button 
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  onClick={() => handleAIOptimize(node)}
                  loading={generatingId === node.id}
                  disabled={generatingId !== null || splittingId !== null}
                >
                  AI 优化
                </Button>
                <Button
                  icon={<RobotOutlined />}
                  onClick={() => handleAISplit(node)}
                  loading={splittingId === node.id}
                  disabled={generatingId !== null || splittingId !== null}
                >
                  AI 拆分
                </Button>
                <Button
                  icon={<MessageOutlined />}
                  onClick={() => handleChatClick(node.id)}
                  badge={{ count: chatCount }}
                >
                  聊天
                </Button>
              </Space>

              <Button onClick={() => setEditingId(null)}>
                完成
              </Button>
            </div>
          </Space>
        ) : (
          <div onClick={() => setEditingId(node.id)}>
            <Title level={node.level + 2 as 1 | 2 | 3 | 4 | 5}>
              {node.generateTitle || node.title}
            </Title>
            {(node.generateContent || node.content) && (
              <div className="mt-2">
                <MarkdownPreview 
                  source={node.generateContent || node.content} 
                  style={{
                    backgroundColor: 'transparent',
                    color: 'inherit'
                  }}
                />
              </div>
            )}
          </div>
        )}
        
        {childNodes.length > 0 && (
          <div className="ml-4">
            {childNodes.map(child => renderNode(child))}
          </div>
        )}
      </Card>
    );
  };

  const rootNode = nodes.find(n => n.level === 0);

  return (
    <div className="container mx-auto py-8">
      {rootNode && renderNode(rootNode)}
    </div>
  );
} 