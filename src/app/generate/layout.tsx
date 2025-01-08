'use client';

import { NodesProvider } from '@/contexts/NodesContext';
import '@/styles/markdown.css';

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NodesProvider>{children}</NodesProvider>;
} 