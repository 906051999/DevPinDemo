import type { ChatMessage as ProChatMessage } from '@ant-design/pro-chat';

// 扩展 ProChat 的消息类型，保持原有的 createAt 类型
export interface ChatMessage extends ProChatMessage {
  nodeId: string;
  nodeTitle: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  isAI?: boolean;
}

// 用户信息接口
export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
} 