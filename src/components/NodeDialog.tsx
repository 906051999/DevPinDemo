import { useState, useEffect } from 'react';
import { Node } from '@/types/node';
import { db } from '@/lib/db';
import { useNodes } from '@/contexts/NodesContext';

interface NodeDialogProps {
  nodeId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function NodeDialog({ nodeId, isOpen, onClose }: NodeDialogProps) {
  const { nodes, updateNode, deleteNode } = useNodes();
  const [node, setNode] = useState<Node | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen && nodeId) {
      const currentNode = nodes.find(n => n.id === nodeId);
      if (currentNode) {
        setNode(currentNode);
        setTitle(currentNode.title);
        setContent(currentNode.content);
      }
    } else {
      setIsEditing(false);
    }
  }, [nodeId, isOpen, nodes]);

  const handleSave = async () => {
    if (!node) return;
    
    try {
      await updateNode(node.id, {
        title,
        content
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save node:', error);
      // 这里可以添加错误提示
    }
  };

  const handleCancel = () => {
    if (!node) return;
    setTitle(node.title);
    setContent(node.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!node) return;
    try {
      await deleteNode(node.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete node:', error);
    }
  };

  if (!isOpen || !node) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50
                    transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" 
           onClick={onClose} />
      
      <div className="relative w-full max-w-[min(90vw,800px)] h-full max-h-[min(90vh,600px)] m-4
                    rounded-xl overflow-hidden bg-white/80 backdrop-blur-2xl
                    border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 left-0 right-0 z-20 
                      bg-white/70 backdrop-blur-md border-b border-white/30">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">节点详情</h2>
            <button onClick={onClose} 
                    className="p-2 rounded-full hover:bg-white/60 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 pt-[65px] pb-[73px] overflow-y-auto">
          <div className="p-6 space-y-6">

            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-secondary)]">标题</label>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40
                           focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/40">{node.title}</div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-secondary)]">内容</label>
              {isEditing ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40
                           focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/40 whitespace-pre-wrap">
                  {node.content}
                </div>
              )}
            </div>


            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-secondary)]">序号</label>
              <div className="px-4 py-2 rounded-lg bg-white/40">{node.sequence}</div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-secondary)]">级别</label>
              <div className="px-4 py-2 rounded-lg bg-white/40">{node.level}</div>
            </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">创建时间</label>
                <div className="px-4 py-2 rounded-lg bg-white/40">
                  {new Date(node.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">更新时间</label>
                <div className="px-4 py-2 rounded-lg bg-white/40">
                  {new Date(node.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-secondary)]">UUID</label>
              <div className="px-4 py-2 rounded-lg bg-white/40">{node.id}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20
                      bg-white/70 backdrop-blur-md border-t border-white/30">
          <div className="px-6 py-4 flex justify-between">
            {isEditing && (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="fluent-button !bg-red-50 hover:!bg-red-100 text-red-600"
              >
                删除
              </button>
            )}
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} 
                          className="fluent-button">
                    取消
                  </button>
                  <button onClick={handleSave} 
                          className="fluent-primary-button">
                    保存
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} 
                        className="fluent-primary-button">
                  编辑
                </button>
              )}
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-[60]">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                 onClick={() => setShowDeleteConfirm(false)} />
            
            <div className="relative w-[min(400px,90vw)] p-6 rounded-xl 
                          bg-white/90 backdrop-blur-xl border border-white/40 
                          shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <h3 className="text-lg font-semibold mb-4">确认删除</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                确定要删除这个节点吗？此操作将同时删除所有子节点，且不可恢复。
              </p>
              
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowDeleteConfirm(false)}
                        className="fluent-button">
                  取消
                </button>
                <button onClick={handleDelete}
                        className="fluent-button !bg-red-50 hover:!bg-red-100 text-red-600">
                  删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 