"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Upload, File, CheckCircle2, XCircle, Loader2, Image as Gallery } from "lucide-react";
import { formatSize } from "../utils";
import { UPLOAD_OVERLAY_ANIMATION } from "../animations/media-animations";
import type { UploadFile } from "../types";

function UploadItem({ file, onRemove }: { file: UploadFile; onRemove: (id: string) => void }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2.5 rounded-lg border text-[10px]",
      file.status === "error" ? "border-error/20 bg-error/5" :
      file.status === "done" ? "border-success/20 bg-success/5" :
      "border-border-subtle bg-surface",
    )}>
      {file.status === "done" ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> :
       file.status === "error" ? <XCircle className="h-4 w-4 text-error shrink-0" /> :
       <File className="h-4 w-4 text-text-tertiary shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary truncate">{file.name}</span>
          <span className="text-text-tertiary shrink-0">{formatSize(file.size)}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Progress value={file.progress} className={cn(
            "h-1 flex-1",
            file.status === "done" ? "[&>div]:bg-success" :
            file.status === "error" ? "[&>div]:bg-error" : ""
          )} />
          <span className="text-text-tertiary font-mono w-8 text-right">{file.progress}%</span>
        </div>
        {file.error && <p className="text-[8px] text-error mt-0.5">{file.error}</p>}
      </div>
      <button onClick={() => onRemove(file.id)}
        className="p-1 rounded hover:bg-surface-hover text-text-tertiary hover:text-error shrink-0">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export function MediaUploader({ uploads, isUploading, dropzoneActive, totalProgress, onAddFiles, onRemoveFile, onClearCompleted, onDropzoneActive, onClose }: {
  uploads: UploadFile[]; isUploading: boolean; dropzoneActive: boolean; totalProgress: number;
  onAddFiles: (files: FileList | File[]) => void; onRemoveFile: (id: string) => void;
  onClearCompleted: () => void; onDropzoneActive: (active: boolean) => void; onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDropzoneActive(false);
    if (e.dataTransfer.files.length) onAddFiles(e.dataTransfer.files);
  }, [onAddFiles, onDropzoneActive]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDropzoneActive(true);
  }, [onDropzoneActive]);

  const handleDragLeave = useCallback(() => onDropzoneActive(false), [onDropzoneActive]);

  return (
    <motion.div {...UPLOAD_OVERLAY_ANIMATION}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg mx-4 bg-background border border-border-subtle rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <h2 className="text-sm font-semibold text-text-primary">Upload Files</h2>
          <div className="flex items-center gap-2">
            {uploads.some((u) => u.status === "done") && (
              <Button variant="ghost" size="sm" onClick={onClearCompleted}
                className="h-7 text-[10px] rounded-lg text-text-tertiary">Clear Done</Button>
            )}
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-hover text-text-tertiary">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
          className={cn(
            "m-4 p-8 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer",
            dropzoneActive ? "border-accent bg-accent/5" : "border-border-subtle hover:border-border",
          )}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" multiple className="hidden"
            onChange={(e) => { if (e.target.files) onAddFiles(e.target.files); }} />
          <Upload className={cn("h-8 w-8 mx-auto mb-2", dropzoneActive ? "text-accent" : "text-text-tertiary")} />
          <p className="text-xs font-medium text-text-primary">
            {dropzoneActive ? "Drop files here" : "Drag & drop files or click to browse"}
          </p>
          <p className="text-[9px] text-text-tertiary mt-1">Max 50MB per file</p>
        </div>

        {isUploading && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 text-[10px] text-accent mb-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Uploading... {totalProgress}%
            </div>
            <Progress value={totalProgress} className="h-1 [&>div]:bg-accent" />
          </div>
        )}

        {uploads.length > 0 && (
          <div className="px-4 pb-4 space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
            {[...uploads].reverse().map((f) => (
              <UploadItem key={f.id} file={f} onRemove={onRemoveFile} />
            ))}
          </div>
        )}

        {uploads.length === 0 && (
          <div className="px-4 pb-4 text-center text-[9px] text-text-tertiary">
            <Gallery className="h-4 w-4 mx-auto mb-1 opacity-50" />
            No files selected
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
