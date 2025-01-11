'use client';

import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

import ProjectBrowse from './demos/ProjectBrowse';
import ProjectSuggestion from './demos/ProjectSuggestion';
import ProjectDevelopment from './demos/ProjectDevelopment';
import ProjectDiscussion from './demos/ProjectDiscussion';
import ProjectImplementation from './demos/ProjectImplementation';
import ProjectMonitoring from './demos/ProjectMonitoring';
import ProjectMindMap from './demos/ProjectMindMap';
import ProjectInspiration from './demos/ProjectInspiration';
import ProjectPlanning from './demos/ProjectPlanning';
import ProjectHub from './demos/ProjectHub';


export default function DemoScenes() {
  const [activeKey, setActiveKey] = useState('inspiration');

  const items: TabsProps['items'] = [
    {
      key: 'inspiration',
      label: (
        <span>
          1. 灵感孵化 <ArrowRightOutlined className="text-blue-500 animate-pulse" />
        </span>
      ),
      children: <ProjectInspiration />,
    },
    {
      key: 'discussion',
      label: (
        <span>
          2. 讨论交流 <ArrowRightOutlined className="text-blue-500 animate-pulse" />
        </span>
      ),
      children: <ProjectDiscussion />,
    },
    {
      key: 'planning',
      label: (
        <span>
          3. 项目规划 <ArrowRightOutlined className="text-blue-500 animate-pulse" />
        </span>
      ),
      children: <ProjectPlanning />,
    },
    {
      key: 'implementation',
      label: (
        <span>
          4. 项目实现 <ArrowRightOutlined className="text-blue-500 animate-pulse" />
        </span>
      ),
      children: <ProjectImplementation />,
    },
    {
      key: 'browse',
      label: "5. 项目展示",
      children: <ProjectHub />,
    },
  ];

  const getNextTabInfo = () => {
    const keys = items.map(item => item.key);
    const labels = items.map(item => {
      const labelText = typeof item.label === 'object' 
        ? (item.label as any)?.props?.children[0]
        : item.label;
      return labelText?.toString().split('.')[1]?.trim() || '';
    });
    
    const currentIndex = keys.indexOf(activeKey);
    if (currentIndex < keys.length - 1) {
      return {
        key: keys[currentIndex + 1],
        label: labels[currentIndex + 1]
      };
    }
    return null;
  };

  const nextTab = () => {
    const next = getNextTabInfo();
    if (next) {
      setActiveKey(next.key);
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        items={items}
        className="mt-8"
        onChange={(key) => setActiveKey(key)}
      />
      
      {activeKey !== 'browse' && (
        <div className="flex justify-end mt-4">
          <Button 
            type="primary"
            onClick={nextTab}
            className="flex items-center gap-2 text-lg"
          >
            前往: {getNextTabInfo()?.label} <ArrowRightOutlined />
          </Button>
        </div>
      )}
    </div>
  );
} 