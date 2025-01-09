'use client';

import { Layout, Menu, Button } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import { 
  RobotOutlined, 
  ForkOutlined, 
  MessageOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { useCallback } from 'react';

const { Header } = Layout;

export function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark, setIsDark } = useTheme();

  const handleThemeToggle = useCallback(() => {
    setIsDark(prev => !prev);
  }, [setIsDark]);

  const navItems = [
    { 
      key: '/generate', 
      icon: <RobotOutlined />, 
      label: '智能规划',
    },
    { 
      key: '/kanban', 
      icon: <ForkOutlined />, 
      label: '思维导图',
    },
    { 
      key: '/chat', 
      icon: <MessageOutlined />, 
      label: '项目聊天',
    },
  ];

  return (
    <Header 
      className="fixed top-0 w-full z-10 flex items-center justify-between px-4"
      style={{ 
        background: 'transparent',
        backdropFilter: 'blur(30px)',
        height: 'auto',
      }}
    >
      <div className="flex-1 flex">
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={navItems}
          onClick={({ key }) => router.push(key)}
          style={{ 
            background: 'transparent',
            borderBottom: 'none',
            width: '100%',
          }}
          overflowedIndicator={null}
        />
      </div>

      <Button
        type="text"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={handleThemeToggle}
      />
    </Header>
  );
} 