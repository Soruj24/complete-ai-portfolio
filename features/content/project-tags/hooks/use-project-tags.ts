"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { projectTagService } from "../services/project-tag-service";
import type { ProjectTag } from "../types";

export function useProjectTags() {
  const [tags, setTags] = useState<ProjectTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setTags(await projectTagService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    if (!search) return tags;
    const q = search.toLowerCase();
    return tags.filter((t) => t.name.toLowerCase().includes(q));
  }, [tags, search]);

  const addTag = useCallback(async (data: Partial<ProjectTag>) => {
    const created = await projectTagService.create(data);
    setTags((prev) => [...prev, created]);
    return created;
  }, []);

  return { tags, filtered, loading, error, search, setSearch, refresh: fetchData, addTag };
}
