"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  X, Download, Star, Trash2, Copy, Edit3, RotateCcw,
  Image, FileText, Video, Shapes, Music, Tag, Folder,
  Clock, HardDrive, Maximize2, Split, Shrink, History,
  Check, AlertCircle, FileSymlink, ExternalLink,
} from "lucide-react";
import type { MediaItem } from "@/features/media/types";

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

interface TagItem {
  id: string;
  name: string;
  count: number;
  color: string;
}

const EMPTY_FOLDERS: FolderItem[] = [];
const EMPTY_TAGS: TagItem[] = [];

const fileTypeLabels: Record<string, string> = {
  image: "Image", video: "Video", pdf: "PDF", document: "Document",
  icon: "Icon", svg: "SVG", audio: "Audio",
};

export function MediaPreviewPanel({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("details");
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item?.name || "");

  if (!item) return null;

  const Icon = fileTypeLabels[item.type] ? {
    image: Image, video: Video, pdf: FileText, document: FileText,
    icon: Shapes, svg: Shapes, audio: Music,
  }[item.type] || FileText : FileText;

  const typeColor = getTypeColor(item.type);

  const handleRename = () => {
    setIsRenaming(false);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="w-96 shrink-0 border-l border-border-subtle bg-surface overflow-y-auto no-scrollbar"
    >
      {/* Header */}
      <div className="p-4 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className={cn("p-2 rounded-xl", typeColor)}>
            <Icon className="h-5 w-5" />
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-hover">
            <X className="h-4 w-4" />
          </button>
        </div>

        {isRenaming ? (
          <div className="flex items-center gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)}
              autoFocus className="h-8 text-xs border-border-subtle bg-background rounded-lg flex-1"
              onKeyDown={(e) => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setIsRenaming(false); }}
            />
            <Button size="icon" variant="ghost" onClick={handleRename} className="h-8 w-8 rounded-lg">
              <Check className="h-3.5 w-3.5 text-success" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text-primary truncate flex-1">{item.name}</h3>
            <button onClick={() => { setIsRenaming(true); setNewName(item.name); }} className="h-6 w-6 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary">
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <Badge className={cn("text-[8px] px-1.5 py-0 rounded border-0 font-medium", typeColor)}>
            {fileTypeLabels[item.type] || item.type.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded border-border-subtle text-text-tertiary">
            v{item.version}
          </Badge>
        </div>
      </div>

      {/* Preview */}
      <div className="aspect-[4/3] bg-background flex items-center justify-center border-b border-border-subtle">
        <div className={cn("p-6 rounded-2xl", typeColor)}>
          <Icon className="h-16 w-16" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-1 p-3 border-b border-border-subtle">
        {[
          { icon: Download, label: "Download", color: "text-text-primary" },
          { icon: Star, label: "Favorite", color: item.favorite ? "text-amber-500" : "text-text-primary" },
          { icon: Copy, label: "Duplicate", color: "text-text-primary" },
          { icon: Trash2, label: "Delete", color: "text-error" },
        ].map((action) => (
          <button key={action.label}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-hover transition-colors group"
          >
            <action.icon className={cn("h-4 w-4", action.color, "group-hover:scale-110 transition-transform")} />
            <span className="text-[8px] text-text-tertiary">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Optimization options */}
      <div className="p-3 border-b border-border-subtle space-y-2">
        <p className="text-[10px] font-semibold text-text-primary">Optimization</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Shrink, label: "Compress", desc: "Reduce file size" },
            { icon: Maximize2, label: "Optimize", desc: "WebP conversion" },
            { icon: Split, label: "Resize", desc: `1920x1080 → 1280x720` },
            { icon: RotateCcw, label: "Restore", desc: "Original quality" },
          ].map((opt) => (
            <button key={opt.label}
              className="flex items-center gap-2 p-2 rounded-lg bg-surface-hover hover:bg-background transition-colors text-left"
            >
              <div className="p-1 rounded-md bg-background">
                <opt.icon className="h-3 w-3 text-text-secondary" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-text-primary">{opt.label}</p>
                <p className="text-[8px] text-text-tertiary">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs: Details / Versions */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-3 pt-3">
          <TabsList className="bg-surface-hover p-0.5 rounded-lg w-full">
            <TabsTrigger value="details" className="flex-1 rounded-md text-[10px] data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7">Details</TabsTrigger>
            <TabsTrigger value="versions" className="flex-1 rounded-md text-[10px] data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7">Versions</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details" className="p-3 space-y-3">
          {[
            { label: "Type", value: fileTypeLabels[item.type], icon: Icon },
            { label: "Size", value: formatSize(item.size), icon: HardDrive },
            { label: "Dimensions", value: item.dimensions || "-", icon: Maximize2 },
            { label: "Created", value: new Date(item.createdAt).toLocaleDateString(), icon: Clock },
            { label: "Modified", value: new Date(item.modifiedAt).toLocaleDateString(), icon: Clock },
            { label: "Folder", value: EMPTY_FOLDERS.find((f) => f.id === item.folder)?.name || item.folder, icon: Folder },
          ].map((field) => (
            <div key={field.label} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
                <field.icon className="h-3 w-3" />
                {field.label}
              </div>
              <span className="text-[10px] text-text-primary font-medium">{field.value}</span>
            </div>
          ))}

          <Separator className="bg-border-subtle" />

          {/* Tags */}
          <div>
            <p className="text-[10px] text-text-tertiary mb-1.5 flex items-center gap-1">
              <Tag className="h-3 w-3" /> Tags
            </p>
            <div className="flex flex-wrap gap-1">
              {item.tags.length > 0 ? item.tags.map((tag) => {
                const tagDef = EMPTY_TAGS.find((t) => t.name === tag);
                return (
                  <Badge key={tag} variant="outline" className="text-[8px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
                    {tag}
                  </Badge>
                );
              }) : (
                <span className="text-[9px] text-text-tertiary/60 italic">No tags</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-text-tertiary">Category:</p>
            <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
              {item.category}
            </Badge>
          </div>
        </TabsContent>

        <TabsContent value="versions" className="p-3 space-y-2">
          {item.versions.map((version) => (
            <div key={version.version}
              className={cn(
                "p-3 rounded-xl border transition-all",
                version.version === item.version
                  ? "border-accent/30 bg-accent/5"
                  : "border-border-subtle bg-surface-hover",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "h-6 w-6 rounded-lg flex items-center justify-center text-[9px] font-bold",
                    version.version === item.version ? "bg-accent/10 text-accent" : "bg-background text-text-tertiary",
                  )}>
                    v{version.version}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-text-primary">{version.note}</p>
                    <p className="text-[8px] text-text-tertiary">{new Date(version.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {version.version === item.version && (
                    <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-accent/10 text-accent">Current</Badge>
                  )}
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg opacity-0 group-hover:opacity-100">
                    <RotateCcw className="h-3 w-3 text-text-tertiary" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[8px] text-text-tertiary font-mono">
                <span>{formatSize(version.size)}</span>
                {version.dimensions && <span>{version.dimensions}</span>}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
