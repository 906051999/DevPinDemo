'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { Node } from '@/types/node';
import { v4 as uuidv4 } from 'uuid';

interface NodesContextType {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  createNode: (parentSequence: string, level: number) => Promise<Node>;
  createGenerateNode: (parentSequence: string, level: number, nodeData: Partial<Node>) => Promise<Node>;
  updateNode: (nodeId: string, updates: Partial<Node>) => Promise<void>;
  deleteNode: (nodeId: string) => Promise<void>;
}

const NodesContext = createContext<NodesContextType | null>(null);

export function NodesProvider({ children }) {
  const [nodes, setNodes] = useState<Node[]>([]);

  const createNode = async (parentSequence: string, level: number) => {
    const siblingNodes = nodes.filter(n => 
      n.sequence.startsWith(parentSequence + '.')
      && n.sequence.split('.').length === level + 1
    );
    
    const newNode: Node = {
      id: uuidv4(),
      sequence: `${parentSequence}.${siblingNodes.length + 1}`,
      level,
      title: '节点' + `${parentSequence}.${siblingNodes.length + 1}`,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generateTitle: '',
      generateContent: '',
      number: nodes.length,
      chatHistory: []
    };

    await db.saveNode(newNode);
    setNodes([...nodes, newNode]);

    setTimeout(() => {
      const customEvent = new CustomEvent('node-selected', { 
        detail: { nodeId: newNode.id }
      });
      window.dispatchEvent(customEvent);
    }, 100);

    return newNode;
  };

  const createGenerateNode = async (parentSequence: string, level: number, nodeData: Partial<Node>) => {
    const siblingNodes = nodes.filter(n => 
      n.sequence.startsWith(parentSequence + '.') 
      && n.sequence.split('.').length === level + 1
    );
    
    const newNode: Node = {
      id: uuidv4(),
      sequence: nodeData.sequence || `${parentSequence}.${siblingNodes.length + 1}`,
      level,
      title: nodeData.title || '节点' + `${parentSequence}.${siblingNodes.length + 1}`,
      content: nodeData.content || '',
      generateTitle: nodeData.generateTitle || '',
      generateContent: nodeData.generateContent || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: nodeData.number ?? nodes.length,
      chatHistory: []
    };

    await db.saveNode(newNode);
    setNodes([...nodes, newNode]);

    setTimeout(() => {
      const customEvent = new CustomEvent('node-selected', { 
        detail: { nodeId: newNode.id }
      });
      window.dispatchEvent(customEvent);
    }, 100);

    return newNode;
  };

  const updateNode = async (nodeId: string, updates: Partial<Node>) => {
    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    const updatedNode = {
      ...nodes[nodeIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await db.updateNode(updatedNode);
    const newNodes = [...nodes];
    newNodes[nodeIndex] = updatedNode;
    setNodes(newNodes);
  };

  const deleteNode = async (nodeId: string) => {
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    // 删除所有子节点
    const nodesToDelete = nodes.filter(n => 
      n.sequence.startsWith(nodeToDelete.sequence + '.')
      || n.id === nodeId
    );

    for (const node of nodesToDelete) {
      await db.deleteNode(node.id);
    }

    setNodes(nodes.filter(n => !nodesToDelete.some(d => d.id === n.id)));
  };

  useEffect(() => {
    let mounted = true;

    const loadNodes = async () => {
      const data = await db.getAllNodes();
      if (!mounted) return;
      
      if (data.length === 0) {
        const root: Node = {
          id: uuidv4(),
          sequence: '1',
          level: 0,
          title: '根节点',
          content: '这是一个根节点',
          number: 0,
          chatHistory: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          generateTitle: '',
          generateContent: ''
        };
        await db.saveNode(root);
        setNodes([root]);
      } else {
        setNodes(data);
      }
    };

    loadNodes();
    return () => { mounted = false };
  }, []);

  return (
    <NodesContext.Provider value={{ 
      nodes, 
      setNodes, 
      createNode, 
      createGenerateNode,
      updateNode, 
      deleteNode 
    }}>
      {children}
    </NodesContext.Provider>
  );
}

export const useNodes = () => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error('useNodes must be used within a NodesProvider');
  }
  return context;
}; 