'use client';

import { useNodes } from '@/contexts/NodesContext';
import { NavbarComponent } from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { Node } from '@/types/node';
import { Button } from '@nextui-org/react';
import { MessageSquareMore, ChevronRight, Bot, User, Trash2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/types/message';
import { Modal, ModalContent } from "@nextui-org/react";
import '@chatui/core/dist/index.css';
import './chatui-theme.css';
import { useSearchParams } from 'next/navigation';

// 动态导入 Chat 组件，禁用 SSR
const Chat = dynamic(
  () => import('@chatui/core').then((mod) => mod.default),
  { ssr: false }
);

// 同样需要动态导入 Bubble
const Bubble = dynamic(
  () => import('@chatui/core').then((mod) => mod.Bubble),
  { ssr: false }
);

export default function ChatPage() {
  const searchParams = useSearchParams();
  const { nodes, updateNode } = useNodes();
  const [selectedProject, setSelectedProject] = useState<Node | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Node | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  // 加载聊天记录
  useEffect(() => {
    if (!selectedProject) {
      setMessages([]);
      return;
    }

    let chatHistory: ChatMessage[] = [];
    if (!selectedTopic) {
      // 在根节点时,加载所有相关节点的聊天记录
      const relevantNodes = nodes.filter(n => 
        n.sequence.startsWith(selectedProject.sequence)
      );
      relevantNodes.forEach(node => {
        const nodeMessages = (node.chatHistory || []) as ChatMessage[];
        chatHistory = [...chatHistory, ...nodeMessages];
      });
    } else {
      // 在具体话题时,只加载该话题的聊天记录
      chatHistory = (selectedTopic.chatHistory || []) as ChatMessage[];
    }
    
    // 按时间排序
    chatHistory.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setMessages(chatHistory);
  }, [selectedProject, selectedTopic]);

  // 处理 URL 参数，自动选择对应的节点
  useEffect(() => {
    const nodeId = searchParams.get('nodeId');
    if (!nodeId) return;

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    // 如果是子节点，需要先找到其根节点
    const rootSequence = node.sequence.split('.')[0];
    const rootNode = nodes.find(n => n.sequence === rootSequence);
    
    if (rootNode) {
      setSelectedProject(rootNode);
      if (node.id !== rootNode.id) {
        setSelectedTopic(node);
      }
    }
  }, [searchParams, nodes]);

  // 处理发送消息
  const handleSend = async (type: string, content: string) => {
    if (type !== 'text' || !content || !selectedProject) return;

    const newMessage: ChatMessage = {
      _id: uuidv4(),
      type: 'text',
      content,
      position: 'right',
      role: 'user',
      user: {
        name: '用户',
        avatar: 'https://api.multiavatar.com/Weeberblitz.svg',
        url: 'https://www.baidu.com'
      },
      createdAt: new Date().toISOString(),
      nodeId: selectedTopic?.id || selectedProject.id,
      nodeNumber: selectedTopic?.number || selectedProject.number,
      nodeTitle: selectedTopic?.title || selectedProject.title
    };

    // 更新UI
    setMessages(prev => [...prev, newMessage]);

    // 更新存储
    const targetNode = selectedTopic || selectedProject;
    const currentHistory = (targetNode.chatHistory || []) as ChatMessage[];
    await updateNode(targetNode.id, {
      chatHistory: [...currentHistory, newMessage]
    });

    // 模拟回复
    setTimeout(async () => {
      const replyMessage: ChatMessage = {
        _id: uuidv4(),
        type: 'text',
        content: `收到消息: ${content}`,
        position: 'left',
        role: 'assistant',
        createdAt: new Date().toISOString(),
        user: {
          name: 'AI Assistant',
          avatar: 'https://gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg',
          url: 'https://github.com/alibaba/ChatUI'
        },
        nodeId: targetNode.id,
        nodeNumber: targetNode.number,
        nodeTitle: targetNode.title
      };
      
      setMessages(prev => [...prev, replyMessage]);
      await updateNode(targetNode.id, {
        chatHistory: [...currentHistory, newMessage, replyMessage]
      });
    }, 1000);
  };

  // 自定义消息渲染
  const renderMessage = (msg: ChatMessage) => (
    <Bubble
      type={msg.type}
      content={
        <>
          {!selectedTopic && msg.nodeId !== selectedProject?.id && (
            <span className="text-xs text-default-500 mb-1 block">
              {msg.nodeNumber}. {msg.nodeTitle}
            </span>
          )}
          <span>{msg.content}</span>
        </>
      }
    />
  );

  // 获取根节点作为项目列表
  const projects = nodes.filter(node => node.level === 0);
  
  // 获取选中项目的直接子节点作为话题
  const topics = selectedProject 
    ? nodes.filter(node => 
        node.sequence.startsWith(selectedProject.sequence + '.') &&
        node.sequence.split('.').length === 2
      )
    : [];

  // 添加清空方法
  const handleClearHistory = async () => {
    if (!selectedProject) return;
    
    const targetNodes = !selectedTopic 
      ? nodes.filter(n => n.sequence.startsWith(selectedProject.sequence))
      : [selectedTopic];

    for (const node of targetNodes) {
      await updateNode(node.id, { chatHistory: [] });
    }
    
    setMessages([]);
    setClearModalOpen(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-background/80 pt-16">
      <NavbarComponent />
      
      <div className="flex-1 flex">
        {/* 项目列表侧边栏 - 添加折叠功能 */}
        <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} transition-all duration-300 border-r border-divider bg-background/60 backdrop-blur-md flex flex-col`}>
          <div className="p-4 border-b border-divider flex items-center justify-between">
            {!sidebarCollapsed && <h2 className="text-sm font-medium">项目列表</h2>}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-foreground/5 rounded-full"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full p-4 text-left hover:bg-foreground/5 transition-colors
                  ${selectedProject?.id === project.id ? 'bg-foreground/10' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquareMore className="w-5 h-5 text-default-500" />
                  {!sidebarCollapsed && (
                    <span className="font-medium truncate">{ project.generateTitle ? project.generateTitle : project.title}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 聊天区域 - 确保内容不会溢出 */}
        <div className="flex-1 flex flex-col min-w-0"> {/* 添加 min-w-0 防止溢出 */}
          {/* 话题列表和导航区域 */}
          {selectedProject && (
            <div className="border-b border-divider bg-background/60 backdrop-blur-md">
              {/* 话题列表 */}
              <div className="h-16 flex items-center px-4">
                {/* 移除固定的主话题按钮，让所有节点都在 Swiper 中 */}
                <div className="w-full overflow-hidden">
                  <Swiper
                    modules={[FreeMode]}
                    slidesPerView="auto"
                    spaceBetween={8}
                    freeMode={true}
                    className="w-full"
                  >
                    {/* 添加主话题到滑动列表 */}
                    <SwiperSlide className="!w-auto">
                      <Button
                        variant={!selectedTopic ? "solid" : "light"}
                        onClick={() => setSelectedTopic(null)}
                        size="sm"
                      >
                        {selectedProject.generateTitle ? selectedProject.generateTitle : selectedProject.title}
                      </Button>
                    </SwiperSlide>

                    {topics.map(topic => (
                      <SwiperSlide 
                        key={topic.id} 
                        className="!w-auto"
                      >
                        <Button
                          variant={selectedTopic?.id === topic.id ? "solid" : "light"}
                          onClick={() => setSelectedTopic(topic)}
                          size="sm"
                        >
                          {topic.title}
                        </Button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* 编号导航和当前话题显示 */}
              <div className="px-4 py-2 flex items-center justify-between border-t border-divider/40">
                {/* 编号导航 */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {nodes
                    .filter(n => n.sequence.startsWith(selectedProject.sequence))
                    .sort((a, b) => a.number - b.number)
                    .map(node => (
                      <Button
                        key={node.id}
                        size="sm"
                        variant={
                          (node.number === 0 && !selectedTopic) || 
                          selectedTopic?.id === node.id 
                            ? "solid" 
                            : "light"
                        }
                        onClick={() => node.number === 0 ? setSelectedTopic(null) : setSelectedTopic(node)}
                        className="min-w-[40px] h-7 px-2"
                      >
                        {node.number}
                      </Button>
                    ))
                  }
                </div>
              </div>
            </div>
          )}

          {/* 聊天内容区 */}
          <div className="flex-1 bg-background/40 flex flex-col overflow-hidden">
            {selectedProject ? (
              <>
                <div className="flex justify-end px-4 py-2 border-b border-divider">
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    startContent={<Trash2 className="w-4 h-4" />}
                    onClick={() => setClearModalOpen(true)}
                  >
                    清空对话
                  </Button>
                </div>

                <Modal 
                  isOpen={clearModalOpen} 
                  onClose={() => setClearModalOpen(false)}
                  size="sm"
                >
                  <ModalContent>
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-4">
                        确认清空对话记录？
                      </h3>
                      <p className="text-sm text-default-500 mb-6">
                        {!selectedTopic 
                          ? "这将清空当前项目及其所有子节点的对话记录" 
                          : "这将清空当前话题的对话记录"}
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="light"
                          onPress={() => setClearModalOpen(false)}
                        >
                          取消
                        </Button>
                        <Button
                          color="danger"
                          onPress={handleClearHistory}
                        >
                          确认清空
                        </Button>
                      </div>
                    </div>
                  </ModalContent>
                </Modal>

                <Chat
                  navbar={{
                    title: selectedTopic 
                      ? `${selectedTopic.number}. ${selectedTopic.title}`
                      : `${selectedProject.number}. ${selectedProject.generateTitle || selectedProject.title}`,
                  }}
                  messages={messages}
                  renderMessageContent={renderMessage}
                  onSend={handleSend}
                  placeholder="输入消息..."
                  messagesRef={(ref) => {
                    if (ref) {
                      ref.scrollTop = ref.scrollHeight;
                    }
                  }}
                  loadMoreText="加载更多"
                  quickReplies={[
                    { name: '继续', isNew: false },
                    { name: '为什么', isNew: false },
                    { name: '怎么做', isNew: false },
                  ]}
                />
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-default-500">
                选择一个项目开始聊天
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 