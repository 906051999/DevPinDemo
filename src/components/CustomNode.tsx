import { Handle, Position, useReactFlow } from 'reactflow';
import { Node } from '@/types/node';
import { useNodes } from '@/contexts/NodesContext';


interface CustomNodeProps {
  data: { node: Node; label: string };
}

export default function CustomNode({ data }: CustomNodeProps) {
  const { nodes, setNodes, createNode } = useNodes();
  const { setCenter } = useReactFlow();
  
  const addNode = async (isChild: boolean) => {
    const parentSequence = isChild ? data.node.sequence : data.node.sequence.split('.').slice(0, -1).join('.');
    await createNode(parentSequence, isChild ? data.node.level + 1 : data.node.level);
  };

  return (
    <div className="relative group">
      <Handle type="target" position={Position.Left} 
              className="w-3 h-3 !bg-[var(--accent)] !border-white/50" />
      
      <div className="px-4 py-2 rounded-lg min-w-[120px] text-center
                    bg-white/70 backdrop-blur-md border border-white/30
                    shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                    hover:bg-white/80 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]
                    transition-all duration-200">
        {data.label}
        
        {/* 悬停时的光效 */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100
                      bg-gradient-to-r from-blue-100/30 to-purple-100/30
                      blur-xl transition-opacity duration-500" />
      </div>
      
      <Handle type="source" position={Position.Right} 
              className="w-3 h-3 !bg-[var(--accent)] !border-white/50" />
      
      <button
        onClick={() => addNode(true)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 p-2
                 rounded-full bg-white/70 backdrop-blur-md
                 border border-white/30 shadow-sm
                 opacity-0 group-hover:opacity-100
                 hover:bg-white/80 transition-all duration-200"
        title="添加子节点"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {data.node.level > 0 && (
        <button
          onClick={() => addNode(false)}
          className="absolute left-1/2 -bottom-8 -translate-x-1/2 p-1.5 rounded-full
                   bg-[var(--surface)] border border-[var(--border)] shadow-sm
                   opacity-0 group-hover:opacity-100 transition-all duration-200
                   hover:bg-[var(--surface-hover)]"
          title="添加同级节点"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
} 