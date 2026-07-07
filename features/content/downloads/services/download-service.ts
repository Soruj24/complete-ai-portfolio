import { downloadRepository } from "../repositories/download-repository";
import type { Download } from "../types";

export class DownloadService {
  async getAll(): Promise<Download[]> {
    const result = await downloadRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Download>): Promise<Download> {
    return downloadRepository.create(data).then((r) => r.data);
  }
}

export const downloadService = new DownloadService();
