'use client';

import { Layout, Menu, Button } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import { 
  RobotOutlined, 
  ForkOutlined, 
  MessageOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  ProjectOutlined
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
    // { 
    //   key: '/generate', 
    //   icon: <RobotOutlined />, 
    //   label: '智能规划',
    // },
    // { 
    //   key: '/kanban', 
    //   icon: <ForkOutlined />, 
    //   label: '思维导图',
    // },
    // { 
    //   key: '/chat', 
    //   icon: <MessageOutlined />, 
    //   label: '项目聊天',
    // },
    // { 
    //   key: '/project',
    //   icon: <ProjectOutlined />,
    //   label: 'DevPinDemo',
    // },
    { 
      key: '/IM',
      icon: <MessageOutlined />,
      label: 'DevIM',
    },
  ];

  return (
    <Header 
      className="fixed top-0 w-full z-10 flex items-center justify-between px-4"
      style={{ 
        background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
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
          className={isDark ? 'ant-menu-dark' : ''}
          overflowedIndicator={null}
        />
      </div>

      <Button
        type="text"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={handleThemeToggle}
        className={isDark ? 'text-white' : 'text-black'}
      />
      <Button 
        type="text" 
        icon={<HomeOutlined />} 
        onClick={() => router.push('/')}
        className={isDark ? 'text-white' : 'text-black'}
      />
    </Header>
  );
} 