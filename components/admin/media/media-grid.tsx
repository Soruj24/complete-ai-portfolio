"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Grid3X3, List, Search, SlidersHorizontal, ArrowUpDown,
  Image, Video, FileText, Shapes, Music, File,
  Star, StarOff, Copy, Trash2, Download, MoreHorizontal,
  Edit3, RotateCcw, Clock, FolderOpen,
} from "lucide-react";
import type { MediaItem, MediaType } from "@/features/media/types";

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    image: "bg-accent/10 text-accent",
    video: "bg-purple-500/10 text-purple-500",
    pdf: "bg-error/10 text-error",
    document: "bg-info/10 text-info",
    icon: "bg-amber-500/10 text-amber-500",
    svg: "bg-amber-500/10 text-amber-500",
    audio: "bg-pink-500/10 text-pink-500",
  };
  return colors[type] || "bg-surface-hover text-text-tertiary";
}

interface FolderItem {
  id: string;
  name: string;
  parent: string | null;
  count: number;
  icon: string;
}

const ALL_MEDIA: MediaItem[] = [];
const EMPTY_FOLDERS: FolderItem[] = [];

const FILE_TYPE_OPTIONS: { label: string; value: MediaType | "all"; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: FolderOpen },
  { label: "Images", value: "image", icon: Image },
  { label: "Videos", value: "video", icon: Video },
  { label: "PDFs", value: "pdf", icon: FileText },
  { label: "Documents", value: "document", icon: FileText },
  { label: "Icons", value: "icon", icon: Shapes },
  { label: "SVGs", value: "svg", icon: Shapes },
  { label: "Audio", value: "audio", icon: Music },
];

function MediaCard({ item, selected, onToggleSelect, onPreview }: {
  item: MediaItem; selected: boolean; onToggleSelect: (id: string) => void; onPreview: (item: MediaItem) => void;
}) {
  const Icon = FILE_TYPE_OPTIONS.find((o) => o.value === item.type)?.icon || File;
  const typeColor = getTypeColor(item.type);

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group relative rounded-xl border overflow-hidden cursor-pointer transition-all",
        selected ? "border-accent ring-2 ring-accent/20 bg-accent/5" : "border-border-subtle bg-surface hover:border-border hover:shadow-sm",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-background overflow-hidden" onClick={() => onPreview(item)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("p-3 rounded-xl", typeColor)}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Type badge */}
        <Badge className={cn("absolute top-2 left-2 text-[8px] px-1.5 py-0 rounded border-0 font-medium", typeColor)}>
          {item.type.toUpperCase()}
        </Badge>

        {/* Select checkbox */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onCheckedChange={() => onToggleSelect(item.id)}
            className="h-4 w-4 border-white/60 data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0"
            onClick={() => onPreview(item)}>
            <Download className="h-3 w-3 text-white" />
          </Button>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0">
            <Star className={cn("h-3 w-3", item.favorite ? "text-amber-500 fill-amber-500" : "text-white")} />
          </Button>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0">
            <MoreHorizontal className="h-3 w-3 text-white" />
          </Button>
        </div>

        {/* Selected indicator */}
        {selected && (
          <div className="absolute inset-0 border-2 border-accent rounded-xl pointer-events-none" />
        )}
      </div>

      {/* Info */}
      <div className="p-2.5" onClick={() => onPreview(item)}>
        <p className="text-[11px] font-medium text-text-primary truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px] text-text-tertiary font-mono">{formatSize(item.size)}</span>
          <div className="flex items-center gap-1">
            {item.favorite && <Star className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />}
            {item.version > 1 && <span className="text-[8px] text-text-tertiary font-mono">v{item.version}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MediaListItem({ item, selected, onToggleSelect, onPreview }: {
  item: MediaItem; selected: boolean; onToggleSelect: (id: string) => void; onPreview: (item: MediaItem) => void;
}) {
  const Icon = FILE_TYPE_OPTIONS.find((o) => o.value === item.type)?.icon || File;
  const typeColor = getTypeColor(item.type);

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group",
        selected ? "bg-accent/5 border border-accent/20" : "border border-transparent hover:bg-surface-hover",
      )}
      onClick={() => onPreview(item)}
    >
      <Checkbox checked={selected} onCheckedChange={() => onToggleSelect(item.id)}
        onClick={(e) => e.stopPropagation()}
        className="h-4 w-4 data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
      <div className={cn("p-1.5 rounded-lg shrink-0", typeColor)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
        <div>
          <p className="text-xs font-medium text-text-primary truncate">{item.name}</p>
          {item.dimensions && <p className="text-[9px] text-text-tertiary font-mono">{item.dimensions}</p>}
        </div>
        <span className="text-[10px] text-text-tertiary font-mono hidden sm:block">{item.type.toUpperCase()}</span>
        <span className="text-[10px] text-text-tertiary font-mono hidden md:block">{formatSize(item.size)}</span>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1 text-[9px] text-text-tertiary">
            <Clock className="h-2.5 w-2.5" />
            {new Date(item.modifiedAt).toLocaleDateString()}
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function MediaGrid({ selectedFolder, selectedTag, selectedCategory, searchQuery, viewMode, onPreview }: {
  selectedFolder: string; selectedTag: string | null; selectedCategory: string | null;
  searchQuery: string; viewMode: "grid" | "list"; onPreview: (item: MediaItem) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [typeFilter, setTypeFilter] = useState<MediaType | "all">("all");

  const folder = EMPTY_FOLDERS.find((f) => f.id === selectedFolder);
  const folderPath = folder ? [folder.id, ...EMPTY_FOLDERS.filter((f) => {
    let p = folder.parent;
    while (p) { const pf = EMPTY_FOLDERS.find((ff) => ff.id === p); if (pf) { p = pf.parent; } else break; }
    return false;
  }).map((f) => f.id)] : [];

  const filtered = useMemo(() => {
    let items = [...ALL_MEDIA];
    if (typeFilter !== "all") items = items.filter((i) => i.type === typeFilter);
    if (selectedFolder !== "root") {
      const folderObj = EMPTY_FOLDERS.find((f) => f.id === selectedFolder);
      if (folderObj) items = items.filter((i) => i.folder === folderObj.name.toLowerCase().replace(/ & /g, "-"));
    }
    if (selectedTag) items = items.filter((i) => i.tags.includes(selectedTag));
    if (selectedCategory) items = items.filter((i) => i.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.tags.some((t) => t.includes(q)));
    }
    items.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return b.size - a.size;
      return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime();
    });
    return items;
  }, [typeFilter, selectedFolder, selectedTag, selectedCategory, searchQuery, sortBy]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((f) => f.id)));
  };

  return (
    <div className="flex-1 min-w-0 space-y-4">
      {/* Type filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILE_TYPE_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => setTypeFilter(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all shrink-0",
              typeFilter === opt.value
                ? "bg-accent/10 text-accent border border-accent/20"
                : "bg-surface-hover text-text-tertiary border border-transparent hover:text-text-secondary",
            )}
          >
            <opt.icon className="h-3 w-3" />
            {opt.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
          <Input placeholder="Search files..." className="pl-8 h-9 text-xs border-border-subtle bg-surface rounded-xl" />
        </div>
        <div className="flex items-center gap-1 bg-surface-hover rounded-lg p-0.5">
          <button onClick={() => {}} className={cn("p-1.5 rounded-md transition-colors", viewMode === "grid" ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary")}>
            <Grid3X3 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => {}} className={cn("p-1.5 rounded-md transition-colors", viewMode === "list" ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary")}>
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
        <button onClick={() => setSortBy(sortBy === "name" ? "date" : sortBy === "date" ? "size" : "name")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <ArrowUpDown className="h-3 w-3" />
          {sortBy === "name" ? "Name" : sortBy === "date" ? "Date" : "Size"}
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors">
          <SlidersHorizontal className="h-3 w-3" />
          Filters
        </button>
      </div>

      {/* Bulk actions bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20"
          >
            <Checkbox checked={selected.size === filtered.length} onCheckedChange={selectAll} className="h-4 w-4" />
            <span className="text-xs font-medium text-text-primary">{selected.size} selected</span>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
              <Download className="h-3 w-3" /> Download
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
              <Copy className="h-3 w-3" /> Duplicate
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 rounded-lg text-error">
              <Trash2 className="h-3 w-3" /> Delete
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File count */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-text-tertiary">{filtered.length} file{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <MediaCard key={item.id} item={item} selected={selected.has(item.id)}
                onToggleSelect={toggleSelect} onPreview={onPreview} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-1.5 text-[9px] text-text-tertiary uppercase tracking-wider font-medium">
            <div className="w-8" />
            <div className="flex-1 grid grid-cols-4 gap-4">
              <span>Name</span>
              <span className="hidden sm:block">Type</span>
              <span className="hidden md:block">Size</span>
              <span className="text-right">Modified</span>
            </div>
          </div>
          <AnimatePresence>
            {filtered.map((item) => (
              <MediaListItem key={item.id} item={item} selected={selected.has(item.id)}
                onToggleSelect={toggleSelect} onPreview={onPreview} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-3 rounded-xl bg-surface-hover mb-3">
            <Search className="h-8 w-8 text-text-tertiary" />
          </div>
          <p className="text-sm font-medium text-text-primary">No files found</p>
          <p className="text-xs text-text-tertiary mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
