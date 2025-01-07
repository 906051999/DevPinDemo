import { useState } from 'react';
import { Node } from '@/types/node';

interface NodeCardProps {
  node: Node;
  onOpenDialog: (nodeId: string) => void;
}

export default function NodeCard({ node, onOpenDialog }: NodeCardProps) {
  return (
    <div className="h-full aspect-[2.5/3.5] relative select-none">
      <div className="fluent-card rounded-xl p-4 h-full
                    flex flex-col bg-white/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-secondary)]">
            {node.sequence}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenDialog(node.id);
            }}
            className="p-1.5 rounded-full hover:bg-white/60 transition-colors"
            aria-label="Show details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                 style={{ minWidth: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        <h3 className="font-medium mb-2 line-clamp-1">{node.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1">
          {node.content}
        </p>
        
        <div className="mt-3 text-xs text-[var(--text-secondary)]">
          更新于 {new Date(node.updatedAt).toLocaleDateString()}
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 opacity-0 hover:opacity-100
                    bg-gradient-to-r from-blue-100/20 to-purple-100/20 
                    blur-xl transition-opacity duration-500" />
    </div>
  );
} 