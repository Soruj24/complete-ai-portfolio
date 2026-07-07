import { mediaRepository } from "../repositories/media-repository";
import type { MediaItem, Folder, Tag, Category } from "../types";
import { MOCK_STORAGE, FOLDERS, TAGS, CATEGORIES } from "../constants";
import type { StorageStats } from "../types";

export class MediaService {
  async getAll(): Promise<MediaItem[]> {
    const result = await mediaRepository.getAll({ limit: 200 });
    return result.data;
  }

  async getById(id: string): Promise<MediaItem> {
    const result = await mediaRepository.getById(id);
    return result.data;
  }

  async search(query: string, type?: string, folder?: string): Promise<MediaItem[]> {
    const result = await mediaRepository.getAll({ search: query, limit: 200 });
    let items = result.data;
    if (type && type !== "all") items = items.filter((m) => m.type === type);
    if (folder && folder !== "root") items = items.filter((m) => m.folder === folder);
    return items;
  }

  async toggleFavorite(id: string): Promise<MediaItem> {
    return mediaRepository.toggleFavorite(id);
  }

  async deleteItems(ids: string[]): Promise<number> {
    const result = await mediaRepository.bulkDelete(ids);
    return result.data.deleted;
  }

  getFolders(): Folder[] {
    return FOLDERS;
  }

  getTags(): Tag[] {
    return TAGS;
  }

  getCategories(): Category[] {
    return CATEGORIES;
  }

  getStorageStats(): StorageStats {
    return MOCK_STORAGE;
  }

  filterByType(items: MediaItem[], type: string): MediaItem[] {
    if (type === "all") return items;
    return items.filter((m) => m.type === type);
  }

  filterByFolder(items: MediaItem[], folder: string): MediaItem[] {
    if (folder === "root" || !folder) return items;
    return items.filter((m) => m.folder === folder);
  }

  filterByTags(items: MediaItem[], tags: string[]): MediaItem[] {
    if (!tags.length) return items;
    return items.filter((m) => tags.some((t) => m.tags.includes(t)));
  }

  sort(items: MediaItem[], field: "name" | "date" | "size", order: "asc" | "desc"): MediaItem[] {
    return [...items].sort((a, b) => {
      let cmp: number;
      if (field === "name") cmp = a.name.localeCompare(b.name);
      else if (field === "date") cmp = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
      else cmp = a.size - b.size;
      return order === "asc" ? cmp : -cmp;
    });
  }
}

export const mediaService = new MediaService();
