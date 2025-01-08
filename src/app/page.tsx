'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button} from '@nextui-org/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { BotIcon, GitFork, MessageSquareMore } from 'lucide-react';
import { NavbarComponent } from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-screen min-h-screen bg-background text-foreground flex flex-col items-center px-4">
     
      {/* 顶部导航 */}
      <nav className="w-full max-w-7xl flex justify-between items-center py-4">
        <div className="text-xl font-bold">DevPin</div>
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="data-[hover]:bg-foreground/10"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          <a href="https://github.com/MindMorbius/DevPinDemo" 
             className="flex items-center gap-2 text-default-500 hover:text-foreground transition-colors"
             target="_blank"
             rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="w-full max-w-7xl flex-1 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">DevPin <span className="text-2xl font-normal text-gray-300">Demo</span></h1>
          <p className="text-xl text-default-500">就一个要求，好用到想哭</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* AI拆解 */}
          <button 
  onClick={() => router.push('/generate')}
  className="group relative bg-content1/60 p-8 rounded-lg hover:bg-content2/80 
    transition-all duration-300 shadow-lg hover:shadow-xl"
>
  <div className="mb-4">
    <BotIcon className="w-8 h-8" />
  </div>
            <h3 className="text-xl font-semibold mb-2">智能项目规划</h3>
            <p className="text-default-500 text-sm">使用AI优化项目需求，自动拆解项目子节点</p>
          </button>

          {/* 思维导图看板 */}
          <button 
  onClick={() => router.push('/kanban')}
  className="group relative bg-content1/60 p-8 rounded-lg hover:bg-content2/80 
    transition-all duration-300 shadow-lg hover:shadow-xl"
>
  <div className="mb-4">
    <GitFork className="w-8 h-8" />
  </div>
            <h3 className="text-xl font-semibold mb-2">思维导图看板</h3>
            <p className="text-default-500 text-sm">直观展示项目结构，通过思维导图触发灵感，以节点为单位进行任务追踪</p>
          </button>

          {/* 聊天室 */}
          <button 
  onClick={() => router.push('/chat')}
  className="group relative bg-content1/60 p-8 rounded-lg hover:bg-content2/80 
    transition-all duration-300 shadow-lg hover:shadow-xl"
>
  <div className="mb-4">
    <MessageSquareMore className="w-8 h-8" />
  </div>
            <h3 className="text-xl font-semibold mb-2">项目节点聊天</h3>
            <p className="text-default-500 text-sm">以项目为房间，以节点为聊天话题，精确的讨论项目细节，与项目元素保持零距离</p>
          </button>
        </div>
      </main>

      {/* 底部版权 */}
      <footer className="w-full max-w-7xl py-8 text-center text-default-500 text-sm">
        © 2025 MindMorbius. All rights reserved.
      </footer>
    </div>
  );
}