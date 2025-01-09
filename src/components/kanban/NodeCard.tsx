import { Node } from '@/types/node';
import { Card, Typography, Badge } from 'antd';
import { MessageOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { theme } from 'antd';
import MarkdownPreview from '@uiw/react-markdown-preview';

const { Text, Title } = Typography;

interface NodeCardProps {
  node: Node;
  onOpenDialog: (nodeId: string) => void;
  isSelected?: boolean;
  chatCount?: number;
  hasUnread?: boolean;
}

export default function NodeCard({ 
  node, 
  onOpenDialog, 
  isSelected,
}: NodeCardProps) {
  const router = useRouter();
  const chatCount = node.chatHistory?.length || 0;
  const hasChat = chatCount > 0;
  const { token } = theme.useToken();

  const handleClick = () => {
    const customEvent = new CustomEvent('node-selected', { 
      detail: { nodeId: node.id }
    });
    window.dispatchEvent(customEvent);
  };

  const handleChatClick = () => {
    router.push('/chat');
    document.cookie = `nodeId=${node.id}; path=/`;
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="h-full aspect-[2.5/3.5]"
      style={{
        ...(isSelected && {
          outline: `2px solid ${token.colorPrimary}`,
          outlineOffset: '2px',
        })
      }}
      styles={{
        body: { 
          padding: '8px 16px', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <Text type="secondary">{node.number}</Text>
        <Text 
          type="secondary" 
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: token.colorFillQuaternary,
          }}
        >
          {formatDistanceToNow(new Date(node.updatedAt), { 
            locale: zhCN, 
            addSuffix: true,
          })}
        </Text>
      </div>
      
      <Title level={5} ellipsis className="mb-2">
        {node.generateTitle || node.title}
      </Title>
      
      <div className="flex-1 text-sm overflow-hidden">
        <MarkdownPreview 
          source={node.generateContent || node.content} 
          style={{ 
            backgroundColor: 'transparent',
            color: token.colorTextSecondary,
            fontSize: '12px',
            lineHeight: 2,
          }}
          components={{
            p: ({ children }) => (
              <p style={{ 
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>{children}</p>
            ),
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            handleChatClick();
          }}
          className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 relative hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: 'transparent',
            color: hasChat ? token.colorPrimary : token.colorTextSecondary,
            border: `1px solid ${hasChat ? token.colorPrimary : token.colorBorder}`,
          }}
          aria-label="Chat"
        >
          <MessageOutlined style={{ fontSize: '14px' }} />
          <span className="text-xs font-medium">聊天</span>
          {chatCount > 0 && (
            <Badge 
              count={chatCount}
              className="absolute -top-2 -right-2"
            />
          )}
        </button>

        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenDialog(node.id);
          }}
          className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: token.colorTextSecondary,
            border: `1px solid ${token.colorBorder}`,
          }}
          aria-label="Show details"
        >
          <InfoCircleOutlined style={{ fontSize: '14px' }} />
          <span className="text-xs font-medium">信息</span>
        </button>
      </div>
    </Card>
  );
} 