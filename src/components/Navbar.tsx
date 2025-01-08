'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { MonitorSmartphone, GitFork, MessageSquareMore } from 'lucide-react';

export function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { path: '/generate', icon: MonitorSmartphone, label: '智能规划' },
    { path: '/kanban', icon: GitFork, label: '思维导图' },
    { path: '/chat', icon: MessageSquareMore, label: '项目聊天' },
  ];

  return (
    <Navbar 
      isBordered 
      className="fixed top-0 w-full"
      maxWidth="full"
    >
      <NavbarContent className="gap-2 sm:gap-4" justify="center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <NavbarItem key={item.path} isActive={isActive}>
              <Button
                variant={isActive ? "solid" : "light"}
                onClick={() => router.push(item.path)}
                className="gap-2"
                size="sm"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="data-[hover]:bg-foreground/10"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 