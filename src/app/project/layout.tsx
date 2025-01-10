'use client';

import { NavbarComponent } from '@/components/Navbar';
import { Layout } from 'antd';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="min-h-screen">
      <NavbarComponent />
      <Layout.Content className="pt-16">
        {children}
      </Layout.Content>
    </Layout>
  );
} 