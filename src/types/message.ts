import { MessageProps } from "@chatui/core/lib/components/Message/Message";

export interface ChatMessage extends MessageProps {
  role: 'assistant' | 'user' | 'system';
  nodeId?: string;    
  nodeNumber?: number;
  nodeTitle?: string;  
} 