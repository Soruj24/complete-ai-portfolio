import { chatRepository } from "@/lib/repositories";
import type { ChatMessage, ChatUser } from "@/shared/types";

class ChatService {
  async sendMessage(data: {
    senderId: string;
    senderName: string;
    message: string;
    isAdmin: boolean;
  }): Promise<ChatMessage> {
    const msg = await chatRepository.create(data as any);
    return msg as unknown as ChatMessage;
  }

  async getConversation(userId: string): Promise<ChatMessage[]> {
    const messages = await chatRepository.getConversation(userId);
    return messages as unknown as ChatMessage[];
  }

  async getAdminUsers(): Promise<ChatUser[]> {
    const messages = await chatRepository.getAdminConversations();
    const userMap = new Map<string, ChatUser>();

    for (const msg of messages) {
      if (!userMap.has(msg.senderId)) {
        userMap.set(msg.senderId, {
          _id: msg.senderId,
          name: msg.senderName,
          email: "",
          lastMessage: msg.message,
          lastMessageTime: msg.createdAt.toISOString(),
          unreadCount: 1,
        });
      }
    }

    return Array.from(userMap.values());
  }

  async markAsRead(userId: string): Promise<void> {
    await chatRepository.markAsRead(userId);
  }
}

export const chatService = new ChatService();
