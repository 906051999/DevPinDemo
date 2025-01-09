'use client';

import { useNodes } from '@/contexts/NodesContext';
import { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Tree } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Node } from '@/types/node';
import type { DataNode } from 'antd/es/tree';

const { Sider } = Layout;

interface ChatSelectProps {
  onSelect: (project: Node | null, topic: Node | null) => void;
  initialProject?: Node | null;
  initialTopic?: Node | null;
}

export function ChatSelect({ onSelect, initialProject, initialTopic }: ChatSelectProps) {
  const { nodes } = useNodes();
  const { token } = theme.useToken();
  const [projectsCollapsed, setProjectsCollapsed] = useState(false);
  const [topicsCollapsed, setTopicsCollapsed] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Node | null>(initialProject || null);
  const [selectedTopic, setSelectedTopic] = useState<Node | null>(initialTopic || null);

  useEffect(() => {
    if (initialProject) {
      setSelectedProject(initialProject);
    }
    if (initialTopic) {
      setSelectedTopic(initialTopic);
    }
  }, [initialProject, initialTopic]);

  // 获取所有顶级项目
  const projects = nodes.filter(node => node.level === 0);

  // 获取项目下的直接子节点
  const getChildNodes = (parentNode: Node): Node[] => {
    const parentSeqLength = parentNode.sequence.split('.').length;
    return nodes.filter(node => {
      const seqParts = node.sequence.split('.');
      return seqParts.length === parentSeqLength + 1 && 
             node.sequence.startsWith(parentNode.sequence + '.');
    });
  };

  // 递归构建树结构
  const buildTreeNode = (node: Node): DataNode => ({
    key: node.id,
    title: `${node.sequence}. ${node.title}`,
    children: getChildNodes(node).map(buildTreeNode)
  });

  const topicTreeData = selectedProject ? [buildTreeNode(selectedProject)] : [];

  const handleProjectSelect = (project: Node) => {
    setSelectedProject(project);
    setSelectedTopic(project);
    onSelect(project, project);
  };

  const handleTopicSelect = (topic: Node) => {
    setSelectedTopic(topic);
    onSelect(selectedProject, topic);
  };

  // 获取当前项目下的所有话题
  const getTopics = (projectNode: Node | null): Node[] => {
    if (!projectNode) return [];
    return nodes.filter(node => 
      node.level > 0 && 
      node.sequence.startsWith(projectNode.sequence)
    ).sort((a, b) => a.sequence.localeCompare(b.sequence));
  };

  const topics = getTopics(selectedProject);

  return (
    <div className="h-full flex">
      {/* 项目列表 Sider */}
      <Sider 
        width={140} 
        collapsed={projectsCollapsed}
        collapsedWidth={48}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <span 
              className={projectsCollapsed ? 'hidden' : 'text-sm font-medium'}
              style={{ color: token.colorText }}
            >
              项目列表
            </span>
            <Button 
              type="text"
              icon={projectsCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setProjectsCollapsed(!projectsCollapsed)}
            />
          </div>

          <Menu
            mode="inline"
            style={{ 
              background: 'transparent',
              width: projectsCollapsed ? 48 : 140 
            }}
            selectedKeys={[selectedProject?.id || '']}
            items={projects.map(project => ({
              key: project.id,
              label: project.title,
              onClick: () => handleProjectSelect(project)
            }))}
          />
        </div>
      </Sider>

      {/* 话题列表 Sider */}
      <Sider 
        width={240} 
        collapsed={topicsCollapsed}
        collapsedWidth={48}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <span 
              className={topicsCollapsed ? 'hidden' : 'text-sm font-medium'}
              style={{ color: token.colorText }}
            >
              话题树
            </span>
            <Button 
              type="text"
              icon={topicsCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setTopicsCollapsed(!topicsCollapsed)}
            />
          </div>

          {selectedProject && (
            <div className="flex-1 overflow-auto">
              {topicsCollapsed ? (
                <Menu
                  mode="inline"
                  style={{ 
                    background: 'transparent',
                    width: 48 
                  }}
                  selectedKeys={[selectedTopic?.id || '']}
                  items={[
                    {
                      key: selectedProject.id,
                      label: selectedProject.number + '. ' + selectedProject.title,
                      onClick: () => handleTopicSelect(selectedProject)
                    },
                    ...topics.map(topic => ({
                      key: topic.id,
                      label: topic.number + '. ' + topic.title,
                      onClick: () => handleTopicSelect(topic)
                    }))
                  ]}
                />
              ) : (
                <Tree
                  style={{ 
                    background: 'transparent',
                    width: 240
                  }}
                  defaultExpandAll={true}
                  treeData={topicTreeData}
                  selectedKeys={[selectedTopic?.id || '']}
                  onSelect={(keys) => {
                    const topicId = keys[0]?.toString();
                    const topic = nodes.find(n => n.id === topicId);
                    if (topic) handleTopicSelect(topic);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </Sider>
    </div>
  );
} 