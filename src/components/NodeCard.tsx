import { useState } from 'react';
import { Node } from '@/types/node';
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";

interface NodeCardProps {
  node: Node;
  onOpenDialog: (nodeId: string) => void;
  isSelected?: boolean;
}

export default function NodeCard({ node, onOpenDialog, isSelected }: NodeCardProps) {
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
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenDialog(node.id);
            }}
            className="p-1.5 rounded-full hover:bg-default-100 transition-colors"
            aria-label="Show details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                 style={{ minWidth: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <h3 className="font-medium line-clamp-1">{node.title}</h3>
      </CardHeader>
      
      <CardBody>
        <p className="text-sm text-default-500 line-clamp-2">
          {node.content}
        </p>
      </CardBody>

      <CardFooter className="text-xs text-default-500">
        更新于 {new Date(node.updatedAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
} 