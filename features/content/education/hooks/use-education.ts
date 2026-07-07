"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { educationService } from "../services/education-service";
import type { Education, DegreeType } from "../types";

export function useEducation() {
  const [entries, setEntries] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [degreeFilter, setDegreeFilter] = useState<DegreeType | "all">("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setEntries(await educationService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = entries;
    if (search) { const q = search.toLowerCase(); result = result.filter((e) => e.institution.toLowerCase().includes(q) || e.degree.toLowerCase().includes(q) || e.field.toLowerCase().includes(q)); }
    if (degreeFilter !== "all") result = result.filter((e) => e.degreeType === degreeFilter);
    return result.sort((a, b) => a.order - b.order);
  }, [entries, search, degreeFilter]);

  const addEntry = useCallback(async (data: Partial<Education>) => {
    const created = await educationService.create(data);
    setEntries((prev) => [...prev, created]);
    return created;
  }, []);

  return { entries, filtered, loading, error, search, setSearch, degreeFilter, setDegreeFilter, refresh: fetchData, addEntry };
}
