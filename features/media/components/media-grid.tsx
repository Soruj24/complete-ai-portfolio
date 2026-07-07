"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { fadeInUp, staggerContainer } from "@/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Grid3X3, List, Search, SlidersHorizontal, ArrowUpDown,
  Image, Video, FileText, Shapes, Music, File,
  Star, StarOff, Copy, Trash2, Download, Upload,
} from "lucide-react";
import { FILE_TYPE_OPTIONS, TYPE_COLORS, SORT_OPTIONS } from "../constants";
import { formatSize } from "../utils";
import type { MediaItem, MediaFilterState } from "../types";

function MediaCard({ item, selected, onToggle, onPreview, onFavorite }: {
  item: MediaItem; selected: boolean; onToggle: (id: string) => void;
  onPreview: (item: MediaItem) => void; onFavorite: (id: string) => void;
}) {
  const Icon = FILE_TYPE_OPTIONS.find((o) => o.value === item.type)?.icon || File;

  return (
    <motion.div layout variants={fadeInUp}
      className={cn(
        "group relative rounded-xl border overflow-hidden cursor-pointer transition-all",
        selected ? "border-accent ring-2 ring-accent/20 bg-accent/5" : "border-border-subtle bg-surface hover:border-border hover:shadow-sm",
      )}
    >
      <div className="relative aspect-[4/3] bg-background overflow-hidden" onClick={() => onPreview(item)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("p-3 rounded-xl", TYPE_COLORS[item.type])}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        {item.favorite && (
          <button onClick={(e) => { e.stopPropagation(); onFavorite(item.id); }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          </button>
        )}
        <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onCheckedChange={() => onToggle(item.id)}
            aria-label={`Select ${item.name}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity data-[state=checked]:opacity-100" />
        </div>
      </div>
      <div className="p-2.5 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-medium text-text-primary truncate flex-1">{item.name}</p>
          <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-surface-hover text-text-tertiary shrink-0">
            {item.type}
          </Badge>
        </div>
        <p className="text-[9px] text-text-tertiary font-mono">{formatSize(item.size)}</p>
      </div>
    </motion.div>
  );
}

export function MediaGrid({ items, loading, error, selected, filters, onToggleSelect, onSelectAll, onClearSelection, onDeleteSelected, onRefresh, onPreview, onFavorite, onFiltersChange, onUploadClick }: {
  items: MediaItem[]; loading: boolean; error: string | null; selected: Set<string>;
  filters: MediaFilterState; onToggleSelect: (id: string) => void;
  onSelectAll: () => void; onClearSelection: () => void; onDeleteSelected: () => void;
  onRefresh: () => void; onPreview: (item: MediaItem) => void; onFavorite: (id: string) => void;
  onFiltersChange: (filters: Partial<MediaFilterState>) => void; onUploadClick: () => void;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="p-3 rounded-xl bg-error/10 w-fit mx-auto">
            <Upload className="h-6 w-6 text-error" />
          </div>
          <p className="text-sm text-error font-medium">Failed to load media</p>
          <p className="text-[10px] text-text-tertiary max-w-xs">{error}</p>
          <Button size="sm" onClick={onRefresh} className="h-8 text-xs rounded-lg">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 p-4 pb-2 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input value={filters.search} onChange={(e) => onFiltersChange({ search: e.target.value })}
              placeholder="Search media..." className="pl-9 h-9 text-xs rounded-xl bg-surface border-border-subtle" />
          </div>
          <div className="flex items-center gap-1 bg-surface-hover rounded-xl p-0.5">
            <button onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary")}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary")}>
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button size="sm" onClick={onUploadClick}
            className="h-9 text-xs gap-1.5 rounded-xl bg-accent hover:bg-accent/90">
            <Upload className="h-3.5 w-3.5" /> Upload
          </Button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {FILE_TYPE_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => onFiltersChange({ type: opt.value })}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all shrink-0",
                filters.type === opt.value
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-text-tertiary border border-transparent hover:text-text-secondary",
              )}
            >
              <opt.icon className="h-3 w-3" />
              {opt.label}
            </button>
          ))}
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-accent/5 border border-accent/20">
            <span className="text-[10px] text-accent font-medium">{selected.size} selected</span>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={onClearSelection}
              className="h-6 text-[9px] rounded-lg text-text-tertiary">Clear</Button>
            <Button variant="ghost" size="sm" onClick={onDeleteSelected}
              className="h-6 text-[9px] rounded-lg text-error gap-1"><Trash2 className="h-3 w-3" /> Delete</Button>
            <Button variant="ghost" size="sm"
              className="h-6 text-[9px] rounded-lg text-text-tertiary gap-1"><Download className="h-3 w-3" /> Download</Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border-subtle bg-surface overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-surface-hover" />
                <div className="p-2.5 space-y-2">
                  <div className="h-3 bg-surface-hover rounded w-3/4" />
                  <div className="h-2 bg-surface-hover rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-3 rounded-xl bg-surface-hover">
              <Search className="h-6 w-6 text-text-tertiary" />
            </div>
            <p className="text-sm font-medium text-text-primary mt-3">No files found</p>
            <p className="text-[10px] text-text-tertiary mt-1 max-w-xs">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
          >
            {items.map((item) => (
              <MediaCard key={item.id} item={item} selected={selected.has(item.id)}
                onToggle={onToggleSelect} onPreview={onPreview} onFavorite={onFavorite} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
