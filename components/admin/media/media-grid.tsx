"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Grid3X3, List, Search, SlidersHorizontal, ArrowUpDown,
  Download, Copy, Trash2,
} from "lucide-react";
import { FILE_TYPE_OPTIONS } from "./media-constants";
import { MediaCard } from "./media-card";
import { MediaListItem } from "./media-list-item";
import type { MediaItem, MediaType } from "@/features/media/types";

interface FolderItem {
  id: string;
  name: string;
  parent: string | null;
  count: number;
  icon: string;
}

const ALL_MEDIA: MediaItem[] = [];
const EMPTY_FOLDERS: FolderItem[] = [];

export function MediaGrid({ selectedFolder, selectedTag, selectedCategory, searchQuery, viewMode, onPreview }: {
  selectedFolder: string; selectedTag: string | null; selectedCategory: string | null;
  searchQuery: string; viewMode: "grid" | "list"; onPreview: (item: MediaItem) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [typeFilter, setTypeFilter] = useState<MediaType | "all">("all");

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

      <div className="flex items-center justify-between">
        <p className="text-[10px] text-text-tertiary">{filtered.length} file{filtered.length !== 1 ? "s" : ""}</p>
      </div>

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
