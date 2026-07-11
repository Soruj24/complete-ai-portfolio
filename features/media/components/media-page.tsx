"use client";

import { useState, useMemo, useCallback } from "react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { MediaGrid } from "./media-grid";
import { MediaSidebar } from "./media-sidebar";
import { MediaPreview } from "./media-preview";
import { MediaUploader } from "./media-uploader";
import type { MediaItem, MediaFilterState, UploadFile, MediaType } from "../types";

const defaultFilters: MediaFilterState = { folder: "all", type: "all", search: "", sort: "date", order: "desc", activeTags: [], activeCategories: [] };

export function MediaPage() {
  const { data: response, isLoading, refetch } = useGetAdminResourceQuery({ resource: "media" });
  const items: MediaItem[] = useMemo(() => (response?.data ?? []).map((d: Record<string, unknown>) => ({
    id: String(d._id ?? d.id ?? ""),
    name: String(d.name ?? d.filename ?? "Untitled"),
    type: String(d.type ?? "image") as MediaType,
    mime: String(d.mime ?? "application/octet-stream"),
    size: Number(d.size ?? 0),
    url: String(d.url ?? ""),
    thumbnail: String(d.thumbnail ?? d.url ?? ""),
    folder: String(d.folder ?? "all"),
    tags: Array.isArray(d.tags) ? d.tags as string[] : [],
    category: String(d.category ?? "general"),
    favorite: Boolean(d.favorite),
    createdAt: String(d.createdAt ?? ""),
    modifiedAt: String(d.modifiedAt ?? d.updatedAt ?? ""),
    version: Number(d.version ?? 1),
    versions: Array.isArray(d.versions) ? d.versions as MediaItem["versions"] : [],
  })), [response]);

  const [filters, setFilters] = useState<MediaFilterState>(defaultFilters);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showUploader, setShowUploader] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dropzoneActive, setDropzoneActive] = useState(false);

  const filtered = useMemo(() => items.filter((item) => {
    if (filters.folder !== "all" && item.folder !== filters.folder) return false;
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }), [items, filters]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }, []);

  const selectAll = useCallback(() => {
    setSelected((prev) => prev.size === filtered.length ? new Set() : new Set(filtered.map((i) => i.id)));
  }, [filtered]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const toggleFavorite = useCallback((id: string) => {
    fetch(`/api/admin/media/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ favorite: !items.find((i) => i.id === id)?.favorite }) });
  }, [items]);

  const deleteSelected = useCallback(() => {
    for (const id of selected) { fetch(`/api/admin/media/${id}`, { method: "DELETE" }); }
    setSelected(new Set());
    refetch();
  }, [selected, refetch]);

  const totalProgress = uploads.length ? Math.round(uploads.reduce((s: number, u) => s + u.progress, 0) / uploads.length) : 0;

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const pending: UploadFile[] = fileArray.map((file) => ({
      id: crypto.randomUUID(), file, name: file.name, size: file.size, type: file.type, progress: 0, status: "pending" as const,
    }));
    setUploads((prev) => [...prev, ...pending]);
    setIsUploading(true);
    for (const item of pending) {
      setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: 50, status: "uploading" as const } : u));
      await new Promise((r) => setTimeout(r, 500));
      setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: 100, status: "done" as const } : u));
    }
    setIsUploading(false);
    refetch();
  }, [refetch]);

  const removeFile = useCallback((id: string) => { setUploads((prev) => prev.filter((u) => u.id !== id)); }, []);
  const clearCompleted = useCallback(() => { setUploads((prev) => prev.filter((u) => u.status !== "done")); }, []);

  return (
    <div className="h-full flex gap-0">
      <MediaSidebar
        currentFolder={filters.folder}
        currentType={filters.type}
        onFolderChange={(f: string) => setFilters((prev) => ({ ...prev, folder: f }))}
        onTypeChange={(t: MediaType | "all") => setFilters((prev) => ({ ...prev, type: t }))}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <MediaGrid
          items={filtered}
          loading={isLoading}
          error={null}
          selected={selected}
          filters={filters}
          onToggleSelect={toggleSelect}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          onRefresh={refetch}
          onPreview={setPreviewItem}
          onFavorite={toggleFavorite}
          onFiltersChange={(f: Partial<MediaFilterState>) => setFilters((prev) => ({ ...prev, ...f }))}
          onUploadClick={() => setShowUploader(true)}
        />
      </div>
      {showUploader && (
        <MediaUploader
          uploads={uploads}
          isUploading={isUploading}
          dropzoneActive={dropzoneActive}
          totalProgress={totalProgress}
          onAddFiles={addFiles}
          onRemoveFile={removeFile}
          onClearCompleted={clearCompleted}
          onDropzoneActive={setDropzoneActive}
          onClose={() => setShowUploader(false)}
        />
      )}
      {previewItem && (
        <MediaPreview
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          onFavorite={() => toggleFavorite(previewItem.id)}
          onDelete={() => { deleteSelected(); setPreviewItem(null); }}
        />
      )}
    </div>
  );
}
