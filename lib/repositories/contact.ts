import { BaseRepository } from "./base";
import { ContactMessage, IContactMessage } from "@/models/ContactMessage";

class ContactRepository extends BaseRepository<IContactMessage> {
  constructor() {
    super(ContactMessage as any);
  }

  async markAsRead(id: string): Promise<IContactMessage | null> {
    return this.update(id, { status: "read" } as any);
  }

  async markAsUnread(id: string): Promise<IContactMessage | null> {
    return this.update(id, { status: "pending" } as any);
  }

  async archive(id: string): Promise<IContactMessage | null> {
    return this.update(id, { archived: true } as any);
  }

  async unarchive(id: string): Promise<IContactMessage | null> {
    return this.update(id, { archived: false } as any);
  }

  async findAllNonArchived(options?: { page?: number; limit?: number; sort?: string; order?: "asc" | "desc" }) {
    const filter = { archived: { $ne: true } };
    return this.findAll({ ...options, filter: filter as any });
  }
}

export const contactRepository = new ContactRepository();
