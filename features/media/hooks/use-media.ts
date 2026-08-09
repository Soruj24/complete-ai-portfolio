"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { MediaItem, MediaType, UploadFile } from "../types";
import { uploadToCloudinary, getMediaType } from "../services/upload-service";

interface UseMediaReturn {
  items: MediaItem[];
  filteredItems: MediaItem[];
  loading: boolean;
  error: string | null;
  search: string;
  typeFilter: MediaType | "all";
  selected: Set<string>;
  uploads: UploadFile[];
  isUploading: boolean;
  setSearch: (v: string) => void;
  setTypeFilter: (v: MediaType | "all") => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  deleteSelected: () => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeUpload: (id: string) => void;
  clearCompleted: () => void;
  copyUrl: (url: string) => void;
  fetchItems: () => Promise<void>;
}

export function useMedia(): UseMediaReturn {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<MediaType | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Failed to fetch media");
      const json = await res.json();
      const raw = (json.data ?? []) as Record<string, unknown>[];
      const mapped: MediaItem[] = raw.map((d) => ({
        id: String(d._id ?? d.id ?? ""),
        name: String(d.name ?? d.filename ?? "Untitled"),
        type: String(d.type ?? "image") as MediaType,
        mime: String(d.mime ?? "application/octet-stream"),
        size: Number(d.size ?? 0),
        dimensions: d.dimensions as string | undefined,
        url: String(d.url ?? ""),
        thumbnail: String(d.thumbnail ?? d.url ?? ""),
        folder: String(d.folder ?? "all"),
        tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
        category: String(d.category ?? "general"),
        favorite: Boolean(d.favorite),
        createdAt: String(d.createdAt ?? ""),
        modifiedAt: String(d.modifiedAt ?? d.updatedAt ?? ""),
        version: Number(d.version ?? 1),
        versions: Array.isArray(d.versions) ? (d.versions as MediaItem["versions"]) : [],
        alt: d.alt as string | undefined,
        duration: d.duration as string | undefined,
      }));
      setItems(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    let result = [...items];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }
    return result;
  }, [items, search, typeFilter]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected((prev) =>
      prev.size === filteredItems.length
        ? new Set()
        : new Set(filteredItems.map((i) => i.id))
    );
  }, [filteredItems]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const deleteItem = useCallback(async (id: string) => {
    try {
      await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch {
      setError("Failed to delete item");
    }
  }, []);

  const deleteSelected = useCallback(async () => {
    const ids = Array.from(selected);
    await Promise.all(ids.map((id) => fetch(`/api/admin/media/${id}`, { method: "DELETE" })));
    setItems((prev) => prev.filter((i) => !selected.has(i.id)));
    setSelected(new Set());
  }, [selected]);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const pending: UploadFile[] = fileArray.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "pending" as const,
    }));
    setUploads((prev) => [...prev, ...pending]);
    setIsUploading(true);

    for (const item of pending) {
      setUploads((prev) =>
        prev.map((u) => (u.id === item.id ? { ...u, progress: 10, status: "uploading" as const } : u))
      );
      try {
        const result = await uploadToCloudinary(item.file, (progress) => {
          setUploads((prev) =>
            prev.map((u) => (u.id === item.id ? { ...u, progress } : u))
          );
        });

        await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: item.name,
            type: getMediaType(item.file),
            mime: item.file.type,
            size: result.bytes,
            url: result.secure_url,
            thumbnail: result.secure_url,
            dimensions: result.width && result.height ? `${result.width}x${result.height}` : undefined,
            folder: "all",
            tags: [],
            category: "general",
          }),
        });

        setUploads((prev) =>
          prev.map((u) => (u.id === item.id ? { ...u, progress: 100, status: "done" as const } : u))
        );
      } catch (err) {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === item.id
              ? { ...u, status: "error" as const, error: err instanceof Error ? err.message : "Upload failed" }
              : u
          )
        );
      }
    }

    setIsUploading(false);
    fetchItems();
  }, [fetchItems]);

  const removeUpload = useCallback((id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setUploads((prev) => prev.filter((u) => u.status !== "done"));
  }, []);

  const copyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
  }, []);

  return {
    items,
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
  };
}
