import { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Textarea,
  Divider
} from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Node } from '@/types/node';
import { useNodes } from '@/contexts/NodesContext';

interface NodeDialogProps {
  nodeId: string | null;
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
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete node:', error);
    }
  };

  if (!node) return null;

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        classNames={{
          backdrop: "bg-background/50 backdrop-blur-md",
          base: "border border-divider bg-background/80",
          header: "border-b border-divider",
          footer: "border-t border-divider",
          closeButton: "hover:bg-foreground/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ModalHeader className="flex flex-col gap-1">
                节点详情
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      label="标题"
                      value={isEditing ? title : node.title}
                      onChange={(e) => setTitle(e.target.value)}
                      isReadOnly={!isEditing}
                      variant="bordered"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      label="内容"
                      value={isEditing ? content : node.content}
                      onChange={(e) => setContent(e.target.value)}
                      isReadOnly={!isEditing}
                      variant="bordered"
                      minRows={4}
                    />
                  </div>

                  <Divider />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="序号"
                      value={node.sequence}
                      isReadOnly
                      variant="bordered"
                    />
                    <Input
                      label="级别"
                      value={node.level.toString()}
                      isReadOnly
                      variant="bordered"
                    />
                    <Input
                      label="创建时间"
                      value={new Date(node.createdAt).toLocaleString()}
                      isReadOnly
                      variant="bordered"
                    />
                    <Input
                      label="更新时间"
                      value={new Date(node.updatedAt).toLocaleString()}
                      isReadOnly
                      variant="bordered"
                    />
                  </div>
                  
                  <Input
                    label="UUID"
                    value={node.id}
                    isReadOnly
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          color="default"
                          variant="light"
                          onPress={handleCancel}
                        >
                          取消
                        </Button>
                        <Button
                          color="primary"
                          onPress={handleSave}
                        >
                          保存
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="primary"
                        onPress={() => setIsEditing(true)}
                      >
                        编辑
                      </Button>
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => setShowDeleteConfirm(true)}
                    >
                      删除
                    </Button>
                  )}
                </div>
              </ModalFooter>
            </motion.div>
          )}
        </ModalContent>
      </Modal>

      <Modal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)}
        size="sm"
        backdrop="blur"
        classNames={{
          backdrop: "bg-background/50 backdrop-blur-md",
          base: "border border-divider bg-background/80",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ModalHeader>确认删除</ModalHeader>
              <ModalBody>
                <p className="text-foreground-500">
                  确定要删除这个节点吗？此操作将同时删除所有子节点，且不可恢复。
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => setShowDeleteConfirm(false)}
                >
                  取消
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                >
                  删除
                </Button>
              </ModalFooter>
            </motion.div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
} 