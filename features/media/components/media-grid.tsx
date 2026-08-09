"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Image, FileText, Music, Video, Shapes, File } from "lucide-react";
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

const TYPE_COLORS: Record<MediaType, string> = {
  image: "text-blue-500 bg-blue-500/10",
  video: "text-purple-500 bg-purple-500/10",
  pdf: "text-red-500 bg-red-500/10",
  document: "text-blue-400 bg-blue-400/10",
  icon: "text-amber-500 bg-amber-500/10",
  svg: "text-green-500 bg-green-500/10",
  audio: "text-pink-500 bg-pink-500/10",
};

function MediaCard({
  item,
  selected,
  onToggle,
  onPreview,
}: {
  item: MediaItem;
  selected: boolean;
  onToggle: (id: string) => void;
  onPreview: (item: MediaItem) => void;
}) {
  const Icon = TYPE_ICONS[item.type] || File;
  const isImage = item.type === "image" || item.type === "svg";

  return (
    <div
      className={cn(
        "group relative rounded-lg border overflow-hidden cursor-pointer transition-all",
        selected
          ? "border-accent ring-2 ring-accent/20 bg-accent/5"
          : "border-border-subtle bg-surface hover:border-border hover:shadow-sm"
      )}
    >
      <div
        className="relative aspect-square bg-background overflow-hidden"
        onClick={() => onPreview(item)}
      >
        {isImage && item.url ? (
          <img
            src={item.url}
            alt={item.alt || item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", TYPE_COLORS[item.type])}>
            <Icon className="h-10 w-10" />
          </div>
        )}

        <div
          className="absolute top-1.5 left-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={selected}
            onCheckedChange={() => onToggle(item.id)}
            aria-label={`Select ${item.name}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity data-[state=checked]:opacity-100"
          />
        </div>

        <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center rounded bg-background/80 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-medium text-text-secondary">
            {item.type.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-2">
        <p className="text-[11px] font-medium text-text-primary truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[10px] text-text-tertiary font-mono">{formatSize(item.size)}</p>
          {item.dimensions && (
            <p className="text-[9px] text-text-tertiary">{item.dimensions}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface MediaGridProps {
  items: MediaItem[];
  loading: boolean;
  selected: Set<string>;
  search: string;
  typeFilter: MediaType | "all";
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  onPreview: (item: MediaItem) => void;
  onSearchChange: (v: string) => void;
  onTypeFilterChange: (v: MediaType | "all") => void;
  onUploadClick: () => void;
}

export function MediaGrid({
  items,
  loading,
  selected,
  search,
  typeFilter,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  onRefresh,
  onPreview,
  onSearchChange,
  onTypeFilterChange,
  onUploadClick,
}: MediaGridProps) {
  const allSelected = items.length > 0 && selected.size === items.length;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {selected.size > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/5 border-b border-accent/10">
          <span className="text-[11px] font-medium text-accent">{selected.size} selected</span>
          <div className="flex-1" />
          <button onClick={onClearSelection} className="text-[11px] text-text-tertiary hover:text-text-primary">
            Clear
          </button>
          <button onClick={onDeleteSelected} className="text-[11px] text-red-500 hover:text-red-600">
            Delete
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border-subtle bg-surface overflow-hidden animate-pulse">
                <div className="aspect-square bg-surface-hover" />
                <div className="p-2 space-y-1.5">
                  <div className="h-2.5 bg-surface-hover rounded w-3/4" />
                  <div className="h-2 bg-surface-hover rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="p-3 rounded-xl bg-surface-hover mb-3">
              <Image className="h-8 w-8 text-text-tertiary" />
            </div>
            <p className="text-[13px] font-medium text-text-primary">No media files found</p>
            <p className="text-[11px] text-text-tertiary mt-1">Upload images or adjust your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {items.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                selected={selected.has(item.id)}
                onToggle={onToggleSelect}
                onPreview={onPreview}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
