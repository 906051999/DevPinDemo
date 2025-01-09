'use client';

import { NodesProvider } from '@/contexts/NodesContext';
import { Layout } from 'antd';
import { NavbarComponent } from '@/components/Navbar';

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NodesProvider>
      <Layout className="min-h-screen">
        <NavbarComponent />
        <Layout.Content className="pt-16">
          {children}
        </Layout.Content>
      </Layout>
    </NodesProvider>
  );
} 