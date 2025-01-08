import ReactFlow, { Node as FlowNode, Edge, Controls, Background, useReactFlow } from 'reactflow';
import { useNodes } from '@/contexts/NodesContext';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import React from 'react';
import dagre from 'dagre';

const nodeTypes = {
  custom: CustomNode,
};

const getLayoutedElements = (nodes: FlowNode[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 80, ranksep: 200 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 75,
        y: nodeWithPosition.y - 25,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export default function NodeMindMap() {
  const { nodes } = useNodes();
  const { fitView, setNodes: setFlowNodes } = useReactFlow();
  
  const [layoutedElements, setLayoutedElements] = React.useState(() => {
    const flowNodes = nodes.map((node) => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: { node, label: node.title },
      type: 'custom',
      draggable: true,
    }));

    const edges = nodes.map((node) => {
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

    return getLayoutedElements(flowNodes, edges);
  });

  React.useEffect(() => {
    const flowNodes = nodes.map((node) => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: { node, label: node.title },
      type: 'custom',
      draggable: true,
    }));

    const edges = nodes.map((node) => {
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

    const newLayouted = getLayoutedElements(flowNodes, edges);
    setLayoutedElements(newLayouted);
    
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
      const nodePosition = newLayouted.nodes.find(n => n.id === lastNode.id)?.position;
      if (nodePosition) {
        setTimeout(() => {
          fitView({ 
            duration: 800, 
            padding: 0.5,
            nodes: [{ id: lastNode.id, position: nodePosition }]
          });
        }, 50);
      }
    }
  }, [nodes]);

  React.useEffect(() => {
    const handleNodeSelected = (e: CustomEvent) => {
      const nodeId = e.detail.nodeId;
      const selectedNode = layoutedElements.nodes.find(n => n.id === nodeId);
      if (selectedNode) {
        fitView({ 
          duration: 800, 
          padding: 0.5,
          nodes: [{ id: nodeId, position: selectedNode.position }]
        });
      }
    };

    window.addEventListener('node-selected', handleNodeSelected as EventListener);
    return () => {
      window.removeEventListener('node-selected', handleNodeSelected as EventListener);
    };
  }, [layoutedElements.nodes, fitView]);

  const handleNodeClick = (_, node) => {
    const customEvent = new CustomEvent('node-selected', { 
      detail: { nodeId: node.id }
    });
    window.dispatchEvent(customEvent);
  };

  const handleLayout = () => {
    fitView({ duration: 500, padding: 0.2 });
  };

  return (
    <div className="h-full relative">
      <button onClick={handleLayout} className="absolute top-4 right-4 z-10 px-4 py-2 rounded-lg
                   bg-white/70 backdrop-blur-md border border-white/30
                   hover:bg-white/80 transition-all duration-200">
        整理布局
      </button>
      <ReactFlow
        nodes={layoutedElements.nodes}
        edges={layoutedElements.edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
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
