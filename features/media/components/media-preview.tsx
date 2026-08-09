"use client";

import { X, Copy, Trash2, ExternalLink, Image, FileText, Music, Video, Shapes, File, Calendar, HardDrive, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatSize } from "../utils";
import type { MediaItem, MediaType } from "../types";

const TYPE_ICONS: Record<MediaType, React.ElementType> = {
  image: Image,
  video: Video,
  pdf: FileText,
  document: FileText,
  icon: Shapes,
  svg: Shapes,
  audio: Music,
};

interface MediaPreviewProps {
  item: MediaItem;
  onClose: () => void;
  onCopyUrl: (url: string) => void;
  onDelete: (id: string) => void;
}

export function MediaPreview({ item, onClose, onCopyUrl, onDelete }: MediaPreviewProps) {
  const Icon = TYPE_ICONS[item.type] || File;
  const isImage = item.type === "image" || item.type === "svg";

  return (
    <div className="w-80 shrink-0 border-l border-border-subtle bg-background flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border-subtle shrink-0">
        <h3 className="text-[13px] font-semibold text-text-primary truncate flex-1">Details</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-hover text-text-tertiary">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-background border border-border-subtle mb-4">
            {isImage && item.url ? (
              <img src={item.url} alt={item.alt || item.name} className="w-full h-full object-contain" />
            ) : (
              <div className={cn("w-full h-full flex items-center justify-center", `bg-${item.type === "video" ? "purple" : item.type === "audio" ? "pink" : "blue"}-500/10`)}>
                <Icon className="h-12 w-12 text-text-tertiary" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-text-secondary block mb-1">Filename</label>
              <p className="text-[13px] text-text-primary font-medium break-all">{item.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-text-secondary block mb-1">Type</label>
                <p className="text-[12px] text-text-primary uppercase">{item.type}</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-text-secondary block mb-1">Size</label>
                <p className="text-[12px] text-text-primary">{formatSize(item.size)}</p>
              </div>
            </div>

            {item.dimensions && (
              <div>
                <label className="text-[11px] font-medium text-text-secondary block mb-1">Dimensions</label>
                <p className="text-[12px] text-text-primary">{item.dimensions}</p>
              </div>
            )}

            <div>
              <label className="text-[11px] font-medium text-text-secondary block mb-1">MIME Type</label>
              <p className="text-[12px] text-text-primary font-mono">{item.mime}</p>
            </div>

            <div>
              <label className="text-[11px] font-medium text-text-secondary block mb-1">Uploaded</label>
              <p className="text-[12px] text-text-primary">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "--"}
              </p>
            </div>

            {item.url && (
              <div>
                <label className="text-[11px] font-medium text-text-secondary block mb-1">URL</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={item.url}
                    className="flex-1 text-[11px] font-mono text-text-tertiary bg-surface rounded px-2 py-1 border border-border-subtle truncate"
                  />
                  <button
                    onClick={() => onCopyUrl(item.url)}
                    className="p-1.5 rounded hover:bg-surface-hover text-text-tertiary hover:text-accent"
                    title="Copy URL"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border-subtle shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(item.url, "_blank")}
            className="flex-1 h-8 text-[11px] gap-1.5"
          >
            <ExternalLink className="h-3 w-3" /> Open
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopyUrl(item.url)}
            className="flex-1 h-8 text-[11px] gap-1.5"
          >
            <Copy className="h-3 w-3" /> Copy URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="h-8 w-8 px-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
