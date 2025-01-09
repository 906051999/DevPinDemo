import { useState, useEffect } from 'react';
import { Modal, Input, Button, Divider, Typography, Form } from 'antd';
import { Node } from '@/types/node';
import { useNodes } from '@/contexts/NodesContext';
import { RobotOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

interface NodeDialogProps {
  nodeId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NodeDialog({ nodeId, isOpen, onClose }: NodeDialogProps) {
  const { nodes, updateNode, deleteNode } = useNodes();
  const [node, setNode] = useState<Node | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen && nodeId) {
      const currentNode = nodes.find(n => n.id === nodeId);
      if (currentNode) {
        setNode(currentNode);
        form.setFieldsValue({
          title: currentNode.title,
          content: currentNode.content,
          generateTitle: currentNode.generateTitle,
          generateContent: currentNode.generateContent
        });
      }
    } else {
      setIsEditing(false);
    }
  }, [nodeId, isOpen, nodes, form]);

  const handleSave = async () => {
    if (!node) return;
    
    try {
      const values = await form.validateFields();
      await updateNode(node.id, values);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save node:', error);
    }
  };

  const handleCancel = () => {
    if (!node) return;
    form.setFieldsValue({
      title: node.title,
      content: node.content,
      generateTitle: node.generateTitle,
      generateContent: node.generateContent
    });
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
        open={isOpen} 
        onCancel={onClose}
        width={800}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <span>节点详情</span>
            {(node?.generateTitle || node?.generateContent) && (
              <RobotOutlined className="text-primary" />
            )}
          </div>
        }
        className="bg-background/80 backdrop-blur"
      >
        <Form
          form={form}
          layout="vertical"
          disabled={!isEditing}
        >
          <div className="space-y-6">
            <Form.Item
              name="title"
              label="标题"
            >
              <Input />
            </Form.Item>

            {node?.generateTitle && (
              <Form.Item
                name="generateTitle"
                label="AI 标题"
              >
                <Input />
              </Form.Item>
            )}
            
            <Form.Item
              name="content"
              label="内容"
            >
              <TextArea rows={4} />
            </Form.Item>

            {node?.generateContent && (
              <Form.Item
                name="generateContent"
                label="AI 内容"
              >
                <TextArea rows={6} />
              </Form.Item>
            )}

            <Divider />
            
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="序号">
                <Input value={node.sequence} readOnly />
              </Form.Item>
              <Form.Item label="级别">
                <Input value={node.level.toString()} readOnly />
              </Form.Item>
              <Form.Item label="创建时间">
                <Input value={new Date(node.createdAt).toLocaleString()} readOnly />
              </Form.Item>
              <Form.Item label="更新时间">
                <Input value={new Date(node.updatedAt).toLocaleString()} readOnly />
              </Form.Item>
            </div>
            
            <Form.Item label="UUID">
              <Input value={node.id} readOnly />
            </Form.Item>
          </div>
        </Form>

        <div className="flex justify-between mt-6">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleCancel}>
                  取消
                </Button>
                <Button type="primary" onClick={handleSave}>
                  保存
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)}>
                编辑
              </Button>
            )}
          </div>
          {isEditing && (
            <Button danger onClick={() => setShowDeleteConfirm(true)}>
              删除
            </Button>
          )}
        </div>
      </Modal>

      <Modal
        title="确认删除"
        open={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowDeleteConfirm(false)}>
            取消
          </Button>,
          <Button key="delete" danger onClick={handleDelete}>
            删除
          </Button>
        ]}
      >
        <p className="text-gray-500">
          确定要删除这个节点吗？此操作将同时删除所有子节点，且不可恢复。
        </p>
      </Modal>
    </>
  );
} 