import { BaseRepository } from "./base";
import { ChatMessage, IChatMessage } from "@/models/ChatMessage";

class ChatRepository extends BaseRepository<IChatMessage> {
  constructor() {
    super(ChatMessage as any);
  }

  async getConversation(userId: string): Promise<IChatMessage[]> {
    const result = await this.findAll({
      filter: {
        $or: [
          { senderId: userId },
          { receiverId: userId },
        ],
      } as any,
      sort: "createdAt",
      order: "asc",
      limit: 100,
    });
    return result.data;
  }

  async getAdminConversations(): Promise<IChatMessage[]> {
    const result = await this.findAll({
      filter: {} as any,
      sort: "createdAt",
      order: "desc",
      limit: 200,
    });
    return result.data;
  }

  async markAsRead(userId: string): Promise<void> {
    await ChatMessage.updateMany(
      { senderId: userId, isAdmin: false, isRead: false },
      { $set: { isRead: true } }
    );
  }
}

export const chatRepository = new ChatRepository();
