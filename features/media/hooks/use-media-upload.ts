"use client";

import { useState, useCallback } from "react";
import { uploadService } from "../services/upload-service";
import type { UploadFile } from "../types";

interface UseMediaUploadReturn {
  uploads: UploadFile[];
  isUploading: boolean;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeFile: (id: string) => void;
  clearCompleted: () => void;
  totalProgress: number;
  dropzoneActive: boolean;
  setDropzoneActive: (active: boolean) => void;
}

export function useMediaUpload(): UseMediaUploadReturn {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dropzoneActive, setDropzoneActive] = useState(false);

  const updateProgress = useCallback((id: string, progress: number) => {
    setUploads((prev) => prev.map((u) => u.id === id ? { ...u, progress, status: progress === 100 ? "done" : "uploading" } : u));
  }, []);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: UploadFile[] = [];

    for (const file of fileArray) {
      const error = await uploadService.validateFile(file);
      validFiles.push(error
        ? { id: crypto.randomUUID(), file, name: file.name, size: file.size, type: file.type, progress: 0, status: "error", error }
        : uploadService.prepareUpload(file)
      );
    }

    setUploads((prev) => [...prev, ...validFiles]);
    setIsUploading(true);

    await Promise.allSettled(
      validFiles.filter((f) => f.status === "pending").map((f) => uploadService.simulateUpload(f, updateProgress))
    );

    setIsUploading(false);
  }, [updateProgress]);

  const removeFile = useCallback((id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setUploads((prev) => prev.filter((u) => u.status !== "done"));
  }, []);

  const totalProgress = uploads.length
    ? Math.round(uploads.reduce((sum, u) => sum + u.progress, 0) / uploads.length)
    : 0;

  return {
    uploads, isUploading, addFiles, removeFile, clearCompleted,
    totalProgress, dropzoneActive, setDropzoneActive,
  };
}
