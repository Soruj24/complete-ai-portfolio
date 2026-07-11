"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Folder, FolderOpen, Image, Video, FileText, Shapes, Upload,
  Briefcase, Brain, ShoppingCart, Palette, Monitor, Music,
  ChevronDown, ChevronRight, Tag, Layers, HardDrive, Search as SearchIcon,
  Plus,
} from "lucide-react";
function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

interface FolderItem {
  id: string;
  name: string;
  parent: string | null;
  count: number;
  icon: string;
}

interface TagItem {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

interface StorageStatsData {
  total: number;
  used: number;
  images: number;
  videos: number;
  documents: number;
  icons: number;
  audio: number;
}

const EMPTY_FOLDERS: FolderItem[] = [];
const EMPTY_TAGS: TagItem[] = [];
const EMPTY_CATEGORIES: CategoryItem[] = [];
const EMPTY_STORAGE: StorageStatsData = { total: 0, used: 0, images: 0, videos: 0, documents: 0, icons: 0, audio: 0 };

const folderIcons: Record<string, React.ElementType> = {
  Folder, Image, Video, FileText, Shapes, Upload,
  Briefcase, Brain, ShoppingCart, Palette, Monitor, Music,
};

const tagColors: Record<string, string> = {
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success/10 text-success border-success/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  info: "bg-info/10 text-info border-info/20",
  pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  slate: "bg-surface-hover text-text-tertiary border-border-subtle",
};

function FolderTreeNode({ folder, depth = 0, selected, onSelect }: {
  folder: FolderItem; depth: number; selected: string; onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const children = EMPTY_FOLDERS.filter((f) => f.parent === folder.id);
  const hasChildren = children.length > 0;
  const Icon = folderIcons[folder.icon] || Folder;
  const isSelected = selected === folder.id;

  return (
    <div>
      <button
        onClick={() => { onSelect(folder.id); if (hasChildren) setExpanded(!expanded); }}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all group",
          isSelected ? "bg-accent/10 text-accent font-medium" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="h-3 w-3 shrink-0 text-text-tertiary" /> : <ChevronRight className="h-3 w-3 shrink-0 text-text-tertiary" />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate flex-1 text-left">{folder.name}</span>
        {folder.count > 0 && <span className="text-[10px] text-text-tertiary font-mono">{folder.count}</span>}
      </button>
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {children.map((child) => (
              <FolderTreeNode key={child.id} folder={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MediaSidebar({
  selectedFolder, onSelectFolder, selectedTag, onSelectTag, selectedCategory, onSelectCategory,
}: {
  selectedFolder: string; onSelectFolder: (id: string) => void;
  selectedTag: string | null; onSelectTag: (name: string | null) => void;
  selectedCategory: string | null; onSelectCategory: (name: string | null) => void;
}) {
  const STORAGE_STATS = EMPTY_STORAGE;
  const usedPercent = STORAGE_STATS.total > 0 ? (STORAGE_STATS.used / STORAGE_STATS.total) * 100 : 0;

  return (
    <div className="w-64 shrink-0 space-y-4">
      {/* Folders */}
      <div className="rounded-xl border border-border-subtle bg-surface p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Folders</h3>
          <button className="h-5 w-5 rounded flex items-center justify-center text-text-tertiary hover:bg-surface-hover hover:text-text-primary">
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-0.5">
          {EMPTY_FOLDERS.filter((f) => f.parent === null).map((folder) => (
            <FolderTreeNode key={folder.id} folder={folder} depth={0} selected={selectedFolder} onSelect={onSelectFolder} />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-xl border border-border-subtle bg-surface p-3">
        <h3 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">Tags</h3>
        <div className="flex flex-wrap gap-1.5">
          {EMPTY_TAGS.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onSelectTag(selectedTag === tag.name ? null : tag.name)}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all",
                selectedTag === tag.name
                  ? tagColors[tag.color]
                  : "bg-surface-hover text-text-tertiary border-transparent hover:text-text-secondary",
              )}
            >
              <Tag className="h-2.5 w-2.5" />
              {tag.name}
              <span className="opacity-60">{tag.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-xl border border-border-subtle bg-surface p-3">
        <h3 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">Categories</h3>
        <div className="space-y-0.5">
          {EMPTY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(selectedCategory === cat.name ? null : cat.name)}
              className={cn(
                "w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-all",
                selectedCategory === cat.name
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
              )}
            >
              <span className="flex items-center gap-2">
                <Layers className="h-3 w-3" />
                {cat.name}
              </span>
              <span className="text-[10px] text-text-tertiary font-mono">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="rounded-xl border border-border-subtle bg-surface p-3">
        <h3 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Storage</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-text-primary font-medium">{formatSize(STORAGE_STATS.used)}</span>
            <span className="text-text-tertiary">of {formatSize(STORAGE_STATS.total)}</span>
          </div>
          <Progress value={usedPercent} className="h-2 bg-background [&>div]:bg-accent" />
          <div className="space-y-1.5 mt-3">
            {([
              { label: "Images", used: STORAGE_STATS.images, color: "bg-accent" },
              { label: "Videos", used: STORAGE_STATS.videos, color: "bg-purple-500" },
              { label: "Documents", used: STORAGE_STATS.documents, color: "bg-info" },
              { label: "Icons/SVG", used: STORAGE_STATS.icons, color: "bg-amber-500" },
              { label: "Audio", used: STORAGE_STATS.audio, color: "bg-pink-500" },
            ] as const).map((item) => (
              <div key={item.label} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", item.color)} />
                  <span className="text-text-tertiary">{item.label}</span>
                </div>
                <span className="text-text-secondary font-mono">{formatSize(item.used)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
