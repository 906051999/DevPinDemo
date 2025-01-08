'use client';

import { useNodes } from '@/contexts/NodesContext';
import { Node } from '@/types/node';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { evaluateNode, splitNode, generateRoot } from '@/lib/api';
import { AIResponseParser } from '@/lib/parser';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';

export default function ExportPage() {
  const { nodes, updateNode, deleteNode, createGenerateNode, setNodes } = useNodes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [splittingId, setSplittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

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
    } catch (error) {
      console.error('AI优化失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请重试');
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
          sequence: `${node.sequence}.${siblingCount + index}`
        });
        newNodes.push(newNode);
        index++;
      }
      
      setNodes([...nodes, ...newNodes]);
    } catch (error) {
      console.error('AI拆分失败:', error);
      setError(error instanceof Error ? error.message : 'AI拆分失败，请重试');
    } finally {
      setSplittingId(null);
    }
  };

  const renderNode = (node: Node) => {
    const headingLevel = '#'.repeat(node.level + 1);
    const childNodes = nodes.filter(n => 
      n.sequence.startsWith(node.sequence + '.') &&
      n.sequence.split('.').length === node.sequence.split('.').length + 1
    );

    const isEditing = editingId === node.id;
    const hasAiContent = node.generateTitle || node.generateContent;

    return (
      <div key={node.id} className="p-4 m-4 border rounded-lg shadow-sm group">
        <div className="prose max-w-none">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-default-500">标题</div>
                <Input
                  defaultValue={node.title}
                  onBlur={(e) => updateNode(node.id, { title: e.target.value })}
                  className="mb-2"
                />
                <div className="h-px bg-default-200" />
                <div className="p-2 bg-default-50 rounded-lg">
                  <MarkdownPreview 
                    source={generatingId === node.id ? "AI 正在生成..." : node.generateTitle}
                    wrapperElement={{
                      "data-color-mode": theme
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-default-500">内容</div>
                <Textarea
                  defaultValue={node.content}
                  onBlur={(e) => updateNode(node.id, { content: e.target.value })}
                  className="mb-2"
                />
                <div className="h-px bg-default-200" />
                <div className="p-2 bg-default-50 rounded-lg">
                  <MarkdownPreview 
                    source={generatingId === node.id ? "AI 正在生成..." : node.generateContent}
                    wrapperElement={{
                      "data-color-mode": theme
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="text-danger text-sm mt-2">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    color="primary" 
                    variant="flat"
                    startContent={<Sparkles size={16} />}
                    onPress={() => handleAIOptimize(node)}
                    isLoading={generatingId === node.id}
                    isDisabled={generatingId !== null || splittingId !== null}
                  >
                    {generatingId === node.id ? 'AI 生成中...' : 'AI 优化'}
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="flat"
                    startContent={<Bot size={16} />}
                    onPress={() => handleAISplit(node)}
                    isLoading={splittingId === node.id}
                    isDisabled={generatingId !== null || splittingId !== null}
                  >
                    {splittingId === node.id ? 'AI 拆分中...' : 'AI 拆分'}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    color="default" 
                    variant="light"
                    onPress={() => setEditingId(null)}
                  >
                    完成
                  </Button>
                  <Button 
                    color="danger" 
                    variant="light"
                    onPress={async () => {
                      await deleteNode(node.id);
                      setEditingId(null);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="cursor-pointer group-hover:bg-default-100 rounded p-2"
              onClick={() => setEditingId(node.id)}
            >
              <div className="flex items-center gap-2">
                <MarkdownPreview 
                  source={`${headingLevel} ${node.generateTitle || node.title}`}
                  className="inline"
                  wrapperElement={{
                    "data-color-mode": theme
                  }}
                />
                {hasAiContent && (
                  <Bot className="text-primary" size={18} />
                )}
              </div>
              {(node.generateContent || node.content) && (
                <div className="mt-2 text-gray-600">
                  <MarkdownPreview 
                    source={node.generateContent || node.content}
                    wrapperElement={{
                      "data-color-mode": theme
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {childNodes.length > 0 && (
          <div className="ml-4">
            {childNodes.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  const rootNode = nodes.find(n => n.level === 0);

  return (
    <div className="container mx-auto py-8">
      {rootNode && renderNode(rootNode)}
    </div>
  );
} 