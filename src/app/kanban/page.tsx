'use client';

import { ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import NodeMindMap from '@/components/kanban/NodeMindMap';
import NodeCardPanel from '@/components/kanban/NodeCardPanel';
import NodeDialog from '@/components/kanban/NodeDialog';
import { NodesProvider } from '@/contexts/NodesContext';
import { NavbarComponent } from '@/components/Navbar';

export default function Home() {
  const [dialogNodeId, setDialogNodeId] = useState<string | null>(null);

  const handleOpenDialog = (nodeId: string) => {
    setDialogNodeId(nodeId);
  };

  const handleCloseDialog = () => {
    setDialogNodeId(null);
  };

  return (
    <NodesProvider>
  
      <div className="w-screen h-screen flex flex-col bg-background/80 pt-16">
      <NavbarComponent />
        <div className="h-[30%] border-b border-divider">
          
          <div className="h-full flex flex-col">
            
            <div className="px-4 py-2 flex justify-between items-center bg-background/60 backdrop-blur-md border-b border-divider">
           
              <h2 className="text-sm font-medium">节点列表</h2>
              

            </div>
            <div className="flex-1 bg-background/40 overflow-hidden">
              <NodeCardPanel onOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </div>

        <div className="h-[70%] flex flex-col">
          <div className="px-4 py-2 bg-background/60 backdrop-blur-md border-b border-divider">
            <h2 className="text-sm font-medium">思维导图</h2>
          </div>
          <div className="flex-1 bg-background/20">
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
