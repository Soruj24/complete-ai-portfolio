"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMedia } from "../hooks/use-media";
import { useMediaUpload } from "../hooks/use-media-upload";
import { MediaGrid } from "./media-grid";
import { MediaSidebar } from "./media-sidebar";
import { MediaPreview } from "./media-preview";
import { MediaUploader } from "./media-uploader";
import type { MediaItem } from "../types";

export function MediaPage() {
  const {
    filtered, loading, error, selected,
    filters, setFilters, toggleSelect, selectAll, clearSelection,
    toggleFavorite, deleteSelected, refresh,
  } = useMedia();

  const upload = useMediaUpload();
  const [showUploader, setShowUploader] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  return (
    <div className="h-full flex gap-0">
      <MediaSidebar
        currentFolder={filters.folder}
        currentType={filters.type}
        onFolderChange={(f) => setFilters({ folder: f })}
        onTypeChange={(t) => setFilters({ type: t })}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <MediaGrid
          items={filtered}
          loading={loading}
          error={error}
          selected={selected}
          filters={filters}
          onToggleSelect={toggleSelect}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          onRefresh={refresh}
          onPreview={setPreviewItem}
          onFavorite={toggleFavorite}
          onFiltersChange={setFilters}
          onUploadClick={() => setShowUploader(true)}
        />
      </div>

      {showUploader && (
        <MediaUploader
          uploads={upload.uploads}
          isUploading={upload.isUploading}
          dropzoneActive={upload.dropzoneActive}
          totalProgress={upload.totalProgress}
          onAddFiles={upload.addFiles}
          onRemoveFile={upload.removeFile}
          onClearCompleted={upload.clearCompleted}
          onDropzoneActive={upload.setDropzoneActive}
          onClose={() => setShowUploader(false)}
        />
      )}

      {previewItem && (
        <MediaPreview
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          onFavorite={() => toggleFavorite(previewItem.id)}
          onDelete={() => {
            deleteSelected();
            setPreviewItem(null);
          }}
        />
      )}
    </div>
  );
}
