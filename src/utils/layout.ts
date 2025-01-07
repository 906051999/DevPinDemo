export const HORIZONTAL_SPACING = 250;
export const VERTICAL_SPACING = 100;

export function calculateNodePosition(node: Node, allNodes: Node[]) {
  const level = node.level;
  const sequence = node.sequence;
  
  // 获取同级节点
  const siblings = allNodes.filter(n => 
    n.sequence.split('.').length === sequence.split('.').length &&
    n.sequence.startsWith(sequence.split('.').slice(0, -1).join('.') + '.')
  );
  
  // 计算当前节点在同级中的索引
  const index = siblings.findIndex(n => n.id === node.id);
  
  // 计算父节点的位置偏移
  const parentOffset = level > 0 ? 
    allNodes.find(n => n.sequence === sequence.split('.').slice(0, -1).join('.'))?.sequence.split('.').pop() || 0 : 
    0;
  
  return {
    x: level * HORIZONTAL_SPACING,
    y: (parseInt(parentOffset) - 1) * VERTICAL_SPACING + index * VERTICAL_SPACING
  };
} 