import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_MEDIA } from "../constants";
import type { MediaItem } from "../types";

interface MediaEntity extends MediaItem {
  _id: string;
}

export class MediaRepository extends MockRepository<MediaEntity> {
  constructor() {
    super({ baseUrl: "", resourceName: "media" });
  }

  protected searchFields: (keyof MediaEntity)[] = ["name", "tags", "category", "folder"];

  protected generateMockData(): MediaEntity[] {
    return MOCK_MEDIA.map((m) => ({ ...m, _id: m.id }));
  }

  async toggleFavorite(id: string): Promise<MediaEntity> {
    const result = await this.getById(id);
    const updated = { ...result.data, favorite: !result.data.favorite };
    return updated;
  }

  async bulkDeleteByIds(ids: string[]): Promise<number> {
    await this.delay();
    return ids.length;
  }
}

export const mediaRepository = new MediaRepository();
