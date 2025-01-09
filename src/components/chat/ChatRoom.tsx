'use client';

import { useEffect, useRef, useState } from 'react';
import { List, Button, Avatar, Card, Typography, theme } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import { ChatMessage } from '@/types/message';
import { Node } from '@/types/node';
import { useNodes } from '@/contexts/NodesContext';
import { useTheme } from '@/app/providers';

const { Text } = Typography;

interface ChatRoomProps {
  messages: ChatMessage[];
  currentNode: Node | null;
  onSend: (message: string) => void;
}

export function ChatRoom({ messages, currentNode, onSend }: ChatRoomProps) {
  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { nodes } = useNodes();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue('');
  };

  const displayMessages = currentNode?.level === 0
    ? messages.filter(msg => {
        const msgNode = nodes.find(n => n.id === msg.nodeId);
        return msgNode && msgNode.sequence.startsWith(currentNode.sequence);
      })
    : messages.filter(msg => msg.nodeId === currentNode?.id);

  // 按时间排序消息，旧的在上
  const sortedMessages = [...displayMessages].sort(
    (a, b) => (a.createAt as number) - (b.createAt as number)
  );

  return (
    <div 
      className="flex flex-col h-full" 
      data-color-mode={isDark ? 'dark' : 'light'}
    >
      {/* 聊天室标题 */}
      <div 
        className="p-4 flex items-center border-b"
        style={{ borderColor: token.colorBorderSecondary }}
      >
        <Text strong>
          {currentNode ? 
            `${currentNode.sequence}. ${currentNode.title}` : 
            '请选择一个项目或话题'
          }
        </Text>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-auto p-4">
        <List
          dataSource={sortedMessages}
          renderItem={(msg) => (
            <List.Item key={msg.id} className="border-0">
              <div className={`flex w-full ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <Card 
                  size="small"
                  className={`max-w-[80%] ${
                    msg.role === 'assistant' 
                      ? isDark ? 'bg-[#1f1f1f]' : 'bg-gray-50'
                      : isDark ? 'bg-[#177ddc26]' : 'bg-blue-50'
                  }`}
                  style={{ 
                    borderColor: token.colorBorderSecondary,
                    marginLeft: msg.role === 'assistant' ? 0 : 'auto',
                    marginRight: msg.role === 'assistant' ? 'auto' : 0,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <Avatar 
                      size="small" 
                      src={msg.meta?.avatar}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Text type="secondary" className="text-xs">
                          {msg.meta?.name}
                        </Text>
                        {(currentNode?.level === 0 || msg.nodeId !== currentNode?.id) && (
                          <Text type="secondary" className="text-xs">
                            来自: {msg.nodeTitle}
                          </Text>
                        )}
                      </div>
                      <div className="mt-1">
                        <MDEditor.Markdown 
                          source={msg.content as string} 
                          style={{ 
                            backgroundColor: 'transparent',
                            whiteSpace: 'pre-wrap'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div 
        className="p-4 border-t"
        style={{ borderColor: token.colorBorderSecondary }}
      >
        <div className="flex flex-col gap-2">
          <MDEditor
            value={inputValue}
            onChange={(val) => setInputValue(val || '')}
            preview="edit"
            height={100}
            visibleDragbar={false}
            textareaProps={{
              placeholder: '输入消息...',
              onKeyDown: (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }
            }}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSend}
            className="self-end"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
} 