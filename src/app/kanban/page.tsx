'use client';

import { ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import { theme } from 'antd';
import NodeMindMap from '@/components/kanban/NodeMindMap';
import NodeCardPanel from '@/components/kanban/NodeCardPanel';
import NodeDialog from '@/components/kanban/NodeDialog';
import { NodesProvider } from '@/contexts/NodesContext';
import { NavbarComponent } from '@/components/Navbar';

export default function Home() {
  const [dialogNodeId, setDialogNodeId] = useState<string | null>(null);
  const { token } = theme.useToken();

  const handleOpenDialog = (nodeId: string) => {
    setDialogNodeId(nodeId);
  };

  const handleCloseDialog = () => {
    setDialogNodeId(null);
  };

  return (
    <NodesProvider>
      <div 
        className="w-screen h-screen flex flex-col pt-16"
        style={{ 
          background: token.colorBgLayout,
          color: token.colorText
        }}
      >
        <NavbarComponent />
        
        {/* 节点列表区域 */}
        <div 
          className="h-[30%]"
          style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
        >
          <div className="h-full flex flex-col">
            <div 
              className="px-4 py-2 flex justify-between items-center backdrop-blur-md"
              style={{ 
                background: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                opacity: 0.98
              }}
            >
              <h2 style={{ 
                fontSize: token.fontSizeSM,
                fontWeight: token.fontWeightStrong,
                margin: 0
              }}>
                节点列表
              </h2>
            </div>
            
            <div 
              className="flex-1 overflow-hidden"
              style={{ 
                background: token.colorBgLayout,
                opacity: 0.95
              }}
            >
              <NodeCardPanel onOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </div>

        {/* 思维导图区域 */}
        <div className="h-[70%] flex flex-col">
          <div 
            className="px-4 py-2 backdrop-blur-md"
            style={{ 
              background: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              opacity: 0.98
            }}
          >
            <h2 style={{ 
              fontSize: token.fontSizeSM,
              fontWeight: token.fontWeightStrong,
              margin: 0
            }}>
              思维导图
            </h2>
          </div>
          
          <div 
            className="flex-1"
            style={{ 
              background: token.colorBgLayout,
              opacity: 0.9
            }}
          >
            <ReactFlowProvider>
              <NodeMindMap />
            </ReactFlowProvider>
          </div>
        </div>

        <NodeDialog
          nodeId={dialogNodeId}
          isOpen={!!dialogNodeId}
          onClose={handleCloseDialog}
        />
      </div>
    </NodesProvider>
  );
}
