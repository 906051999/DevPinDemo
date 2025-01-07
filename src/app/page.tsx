'use client';

import { ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import NodeMindMap from '@/components/NodeMindMap';
import NodeCardPanel from '@/components/NodeCardPanel';
import NodeDialog from '@/components/NodeDialog';
import { NodesProvider } from '@/contexts/NodesContext';

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
      <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="h-[30%] border-b border-white/20">
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border-b border-white/20">
              <h2 className="text-sm font-medium">节点列表</h2>
            </div>
            <div className="flex-1 acrylic bg-white/70 overflow-hidden">
              <NodeCardPanel onOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </div>

        <div className="h-[70%] flex flex-col">
          <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border-b border-white/20">
            <h2 className="text-sm font-medium">思维导图</h2>
          </div>
          <div className="flex-1 bg-white/40">
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
