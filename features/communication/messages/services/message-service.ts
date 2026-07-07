import { messageRepository } from "../repositories/message-repository";
import type { Message, ContactRequest, MessagesStats, MessageFilterState } from "../types";

export class MessageService {
  async getAll(): Promise<Message[]> {
    const result = await messageRepository.getAll({ limit: 100 });
    return result.data;
  }

  async getStats(): Promise<MessagesStats> { return messageRepository.getStats(); }
  async markAsRead(id: string): Promise<Message> { return messageRepository.markAsRead(id); }
  async toggleFlag(id: string, msg: Message): Promise<Message> { return messageRepository.toggleFlag(id, msg); }
  getContactRequests(): ContactRequest[] { return messageRepository.getContactRequests(); }

  filter(items: Message[], filters: MessageFilterState): Message[] {
    let result = [...items];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((m) => m.subject.toLowerCase().includes(q) || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.content.toLowerCase().includes(q));
    }
    if (filters.status !== "all") result = result.filter((m) => m.status === filters.status);
    if (filters.source !== "all") result = result.filter((m) => m.source === filters.source);
    if (filters.category) result = result.filter((m) => m.category === filters.category);
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const messageService = new MessageService();
