"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { achievementService } from "../services/achievement-service";
import type { Achievement } from "../types";

const CATEGORIES = ["Community", "Open Source", "Hackathon", "Writing", "Speaking", "Mentorship", "Innovation"];

export function useAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setItems(await achievementService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = items;
    if (search) { const q = search.toLowerCase(); result = result.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.issuer.toLowerCase().includes(q)); }
    if (category !== "all") result = result.filter((a) => a.category === category);
    return result.sort((a, b) => a.order - b.order);
  }, [items, search, category]);

  const addAchievement = useCallback(async (data: Partial<Achievement>) => {
    const created = await achievementService.create(data);
    setItems((prev) => [...prev, created]);
    return created;
  }, []);

  return { items, filtered, loading, error, search, setSearch, category, setCategory, categories: CATEGORIES, refresh: fetchData, addAchievement };
}
