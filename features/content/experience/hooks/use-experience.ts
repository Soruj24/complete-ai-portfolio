"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { experienceService } from "../services/experience-service";
import type { Experience, EmploymentType } from "../types";

export function useExperience() {
  const [entries, setEntries] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<EmploymentType | "all">("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setEntries(await experienceService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = entries;
    if (search) { const q = search.toLowerCase(); result = result.filter((e) => e.company.toLowerCase().includes(q) || e.position.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)); }
    if (typeFilter !== "all") result = result.filter((e) => e.employmentType === typeFilter);
    return result.sort((a, b) => a.order - b.order);
  }, [entries, search, typeFilter]);

  const totalYears = entries.filter((e) => !e.current).reduce((s, e) => {
    const start = new Date(e.startDate).getTime();
    const end = e.endDate ? new Date(e.endDate).getTime() : Date.now();
    return s + (end - start) / (365.25 * 86400000);
  }, 0);

  const addEntry = useCallback(async (data: Partial<Experience>) => {
    const created = await experienceService.create(data);
    setEntries((prev) => [...prev, created]);
    return created;
  }, []);

  return { entries, filtered, loading, error, search, setSearch, typeFilter, setTypeFilter, totalYears: Math.round(totalYears), refresh: fetchData, addEntry };
}
