'use client';

import { ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import NodeMindMap from '@/components/NodeMindMap';
import NodeCardPanel from '@/components/NodeCardPanel';
import NodeDialog from '@/components/NodeDialog';
import { NodesProvider } from '@/contexts/NodesContext';

export default function Home() {
  const [dialogNodeId, setDialogNodeId] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const handleOpenDialog = (nodeId: string) => {
    setDialogNodeId(nodeId);
  };

  const handleCloseDialog = () => {
    setDialogNodeId(null);
  };

  return (
    <NodesProvider>
      <div className="w-screen h-screen flex flex-col bg-background/80">
        <div className="h-[30%] border-b border-divider">
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 flex justify-between items-center bg-background/60 backdrop-blur-md border-b border-divider">
              <h2 className="text-sm font-medium">节点列表</h2>
              <Button
                isIconOnly
                variant="light"
                onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="data-[hover]:bg-foreground/10"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
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
