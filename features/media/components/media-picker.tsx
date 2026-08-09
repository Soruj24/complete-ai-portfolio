"use client";

import { useState, useCallback, useRef } from "react";
import { Search, Upload, X, Image, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadToCloudinary, getMediaType } from "../services/upload-service";
import { formatSize } from "../utils";
import type { MediaItem } from "../types";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  className?: string;
}

export function MediaPicker({ value, onChange, accept = "image/*", className }: MediaPickerProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) return;
      const json = await res.json();
      const raw = (json.data ?? []) as Record<string, unknown>[];
      setItems(
        raw.map((d) => ({
          id: String(d._id ?? d.id ?? ""),
          name: String(d.name ?? d.filename ?? "Untitled"),
          type: String(d.type ?? "image") as MediaItem["type"],
          mime: String(d.mime ?? "image/*"),
          size: Number(d.size ?? 0),
          url: String(d.url ?? ""),
          thumbnail: String(d.thumbnail ?? d.url ?? ""),
        })) as MediaItem[]
      );
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const result = await uploadToCloudinary(file);
        await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            type: getMediaType(file),
            mime: file.type,
            size: result.bytes,
            url: result.secure_url,
            thumbnail: result.secure_url,
            dimensions: result.width && result.height ? `${result.width}x${result.height}` : undefined,
            folder: "all",
            tags: [],
            category: "general",
          }),
        });
        onChange(result.secure_url);
        fetchMedia();
      } catch {
        // silent
      } finally {
        setUploading(false);
      }
    },
    [onChange, fetchMedia]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (accept === "*" || item.mime.startsWith(accept.replace("/*", "/")))
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
          <Input
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={fetchMedia}
            className="pl-8 h-8 text-[13px]"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-8 text-[11px] gap-1.5"
        >
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </div>

      {value && (
        <div className="relative rounded-lg border border-border-subtle overflow-hidden">
          <img src={value} alt="Selected" className="w-full h-32 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 p-1 rounded bg-background/80 hover:bg-background text-text-tertiary hover:text-red-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        className={cn(
          "rounded-lg border-2 border-dashed p-4 text-center transition-colors cursor-pointer",
          dragActive ? "border-accent bg-accent/5" : "border-border-subtle hover:border-border"
        )}
        onClick={() => inputRef.current?.click()}
      >
        <Image className="h-6 w-6 mx-auto mb-1 text-text-tertiary" />
        <p className="text-[11px] text-text-tertiary">Drop image or click to browse</p>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto">
          {filtered.slice(0, 12).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.url)}
              className={cn(
                "relative aspect-square rounded border overflow-hidden",
                value === item.url ? "border-accent ring-2 ring-accent/20" : "border-border-subtle hover:border-border"
              )}
            >
              {item.type === "image" || item.type === "svg" ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface">
                  <Image className="h-4 w-4 text-text-tertiary" />
                </div>
              )}
              {value === item.url && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-accent" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
