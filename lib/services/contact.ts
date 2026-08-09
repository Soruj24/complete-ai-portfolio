import { contactRepository } from "@/lib/repositories";
import type { ContactMessage } from "@/shared/types";

class ContactService {
  async send(data: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> {
    const msg = await contactRepository.create(data as any);
    return msg as unknown as ContactMessage;
  }

  async getMessages(options?: { page?: number; limit?: number }): Promise<{ data: ContactMessage[]; total: number }> {
    const result = await contactRepository.findAllNonArchived({
      page: options?.page || 1,
      limit: options?.limit || 50,
      sort: "createdAt",
      order: "desc",
    });
    return {
      data: result.data as unknown as ContactMessage[],
      total: result.pagination.total,
    };
  }

  async markAsRead(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.markAsRead(id);
    return msg as unknown as ContactMessage | null;
  }

  async markAsUnread(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.markAsUnread(id);
    return msg as unknown as ContactMessage | null;
  }

  async archive(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.archive(id);
    return msg as unknown as ContactMessage | null;
  }

  async deleteMessage(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.delete(id);
    return msg as unknown as ContactMessage | null;
  }

  async getStats(): Promise<{ total: number; unread: number; archived: number }> {
    const all = await contactRepository.findAll({ limit: 1000 });
    const messages = all.data as unknown as ContactMessage[];
    return {
      total: messages.length,
      unread: messages.filter((m) => m.status === "pending").length,
      archived: messages.filter((m) => (m as any).archived).length,
    };
  }
}

export const contactService = new ContactService();
