import { contactRepository } from "@/lib/repositories";
import type { ContactMessage } from "@/shared/types";

class ContactService {
  async send(data: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> {
    const msg = await contactRepository.create(data as any);
    return msg as unknown as ContactMessage;
  }

  async getMessages(): Promise<ContactMessage[]> {
    const result = await contactRepository.findAll({ sort: "createdAt", order: "desc" });
    return result.data as unknown as ContactMessage[];
  }

  async markAsRead(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.markAsRead(id);
    return msg as unknown as ContactMessage | null;
  }

  async deleteMessage(id: string): Promise<ContactMessage | null> {
    const msg = await contactRepository.delete(id);
    return msg as unknown as ContactMessage | null;
  }
}

export const contactService = new ContactService();
