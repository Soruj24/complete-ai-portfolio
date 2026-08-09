"use client";

import { useState } from "react";
import { Search, Upload, RefreshCw, Image, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMedia } from "../hooks/use-media";
import { MediaGrid } from "./media-grid";
import { MediaUploader } from "./media-uploader";
import { MediaPreview } from "./media-preview";
import { FILE_TYPE_OPTIONS } from "../constants";
import type { MediaItem, MediaType } from "../types";
import { cn } from "@/lib/utils";

export function MediaPage() {
  const {
    filteredItems,
    loading,
    error,
    search,
    typeFilter,
    selected,
    uploads,
    isUploading,
    setSearch,
    setTypeFilter,
    toggleSelect,
    selectAll,
    clearSelection,
    deleteSelected,
    deleteItem,
    addFiles,
    removeUpload,
    clearCompleted,
    copyUrl,
    fetchItems,
  } = useMedia();

  const [showUploader, setShowUploader] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-[13px] font-medium text-text-primary">Failed to load media</p>
        <p className="text-[12px] text-text-tertiary mt-1">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchItems} className="mt-4 h-8 text-[13px]">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="shrink-0 p-4 pb-3 space-y-3 border-b border-border-subtle">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Media Library</h1>
            <p className="text-[12px] text-text-tertiary">Manage images and files for your portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchItems} disabled={loading} className="h-8 text-[13px] gap-1.5">
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button size="sm" onClick={() => setShowUploader(true)} className="h-8 text-[13px] gap-1.5">
              <Upload className="h-3.5 w-3.5" /> Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
            <Input
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-[13px] rounded-md border-border-subtle bg-surface"
            />
          </div>

          <div className="flex flex-wrap gap-1 rounded-md border border-border-subtle bg-surface p-0.5">
            {FILE_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(opt.value as MediaType | "all")}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-medium transition-colors",
                  typeFilter === opt.value
                    ? "bg-accent text-accent-foreground"
                    : "text-text-tertiary hover:text-text-primary"
                )}
              >
                <opt.icon className="h-3 w-3" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        <MediaGrid
          items={filteredItems}
          loading={loading}
          selected={selected}
          search={search}
          typeFilter={typeFilter}
          onToggleSelect={toggleSelect}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          onRefresh={fetchItems}
          onPreview={setPreviewItem}
          onSearchChange={setSearch}
          onTypeFilterChange={setTypeFilter}
          onUploadClick={() => setShowUploader(true)}
        />

        {previewItem && (
          <MediaPreview
            item={previewItem}
            onClose={() => setPreviewItem(null)}
            onCopyUrl={copyUrl}
            onDelete={(id) => {
              deleteItem(id);
              setPreviewItem(null);
            }}
          />
        )}
      </div>

      {showUploader && (
        <MediaUploader
          uploads={uploads}
          isUploading={isUploading}
          onAddFiles={addFiles}
          onRemoveFile={removeUpload}
          onClearCompleted={clearCompleted}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  );
}
