"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { downloadService } from "../services/download-service";
import type { Download } from "../types";

export function useDownloads() {
  const [items, setItems] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visibility, setVisibility] = useState<"all" | "visible" | "hidden">("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setItems(await downloadService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = items;
    if (search) { const q = search.toLowerCase(); result = result.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)); }
    if (category !== "all") result = result.filter((d) => d.category === category);
    if (visibility === "visible") result = result.filter((d) => d.visible);
    if (visibility === "hidden") result = result.filter((d) => !d.visible);
    return result.sort((a, b) => a.order - b.order);
  }, [items, search, category, visibility]);

  const addDownload = useCallback(async (data: Partial<Download>) => {
    const created = await downloadService.create(data);
    setItems((prev) => [...prev, created]);
    return created;
  }, []);

  return { items, filtered, loading, error, search, setSearch, category, setCategory, visibility, setVisibility, refresh: fetchData, addDownload };
}
