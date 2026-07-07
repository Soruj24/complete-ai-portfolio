import type { MediaItem } from "../types";

export class MediaRepository {
  async getAll(_params?: { limit?: number; search?: string }): Promise<{ success: boolean; data: MediaItem[] }> {
    return { success: true, data: [] };
  }
  async getById(_id: string): Promise<{ success: boolean; data: MediaItem }> {
    throw new Error("Not found");
  }
  async toggleFavorite(_id: string): Promise<MediaItem> {
    throw new Error("Not found");
  }
  async bulkDelete(_ids: string[]): Promise<{ success: boolean; data: { deleted: number } }> {
    return { success: true, data: { deleted: 0 } };
  }
}

export const mediaRepository = new MediaRepository();
