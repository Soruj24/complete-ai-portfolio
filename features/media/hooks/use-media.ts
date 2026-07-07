"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { mediaService } from "../services/media-service";
import type { MediaItem, MediaFilterState } from "../types";

interface UseMediaReturn {
  items: MediaItem[];
  filtered: MediaItem[];
  loading: boolean;
  error: string | null;
  selected: Set<string>;
  filters: MediaFilterState;
  setFilters: (filters: Partial<MediaFilterState>) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  toggleFavorite: (id: string) => Promise<void>;
  deleteSelected: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useMedia(): UseMediaReturn {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filters, setFiltersState] = useState<MediaFilterState>({
    search: "", type: "all", folder: "", sort: "date", order: "desc",
    activeTags: [], activeCategories: [],
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mediaService.getAll();
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = useMemo(() => {
    let result = [...items];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q) || m.tags.some((t) => t.includes(q)));
    }
    result = mediaService.filterByType(result, filters.type);
    result = mediaService.filterByFolder(result, filters.folder);
    result = mediaService.filterByTags(result, filters.activeTags);
    if (filters.activeCategories.length) {
      result = result.filter((m) => filters.activeCategories.includes(m.category));
    }
    result = mediaService.sort(result, filters.sort, filters.order);
    return result;
  }, [items, filters]);

  const setFilters = useCallback((partial: Partial<MediaFilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(filtered.map((m) => m.id)));
  }, [filtered]);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    try {
      const updated = await mediaService.toggleFavorite(id);
      setItems((prev) => prev.map((m) => m.id === id ? updated : m));
    } catch {
      // handled by service
    }
  }, []);

  const deleteSelected = useCallback(async () => {
    const ids = Array.from(selected);
    await mediaService.deleteItems(ids);
    setItems((prev) => prev.filter((m) => !selected.has(m.id)));
    setSelected(new Set());
  }, [selected]);

  return {
    items, filtered, loading, error,
    selected, filters, setFilters,
    toggleSelect, selectAll, clearSelection,
    toggleFavorite, deleteSelected, refresh: fetchItems,
  };
}
