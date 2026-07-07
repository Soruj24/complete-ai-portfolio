export interface ChatMessage {
  _id: string;
  senderId: string;
  senderName: string;
  message: string;
  isAdmin: boolean;
  isAi?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface AiChatRequest {
  message: string;
  history: AiChatMessage[];
}

export interface SendMessageRequest {
  receiverId: string;
  message: string;
}
