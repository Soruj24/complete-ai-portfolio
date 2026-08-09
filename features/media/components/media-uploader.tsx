"use client";

import { useRef, useCallback } from "react";
import { X, Upload, File, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatSize } from "../utils";
import type { UploadFile } from "../types";

function UploadItem({ file, onRemove }: { file: UploadFile; onRemove: (id: string) => void }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2.5 rounded-lg border text-[11px]",
        file.status === "error"
          ? "border-red-200 bg-red-500/5"
          : file.status === "done"
            ? "border-emerald-200 bg-emerald-500/5"
            : "border-border-subtle bg-surface"
      )}
    >
      {file.status === "done" ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
      ) : file.status === "error" ? (
        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
      ) : file.status === "uploading" ? (
        <Loader2 className="h-4 w-4 text-accent animate-spin shrink-0" />
      ) : (
        <File className="h-4 w-4 text-text-tertiary shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary truncate">{file.name}</span>
          <span className="text-text-tertiary shrink-0">{formatSize(file.size)}</span>
        </div>
        {file.status === "uploading" && (
          <div className="mt-1.5 h-1 rounded-full bg-surface-hover overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
        {file.error && <p className="text-[10px] text-red-500 mt-0.5">{file.error}</p>}
      </div>
      <button
        onClick={() => onRemove(file.id)}
        className="p-1 rounded hover:bg-surface-hover text-text-tertiary hover:text-red-500 shrink-0"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

interface MediaUploaderProps {
  uploads: UploadFile[];
  isUploading: boolean;
  onAddFiles: (files: FileList | File[]) => void;
  onRemoveFile: (id: string) => void;
  onClearCompleted: () => void;
  onClose: () => void;
}

export function MediaUploader({
  uploads,
  isUploading,
  onAddFiles,
  onRemoveFile,
  onClearCompleted,
  onClose,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      if (e.dataTransfer.files.length) onAddFiles(e.dataTransfer.files);
    },
    [onAddFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragActive(false), []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 bg-background border border-border-subtle rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <h2 className="text-[13px] font-semibold text-text-primary">Upload Files</h2>
          <div className="flex items-center gap-2">
            {uploads.some((u) => u.status === "done") && (
              <Button variant="ghost" size="sm" onClick={onClearCompleted} className="h-7 text-[11px] text-text-tertiary">
                Clear Done
              </Button>
            )}
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-hover text-text-tertiary">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "m-4 p-8 rounded-lg border-2 border-dashed text-center transition-all cursor-pointer",
            isDragActive ? "border-accent bg-accent/5" : "border-border-subtle hover:border-border"
          )}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.svg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) onAddFiles(e.target.files);
            }}
          />
          <Upload
            className={cn("h-8 w-8 mx-auto mb-2", isDragActive ? "text-accent" : "text-text-tertiary")}
          />
          <p className="text-[13px] font-medium text-text-primary">
            {isDragActive ? "Drop files here" : "Drag & drop or click to browse"}
          </p>
          <p className="text-[11px] text-text-tertiary mt-1">
            Images, videos, audio, documents up to 10MB
          </p>
        </div>

        {uploads.length > 0 && (
          <div className="px-4 pb-4 space-y-1.5 max-h-60 overflow-y-auto">
            {[...uploads].reverse().map((f) => (
              <UploadItem key={f.id} file={f} onRemove={onRemoveFile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
