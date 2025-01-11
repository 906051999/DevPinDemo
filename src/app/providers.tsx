'use client'

import { ConfigProvider, theme, Layout } from 'antd';
import { createContext, useContext, useState } from 'react';
import { NavbarComponent } from "@/components/Navbar";
import { NodesProvider } from '@/contexts/NodesContext';


// 创建主题上下文
interface ThemeContextType {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
          },
        }}
      >
        <NodesProvider>
          <NavbarComponent />
          <Layout className="min-h-screen">
            <Layout.Content className="pt-16">
            {children}
            </Layout.Content>
          </Layout>
        </NodesProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

// 导出主题 hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 