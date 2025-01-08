import { Node } from '@/types/node';
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

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
  chatCount = 0,
  hasUnread = false 
}: NodeCardProps) {
  const handleClick = () => {
    // 触发与 NodeMindMap 相同的事件
    const customEvent = new CustomEvent('node-selected', { 
      detail: { nodeId: node.id }
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <Card 
      isPressable
      isHoverable
      shadow="sm"
      className="h-full aspect-[2.5/3.5]"
      classNames={{
        base: isSelected ? 'border-2 border-primary-300 shadow-medium' : '',
        body: "py-2"
      }}
      onPress={handleClick}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-stretch">
        <div className="flex items-center justify-between">
          <span className="text-sm text-default-500">{node.sequence}</span>
          <span className="text-[10px] bg-default-100 text-default-600 px-1.5 py-0.5 rounded-full truncate max-w-[120px]">
            {formatDistanceToNow(new Date(node.updatedAt), { 
              locale: zhCN, 
              addSuffix: true,
            })}
          </span>
        </div>
        <h3 className="font-medium line-clamp-1 mt-1">{node.title}</h3>
      </CardHeader>
      
      <CardBody>
        <p className="text-sm text-default-500 line-clamp-2">
          {node.content}
        </p>
      </CardBody>

      <CardFooter className="grid grid-cols-2 gap-2">
        <button 
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: 处理聊天事件
          }}
          className="flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-default-100 transition-colors relative"
          aria-label="Chat"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs">聊天</span>
          {chatCount > 0 && (
            <span className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full 
              ${hasUnread ? 'bg-primary text-white' : 'bg-default-100 text-default-600'}`}>
              {chatCount}
            </span>
          )}
        </button>

        <button 
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenDialog(node.id);
          }}
          className="flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-default-100 transition-colors"
          aria-label="Show details"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs">信息</span>
        </button>
      </CardFooter>
    </Card>
  );
} 