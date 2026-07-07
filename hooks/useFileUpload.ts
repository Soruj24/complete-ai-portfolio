"use client";

import { useState, useRef, useCallback } from "react";
import { validateFile } from "@/lib/ai/pdf";

interface UseFileUploadOptions {
  accept?: string[];
  maxSize?: number;
  onValidate?: (file: File) => string | null;
}

interface UseFileUploadReturn {
  file: File | null;
  setFile: (file: File | null) => void;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  openFileDialog: () => void;
  clear: () => void;
  dragOver: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  fileSize: string;
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const processFile = useCallback(
    (f: File | null) => {
      if (!f) {
        setFile(null);
        setError(null);
        return;
      }
      try {
        validateFile(f);
        const customError = options.onValidate?.(f);
        if (customError) {
          setError(customError);
          return;
        }
        setFile(f);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid file");
        setFile(null);
      }
    },
    [options.onValidate],
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const clear = useCallback(() => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      const dropped = e.dataTransfer.files?.[0] ?? null;
      processFile(dropped);
    },
    [processFile],
  );

  const fileSize = file
    ? file.size < 1024
      ? `${file.size} B`
      : file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : "";

  return {
    file,
    setFile: processFile,
    error,
    inputRef,
    openFileDialog,
    clear,
    dragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileSize,
  };
}
