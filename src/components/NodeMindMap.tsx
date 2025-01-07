import ReactFlow, { Node as FlowNode, Edge, Controls, Background } from 'reactflow';
import { useNodes } from '@/contexts/NodesContext';
import CustomNode from './CustomNode';
import { calculateNodePosition } from '@/utils/layout';
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

export default function NodeMindMap() {
  const { nodes } = useNodes();
  
  const flowNodes: FlowNode[] = nodes.map((node) => ({
    id: node.id,
    position: calculateNodePosition(node, nodes),
    data: { node, label: node.title },
    type: 'custom',
  }));

  const edges: Edge[] = nodes.map((node) => {
    if (node.level === 0) return null;
    const parentSequence = node.sequence.split('.').slice(0, -1).join('.');
    const parent = nodes.find(n => n.sequence === parentSequence);
    return parent ? {
      id: `${parent.id}-${node.id}`,
      source: parent.id,
      target: node.id,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#999' },
    } : null;
  }).filter(Boolean);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
