"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { projectCategoryService } from "../services/project-category-service";
import type { ProjectCategory } from "../types";

export function useProjectCategories() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setCategories(await projectCategoryService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    if (!search) return categories;
    const q = search.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }, [categories, search]);

  const addCategory = useCallback(async (data: Partial<ProjectCategory>) => {
    const created = await projectCategoryService.create(data);
    setCategories((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateCategory = useCallback(async (id: string, data: Partial<ProjectCategory>) => {
    const updated = await projectCategoryService.update(id, data);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    await projectCategoryService.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { categories, filtered, loading, error, search, setSearch, setCategories, addCategory, updateCategory, deleteCategory, refresh: fetchData };
}
