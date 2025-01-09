'use client';

import { NavbarComponent } from '@/components/Navbar';
import { ChatSelect } from '@/components/chat/ChatSelect';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { useNodes } from '@/contexts/NodesContext';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Node } from '@/types/node';
import { ChatMessage, ChatUser } from '@/types/message';
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;

// 模拟当前用户
const currentUser: ChatUser = {
  id: uuidv4(),
  name: '测试用户',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
};

export default function ChatPage() {
  const { updateNode, nodes } = useNodes();
  const [selectedProject, setSelectedProject] = useState<Node | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Node | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  // 从cookie读取nodeId并自动选中节点
  useEffect(() => {
    const nodeId = document.cookie
      .split('; ')
      .find(row => row.startsWith('nodeId='))
      ?.split('=')[1];

    if (nodeId && nodes.length > 0) {
      const targetNode = nodes.find(n => n.id === nodeId);
      if (targetNode) {
        // 如果是子节点，先找到其父节点
        if (targetNode.level > 0) {
          const parentSequence = targetNode.sequence.split('.').slice(0, 1).join('.');
          const parentNode = nodes.find(n => n.sequence === parentSequence);
          if (parentNode) {
            setSelectedProject(parentNode);
            setSelectedTopic(targetNode);
          }
        } else {
          // 如果是项目节点，直接选中
          setSelectedProject(targetNode);
          setSelectedTopic(targetNode);
        }
      }
      // 清除cookie
      document.cookie = 'nodeId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }, [nodes]);

  const handleSelect = (project: Node | null, topic: Node | null) => {
    setSelectedProject(project);
    setSelectedTopic(topic);
  };

  const handleMessageSend = async (message: string) => {
    if (!selectedProject) return;

    const targetNode = selectedTopic || selectedProject;
    const currentHistory = (targetNode.chatHistory || []) as ChatMessage[];

    const newMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      role: 'user',
      createAt: Date.now(),
      nodeId: targetNode.id,
      nodeTitle: targetNode.title,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      isAI: false,
      meta: {
        avatar: currentUser.avatar,
        name: currentUser.name,
      }
    };

    const updatedHistory = [...currentHistory, newMessage];

    // 立即更新本地消息状态
    setLocalMessages(updatedHistory);

    // 更新数据库
    await updateNode(targetNode.id, {
      chatHistory: updatedHistory
    });

    // 更新选中的节点状态
    const updatedNode = nodes.find(n => n.id === targetNode.id);
    if (updatedNode) {
      if (targetNode.level > 0) {
        setSelectedTopic(updatedNode);
      } else {
        setSelectedProject(updatedNode);
      }
    }
  };

  // 当选中节点变化时，更新本地消息
  useEffect(() => {
    const targetNode = selectedTopic || selectedProject;
    if (targetNode) {
      setLocalMessages(targetNode.chatHistory || []);
    } else {
      setLocalMessages([]);
    }
  }, [selectedProject, selectedTopic]);

  const formatMessages = (node: Node | null): ChatMessage[] => {
    if (!node) return [];
    
    // 如果是根节点，获取所有子节点的消息
    if (node.level === 0) {
      const allMessages = nodes
        .filter(n => n.sequence.startsWith(node.sequence))
        .flatMap(n => n.chatHistory || []) as ChatMessage[];

      return allMessages.map(msg => ({
        ...msg,
        createAt: typeof msg.createAt === 'string' ? 
          new Date(msg.createAt).getTime() : 
          msg.createAt,
        meta: {
          avatar: msg.userAvatar,
          name: msg.userName,
        }
      }));
    }
    
    // 非根节点只返回当前节点的消息
    return (node.chatHistory as ChatMessage[]).map(msg => ({
      ...msg,
      createAt: typeof msg.createAt === 'string' ? 
        new Date(msg.createAt).getTime() : 
        msg.createAt,
      meta: {
        avatar: msg.userAvatar,
        name: msg.userName,
      }
    }));
  };

  return (
    <Layout className="h-screen pt-16">
      <NavbarComponent />
      
      <Layout className="h-full">
        <ChatSelect 
          onSelect={handleSelect} 
          initialProject={selectedProject}
          initialTopic={selectedTopic}
        />
        
        <Content className="bg-background">
          <ChatRoom 
            messages={localMessages}
            currentNode={selectedTopic || selectedProject}
            onSend={handleMessageSend}
          />
        </Content>
      </Layout>
    </Layout>
  );
} 