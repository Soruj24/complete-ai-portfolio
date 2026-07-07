import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_MESSAGES, MOCK_CONTACT_REQUESTS } from "../constants/mock-data";
import type { Message, ContactRequest, MessagesStats } from "../types";

interface MessageEntity extends Message { _id: string; }

export class MessageRepository extends MockRepository<MessageEntity> {
  constructor() {
    super({ baseUrl: "", resourceName: "messages" });
  }

  protected generateMockData(): MessageEntity[] {
    return MOCK_MESSAGES.map((m) => ({ ...m, _id: m.id }));
  }

  async markAsRead(id: string): Promise<MessageEntity> { return (await this.update(id, { status: "read" } as Partial<MessageEntity>)).data; }
  async toggleFlag(id: string, msg: Message): Promise<MessageEntity> {
    const newStatus = msg.status === "flagged" ? "read" : "flagged";
    return (await this.update(id, { status: newStatus } as Partial<MessageEntity>)).data;
  }

  async getStats(): Promise<MessagesStats> {
    const items = this.generateMockData();
    const contacts = MOCK_CONTACT_REQUESTS;
    return {
      total: items.length,
      unread: items.filter((m) => m.status === "unread").length,
      flagged: items.filter((m) => m.status === "flagged").length,
      contacted: contacts.filter((c) => c.status === "contacted" || c.status === "qualified").length,
      newLeads: contacts.filter((c) => c.status === "new").length,
    };
  }

  getContactRequests(): ContactRequest[] { return MOCK_CONTACT_REQUESTS; }
}

export const messageRepository = new MessageRepository();
