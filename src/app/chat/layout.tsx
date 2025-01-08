'use client';

import { NodesProvider } from '@/contexts/NodesContext';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NodesProvider>{children}</NodesProvider>;
} 