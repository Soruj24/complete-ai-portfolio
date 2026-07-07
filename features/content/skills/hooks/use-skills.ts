"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { skillService } from "../services/skill-service";
import type { Skill, SkillCategory } from "../types";

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setSkills(await skillService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = skills;
    if (search) { const q = search.toLowerCase(); result = result.filter((s) => s.name.toLowerCase().includes(q)); }
    if (category !== "all") result = result.filter((s) => s.category === category);
    return result.sort((a, b) => a.order - b.order);
  }, [skills, search, category]);

  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    filtered.forEach((s) => { if (!map.has(s.category)) map.set(s.category, []); map.get(s.category)!.push(s); });
    return map;
  }, [filtered]);

  const avgLevel = skills.length ? Math.round(skills.reduce((s, sk) => s + sk.level, 0) / skills.length) : 0;

  const addSkill = useCallback(async (data: Partial<Skill>) => {
    const created = await skillService.create(data);
    setSkills((prev) => [...prev, created]);
    return created;
  }, []);

  return { skills, filtered, grouped, avgLevel, loading, error, search, setSearch, category, setCategory, refresh: fetchData, addSkill };
}
