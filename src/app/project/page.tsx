'use client'

import { Layout, Drawer, Tree, Button, Typography, Avatar } from "antd";
import { Splitter } from "antd";
import { useState, useEffect } from "react";
import { ReactFlowProvider } from 'reactflow';
import NodeMindMap from '@/components/kanban/NodeMindMap';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { useNodes } from '@/contexts/NodesContext';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/types/message';
import { theme } from 'antd';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

// 模拟当前用户
const currentUser = {
  id: uuidv4(),
  name: '测试用户',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
};

export default function ProjectPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { nodes, updateNode } = useNodes();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const { token } = theme.useToken();

  // 监听节点选择事件
  useEffect(() => {
    const handleNodeSelected = (e: CustomEvent) => {
      const node = nodes.find(n => n.id === e.detail.nodeId);
      setSelectedNode(node || null);
      setLocalMessages(node?.chatHistory || []);
    };

    window.addEventListener('node-selected', handleNodeSelected as EventListener);
    return () => {
      window.removeEventListener('node-selected', handleNodeSelected as EventListener);
    };
  }, [nodes]);

  const handleMessageSend = async (message: string) => {
    if (!selectedNode) return;

    const newMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      role: 'user',
      createAt: Date.now(),
      nodeId: selectedNode.id,
      nodeTitle: selectedNode.title,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      isAI: false,
      meta: {
        avatar: currentUser.avatar,
        name: currentUser.name,
      }
    };

    const updatedHistory = [...(selectedNode.chatHistory || []), newMessage];
    setLocalMessages(updatedHistory);
    await updateNode(selectedNode.id, { chatHistory: updatedHistory });
  };

  // 将节点数据转换为Tree需要的格式
  const treeData = nodes.map(node => ({
    key: node.id,
    title: node.title,
    children: nodes
      .filter(child => child.sequence.startsWith(node.sequence + '.'))
      .map(child => ({
        key: child.id,
        title: child.title
      }))
  }));

  // 获取根节点
  const rootNode = nodes.find(n => n.level === 0);

  return (
    <Layout className="h-screen pt-16">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        width={280}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          left: 0,
          top: 64,
          overflow: 'auto'
        }}
      >
        {rootNode && (
          <div className="p-4">
            {!collapsed ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar 
                    size={48}
                    style={{ 
                      backgroundColor: token.colorPrimary,
                      color: token.colorWhite 
                    }}
                  >
                    {rootNode.title[0]}
                  </Avatar>
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      {rootNode.title}
                    </Title>
                    <Text type="secondary">
                      #{rootNode.sequence}
                    </Text>
                  </div>
                </div>
                <div 
                  className="mt-4 p-3 rounded" 
                  style={{ 
                    background: token.colorFillTertiary,
                  }}
                >
                  <Text type="secondary">
                    {rootNode.content || '暂无描述'}
                  </Text>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Avatar style={{ backgroundColor: token.colorPrimary }}>
                  {rootNode.title[0]}
                </Avatar>
              </div>
            )}
          </div>
        )}

        <div 
          className="mx-4 my-2" 
          style={{ 
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s'
          }}
        />

        {!collapsed && (
          <div className="px-4">
            <div className="mb-4">
              <Text type="secondary" className="text-xs uppercase">
                项目信息
              </Text>
              <div 
                className="mt-2 p-2 rounded cursor-pointer hover:bg-[rgba(0,0,0,0.03)] transition-colors"
                style={{ 
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <Text strong>创建时间</Text>
                  <Text type="secondary">
                    {new Date(rootNode.createdAt).toLocaleDateString()}
                  </Text>
                </div>
              </div>
            </div>

            <div>
              <Text type="secondary" className="text-xs uppercase">
                节点统计
              </Text>
              <div 
                className="mt-2 p-2 rounded cursor-pointer hover:bg-[rgba(0,0,0,0.03)] transition-colors"
                style={{ 
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <Text strong>总节点数</Text>
                  <Text type="secondary">{nodes.length}</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Sider>
      
      <Content style={{ marginLeft: collapsed ? 80 : 280 }}>
        <Splitter layout="vertical">
          <Splitter.Panel defaultSize="50%">
            <div className="relative h-full">
              <Button 
                className="absolute top-4 left-4 z-10"
                onClick={() => setDrawerOpen(true)}
              >
                显示节点树
              </Button>
              <ReactFlowProvider>
                <NodeMindMap />
              </ReactFlowProvider>

              <Drawer
                title="节点树"
                placement="left"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                rootStyle={{ position: 'absolute' }}
                getContainer={() => document.querySelector('.relative.h-full') as HTMLElement}
              >
                <Tree
                  treeData={treeData}
                  defaultExpandAll
                />
              </Drawer>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <ChatRoom 
              messages={localMessages}
              currentNode={selectedNode}
              onSend={handleMessageSend}
            />
          </Splitter.Panel>
        </Splitter>
      </Content>
    </Layout>
  );
}
