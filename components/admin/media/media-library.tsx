"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Clock, Star, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaSidebar } from "./media-sidebar";
import { MediaGrid } from "./media-grid";
import { MediaUploader } from "./media-uploader";
import { MediaPreviewPanel } from "./media-preview";
import type { MediaItem } from "@/features/media/types";

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

const ALL_MEDIA: MediaItem[] = [];

export function MediaLibrary() {
  const [selectedFolder, setSelectedFolder] = useState("root");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showUploader, setShowUploader] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [activeView, setActiveView] = useState<"all" | "recent" | "favorites">("all");

  const totalSize = ALL_MEDIA.reduce((s, i) => s + i.size, 0);
  const recentFiles = ALL_MEDIA.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
  const favoriteFiles = ALL_MEDIA.filter((i) => i.favorite);
  const displayFiles = activeView === "recent" ? recentFiles : activeView === "favorites" ? favoriteFiles : ALL_MEDIA;

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Media Library</h1>
            <p className="text-sm text-text-secondary mt-1 flex items-center gap-2">
              {ALL_MEDIA.length.toLocaleString()} assets &middot; {formatSize(totalSize)} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-surface-hover rounded-lg p-0.5">
              {[
                { value: "all", label: "All", icon: RefreshCw },
                { value: "recent", label: "Recent", icon: Clock },
                { value: "favorites", label: "Favorites", icon: Star },
              ].map((tab) => (
                <button key={tab.value} onClick={() => setActiveView(tab.value as typeof activeView)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all",
                    activeView === tab.value ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                  )}
                >
                  <tab.icon className="h-3 w-3" />
                  {tab.label}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowUploader(true)}
              className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs"
            >
              <Upload className="h-3.5 w-3.5" /> Upload
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <MediaSidebar
            selectedFolder={selectedFolder}
            onSelectFolder={setSelectedFolder}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Main content + optional preview panel */}
          <div className={cn("flex gap-6 flex-1 min-w-0", previewItem && "flex-col lg:flex-row")}>
            <MediaGrid
              selectedFolder={selectedFolder}
              selectedTag={selectedTag}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onPreview={setPreviewItem}
            />

            {/* Preview Panel */}
            <AnimatePresence>
              {previewItem && (
                <MediaPreviewPanel item={previewItem} onClose={() => setPreviewItem(null)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploader && <MediaUploader open={showUploader} onClose={() => setShowUploader(false)} />}
      </AnimatePresence>
    </>
  );
}
