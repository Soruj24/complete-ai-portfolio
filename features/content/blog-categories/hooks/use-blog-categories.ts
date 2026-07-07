"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { blogCategoryService } from "../services/blog-category-service";
import type { BlogCategory } from "../types";

export function useBlogCategories() {
  const [items, setItems] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setItems(await blogCategoryService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }, [items, search]);

  const addCategory = useCallback(async (data: Partial<BlogCategory>) => {
    const created = await blogCategoryService.create(data);
    setItems((prev) => [...prev, created]);
    return created;
  }, []);

  return { items, filtered, loading, error, search, setSearch, refresh: fetchData, addCategory };
}
