import { BaseRepository } from "./base";
import SettingsModel from "@/models/Settings";
import type { Document } from "mongoose";

interface ISettingsDocument extends Document {
  siteName: string;
  contactEmail: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  fullName: string;
  professionalTitle: string;
  bio: string;
  location: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  specializations: string[];
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

class SettingsRepository extends BaseRepository<ISettingsDocument> {
  constructor() {
    super(SettingsModel as any);
  }

  async getSingleton(): Promise<ISettingsDocument | null> {
    const all = await this.findAll({ limit: 1 });
    return all.data[0] || null;
  }

  async upsert(data: Partial<ISettingsDocument>): Promise<ISettingsDocument> {
    const existing = await this.getSingleton();
    if (existing) {
      const updated = await this.update(existing._id.toString(), data);
      return updated!;
    }
    return this.create(data as any);
  }
}

export const settingsRepository = new SettingsRepository();
