"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SIDEBAR_ANIMATION } from "../animations/media-animations";
import { FOLDERS, TAGS, CATEGORIES, MOCK_STORAGE } from "../constants";
import { formatSize } from "../utils";
import { Folder, FolderOpen, Image, Video, FileText, Shapes, Upload, Briefcase, Brain, ShoppingCart, Palette, Monitor, Music } from "lucide-react";
import type { MediaType } from "../types";

const folderIcons: Record<string, React.ElementType> = {
  Folder, FolderOpen, Image, Video, FileText, Shapes, Upload, Briefcase, Brain, ShoppingCart, Palette, Monitor, Music,
};

function FolderTree({ currentFolder, onFolderChange }: { currentFolder: string; onFolderChange: (f: string) => void }) {
  const renderFolder = (folderId: string, depth = 0) => {
    const folder = FOLDERS.find((f) => f.id === folderId);
    if (!folder) return null;
    const children = FOLDERS.filter((f) => f.parent === folderId);
    const Icon = folderIcons[folder.icon] || Folder;
    const isActive = currentFolder === folder.id;

    return (
      <div key={folder.id}>
        <button onClick={() => onFolderChange(isActive && depth > 0 ? "" : folder.id)}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all group",
            isActive ? "bg-accent/10 text-accent" : "text-text-tertiary hover:text-text-secondary hover:bg-surface-hover",
          )}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
        >
          <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive && "text-accent")} />
          <span className="truncate flex-1 text-left">{folder.name}</span>
          {folder.count > 0 && (
            <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 shrink-0", isActive ? "bg-accent/10 text-accent" : "bg-surface-hover text-text-tertiary")}>
              {folder.count}
            </Badge>
          )}
        </button>
        {children.map((child) => renderFolder(child.id, depth + 1))}
      </div>
    );
  };

  return <div className="space-y-0.5">{renderFolder("root")}</div>;
}

export function MediaSidebar({ currentFolder, currentType, onFolderChange, onTypeChange }: {
  currentFolder: string; currentType: MediaType | "all";
  onFolderChange: (f: string) => void; onTypeChange: (t: MediaType | "all") => void;
}) {
  const usedPercent = (MOCK_STORAGE.used / MOCK_STORAGE.total) * 100;

  return (
    <motion.aside variants={SIDEBAR_ANIMATION.container} initial="hidden" animate="visible"
      className="w-56 shrink-0 border-r border-border-subtle bg-background flex flex-col overflow-y-auto no-scrollbar"
    >
      <div className="p-3 space-y-4">
        <div>
          <p className="text-[9px] font-semibold text-text-tertiary uppercase tracking-wider mb-1.5 px-2">Folders</p>
          <FolderTree currentFolder={currentFolder} onFolderChange={onFolderChange} />
        </div>

        <div>
          <p className="text-[9px] font-semibold text-text-tertiary uppercase tracking-wider mb-1.5 px-2">Tags</p>
          <div className="flex flex-wrap gap-1 px-2">
            {TAGS.slice(0, 6).map((tag) => (
              <Badge key={tag.id}
                className="text-[7px] px-1.5 py-0.5 rounded-full border border-border-subtle bg-surface-hover text-text-tertiary font-normal cursor-pointer hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-semibold text-text-tertiary uppercase tracking-wider mb-1.5 px-2">Categories</p>
          <div className="space-y-0.5 px-2">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <div key={cat.id} className="flex items-center justify-between text-[10px] text-text-tertiary py-0.5">
                <span>{cat.name}</span>
                <span className="font-mono text-[8px]">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-2">
          <p className="text-[9px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">Storage</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="text-text-tertiary">Used</span>
              <span className="text-text-primary font-mono font-medium">{formatSize(MOCK_STORAGE.used)}</span>
            </div>
            <Progress value={usedPercent} className="h-1.5 bg-surface-hover" />
            <div className="text-[8px] text-text-tertiary">{formatSize(MOCK_STORAGE.total)} total</div>
            <div className="space-y-1 pt-1">
              {[
                { label: "Images", value: MOCK_STORAGE.images, color: "bg-accent" },
                { label: "Videos", value: MOCK_STORAGE.videos, color: "bg-purple-500" },
                { label: "Documents", value: MOCK_STORAGE.documents, color: "bg-info" },
                { label: "Icons", value: MOCK_STORAGE.icons, color: "bg-amber-500" },
                { label: "Audio", value: MOCK_STORAGE.audio, color: "bg-pink-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-[8px] text-text-tertiary">
                  <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", s.color)} />
                  <span className="flex-1">{s.label}</span>
                  <span className="font-mono">{formatSize(s.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
