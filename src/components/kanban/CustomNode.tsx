import { Handle, Position, useReactFlow } from 'reactflow';
import { Node } from '@/types/node';
import { useNodes } from '@/contexts/NodesContext';
import { PlusOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import React from 'react';

interface CustomNodeProps {
  data: { node: Node; label: string };
}

export default function CustomNode({ data }: CustomNodeProps) {
  const { nodes, setNodes, createNode } = useNodes();
  const { setCenter } = useReactFlow();
  const [isSelected, setIsSelected] = React.useState(false);
  const { token } = theme.useToken();
  
  const addNode = async (isChild: boolean) => {
    const parentSequence = isChild ? data.node.sequence : data.node.sequence.split('.').slice(0, -1).join('.');
    await createNode(parentSequence, isChild ? data.node.level + 1 : data.node.level);
  };

  React.useEffect(() => {
    const handleNodeSelected = (e: CustomEvent) => {
      setIsSelected(e.detail.nodeId === data.node.id);
    };

    window.addEventListener('node-selected', handleNodeSelected as EventListener);
    return () => {
      window.removeEventListener('node-selected', handleNodeSelected as EventListener);
    };
  }, [data.node.id]);

  const handleStyles = {
    width: '12px',
    height: '12px',
    background: token.colorPrimary,
    border: `2px solid ${token.colorBorderSecondary}`,
  };

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        style={handleStyles}
      />
      
      <div 
        className="px-4 py-2 rounded-lg min-w-[120px] text-center transition-all duration-200"
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: token.boxShadow,
          backdropFilter: 'blur(8px)',
          ...(isSelected && {
            outline: `2px solid ${token.colorPrimary}`,
            outlineOffset: '2px',
          }),
        }}
      >
        {data.label}
        
        {/* 悬停时的光效 */}
        <div 
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{
            background: `linear-gradient(to right, ${token.colorPrimaryBg}, ${token.colorInfoBg})`,
          }}
        />
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={handleStyles}
      />
      
      <button
        onClick={() => addNode(true)}
        className="absolute -right-12 top-1/2 -translate-y-1/2 p-2
                 rounded-full opacity-0 group-hover:opacity-100
                 transition-all duration-200"
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: token.boxShadowSecondary,
          backdropFilter: 'blur(8px)',
        }}
        title="添加子节点"
      >
        <PlusOutlined style={{ fontSize: '16px' }} />
      </button>

      {data.node.level > 0 && (
        <button
          onClick={() => addNode(false)}
          className="absolute left-1/2 -bottom-12 -translate-x-1/2 p-1.5 
                   rounded-full opacity-0 group-hover:opacity-100 
                   transition-all duration-200"
          style={{
            background: token.colorBgContainer,
            border: `1px solid ${token.colorBorderSecondary}`,
            boxShadow: token.boxShadowSecondary,
          }}
          title="添加同级节点"
        >
          <PlusOutlined style={{ fontSize: '16px' }} />
        </button>
      )}
    </div>
  );
} 