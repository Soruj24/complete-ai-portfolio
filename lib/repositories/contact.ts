import { BaseRepository } from "./base";
import { ContactMessage, IContactMessage } from "@/models/ContactMessage";

class ContactRepository extends BaseRepository<IContactMessage> {
  constructor() {
    super(ContactMessage as any);
  }

  async markAsRead(id: string): Promise<IContactMessage | null> {
    return this.update(id, { status: "read" } as any);
  }
}

export const contactRepository = new ContactRepository();
