'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProjectBrowse from './demos/ProjectBrowse';
import ProjectSuggestion from './demos/ProjectSuggestion';
import ProjectDevelopment from './demos/ProjectDevelopment';
import ProjectDiscussion from './demos/ProjectDiscussion';
import ProjectImplementation from './demos/ProjectImplementation';
import ProjectMonitoring from './demos/ProjectMonitoring';
import ProjectMindMap from './demos/ProjectMindMap';


export default function DemoScenes() {
  const items: TabsProps['items'] = [
    {
      key: 'browse',
      label: '项目浏览体验',
      children: <ProjectBrowse />,
    },
    {
      key: 'suggestion',
      label: '优化建议体验',
      children: <ProjectSuggestion />,
    },
    {
      key: 'development',
      label: '开发参与体验',
      children: <ProjectDevelopment />,
    },
    {
      key: 'discussion',
      label: '讨论交流体验',
      children: <ProjectDiscussion />,
    },
    {
      key: 'implementation',
      label: '项目实现体验',
      children: <ProjectImplementation />,
    },
    {
      key: 'monitoring',
      label: '项目监控体验',
      children: <ProjectMonitoring />,
    },
    {
      key: 'mindmap',
      label: '项目思维图体验',
      children: <ProjectMindMap />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="browse"
      items={items}
      className="mt-8"
    />
  );
} 