import { sanitizeFilename } from "../utils/file-utils";
import type { UploadFile } from "../types";

export class UploadService {
  private uploads: Map<string, UploadFile> = new Map();

  async validateFile(file: File): Promise<string | null> {
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) return "File exceeds 50MB limit";
    return null;
  }

  prepareUpload(file: File): UploadFile {
    return {
      id: crypto.randomUUID(),
      file,
      name: sanitizeFilename(file.name),
      size: file.size,
      type: file.type,
      progress: 0,
      status: "pending",
    };
  }

  async simulateUpload(upload: UploadFile, onProgress: (id: string, progress: number) => void): Promise<void> {
    this.uploads.set(upload.id, { ...upload, status: "uploading" });

    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 150));
      const progress = Math.round((i / steps) * 100);
      onProgress(upload.id, progress);
    }

    this.uploads.set(upload.id, { ...upload, progress: 100, status: "done" });
  }
}

export const uploadService = new UploadService();
