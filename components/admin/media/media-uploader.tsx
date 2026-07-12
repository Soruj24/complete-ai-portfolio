"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X, File, Image, Video, FileText, Shapes, Music, Check, AlertCircle, Loader2 } from "lucide-react";
import { formatSize } from "./media-helpers";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
}

const typeIcons: Record<string, React.ElementType> = {
  image: Image, video: Video, pdf: FileText, document: FileText,
  icon: Shapes, svg: Shapes, audio: Music,
};

function getFileType(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)) return "image";
  if (["mp4", "webm", "mov", "avi"].includes(ext)) return "video";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx", "txt", "md", "csv", "json", "xml"].includes(ext)) return "document";
  if (["svg"].includes(ext)) return "svg";
  if (["mp3", "wav", "ogg", "flac"].includes(ext)) return "audio";
  return "document";
}

export function MediaUploader({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: getFileType(f.name),
      progress: 0,
      status: "pending" as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  }, []);

  const simulateUpload = (id: string) => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => f.id === id ? { ...f, progress: 100, status: "done" as const } : f)
        );
        setIsUploading(false);
      } else {
        setFiles((prev) =>
          prev.map((f) => f.id === id ? { ...f, progress, status: "uploading" as const } : f)
        );
      }
    }, 200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setIsUploading(false);
  };

  if (!open) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-surface border border-border-subtle rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div>
            <h2 className="text-base font-semibold text-text-primary">Upload Media</h2>
            <p className="text-xs text-text-tertiary mt-0.5">Drag & drop files or browse to upload</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-hover">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "m-4 p-8 rounded-xl border-2 border-dashed transition-all text-center",
            isDragOver ? "border-accent bg-accent/5" : "border-border-subtle bg-surface-hover/50",
          )}
        >
          <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && addFiles(e.target.files)} accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.svg,.csv,.json" />
          <div className="flex flex-col items-center gap-2">
            <div className={cn("p-3 rounded-xl", isDragOver ? "bg-accent/10" : "bg-surface-hover")}>
              <Upload className={cn("h-6 w-6", isDragOver ? "text-accent" : "text-text-tertiary")} />
            </div>
            <p className="text-sm text-text-primary font-medium">Drop files here or click to browse</p>
            <p className="text-[10px] text-text-tertiary">Supports images, videos, PDFs, documents, SVGs, and audio up to 50MB</p>
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}
              className="mt-2 rounded-lg border-border-subtle text-xs h-8"
            >
              Browse Files
            </Button>
          </div>
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-4 pb-4 overflow-y-auto max-h-[300px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary font-medium">{files.length} file{files.length !== 1 ? "s" : ""}</span>
                <button onClick={clearAll} className="text-[10px] text-text-tertiary hover:text-error transition-colors">Clear all</button>
              </div>
              {files.map((file) => {
                const Icon = typeIcons[file.type] || File;
                return (
                  <motion.div key={file.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-hover border border-border-subtle"
                  >
                    <div className="p-1.5 rounded-lg bg-background">
                      <Icon className="h-4 w-4 text-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-text-primary truncate">{file.name}</span>
                        {file.status === "done" && <Check className="h-3 w-3 text-success shrink-0" />}
                        {file.status === "error" && <AlertCircle className="h-3 w-3 text-error shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-text-tertiary font-mono">{formatSize(file.size)}</span>
                        {file.status === "uploading" && (
                          <span className="text-[9px] text-accent font-mono">{file.progress}%</span>
                        )}
                      </div>
                      {file.status === "uploading" && (
                        <div className="h-1 rounded-full bg-background mt-1.5 overflow-hidden">
                          <motion.div className="h-full rounded-full bg-accent" style={{ width: `${file.progress}%` }} />
                        </div>
                      )}
                    </div>
                    {file.status !== "uploading" && (
                      <button onClick={() => removeFile(file.id)} className="h-6 w-6 rounded flex items-center justify-center text-text-tertiary hover:text-error hover:bg-error/10">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                    {file.status === "uploading" && <Loader2 className="h-4 w-4 text-accent animate-spin shrink-0" />}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {files.length > 0 && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-border-subtle bg-surface-hover/50">
            <Badge variant="outline" className="text-[9px] px-2 py-0 rounded-full border-border-subtle gap-1">
              {files.filter((f) => f.status === "done").length} uploaded
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs rounded-lg">Clear All</Button>
            <Button size="sm" onClick={() => { setFiles([]); onClose(); }} className="h-8 text-xs rounded-lg bg-accent hover:bg-accent/90 gap-1">
              <Check className="h-3 w-3" /> Done
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
