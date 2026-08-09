"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Skill, SkillCategory, SkillFormData } from "../types";

interface UseSkillsReturn {
  skills: Skill[];
  filteredSkills: Skill[];
  stats: { total: number; enabled: number; featured: number; categories: number };
  loading: boolean;
  error: string | null;
  search: string;
  categoryFilter: string;
  selected: string[];
  setSearch: (v: string) => void;
  setCategoryFilter: (v: string) => void;
  setSelected: (v: string[]) => void;
  toggleSelectAll: () => void;
  toggleSelect: (id: string) => void;
  fetchSkills: () => Promise<void>;
  createSkill: (data: SkillFormData) => Promise<void>;
  updateSkill: (id: string, data: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  toggleFeatured: (id: string, featured: boolean) => Promise<void>;
  toggleEnabled: (id: string, enabled: boolean) => Promise<void>;
  updateOrder: (id: string, order: number) => Promise<void>;
  moveUp: (id: string) => Promise<void>;
  moveDown: (id: string) => Promise<void>;
  duplicateSkill: (skill: Skill) => Promise<void>;
}

export function useSkills(): UseSkillsReturn {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      const json = await res.json();
      const raw = (json.data ?? []) as Record<string, unknown>[];
      const mapped: Skill[] = raw.map((s) => ({
        _id: (s._id as string) || "",
        id: (s._id as string) || "",
        name: (s.name as string) || "",
        slug: s.slug as string,
        category: (s.category as SkillCategory) || "frontend",
        level: (s.level as number) || 0,
        icon: s.icon as string,
        color: (s.color as string) || "#3b82f6",
        description: s.description as string,
        technologies: (s.technologies as string[]) || [],
        yearsOfExperience: (s.yearsOfExperience as number) || 0,
        order: (s.order as number) || 0,
        featured: (s.featured as boolean) || false,
        enabled: s.enabled !== false,
        createdAt: s.createdAt as string,
        updatedAt: s.updatedAt as string,
      }));
      mapped.sort((a, b) => a.order - b.order);
      setSkills(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const filteredSkills = useMemo(() => {
    let result = [...skills];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((s) => s.category === categoryFilter);
    }
    return result;
  }, [skills, search, categoryFilter]);

  const stats = useMemo(() => ({
    total: skills.length,
    enabled: skills.filter((s) => s.enabled).length,
    featured: skills.filter((s) => s.featured).length,
    categories: new Set(skills.map((s) => s.category)).size,
  }), [skills]);

  const toggleSelectAll = useCallback(() => {
    if (selected.length === filteredSkills.length) {
      setSelected([]);
    } else {
      setSelected(filteredSkills.map((s) => s._id));
    }
  }, [selected.length, filteredSkills]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  }, []);

  const createSkill = useCallback(async (data: SkillFormData) => {
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }),
    });
    if (!res.ok) throw new Error("Failed to create skill");
    await fetchSkills();
  }, [fetchSkills]);

  const updateSkill = useCallback(async (id: string, data: Partial<Skill>) => {
    const res = await fetch("/api/admin/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) throw new Error("Failed to update skill");
    await fetchSkills();
  }, [fetchSkills]);

  const deleteSkill = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete skill");
    setSelected((prev) => prev.filter((s) => s !== id));
    await fetchSkills();
  }, [fetchSkills]);

  const bulkDelete = useCallback(async (ids: string[]) => {
    const res = await fetch("/api/admin/skills/bulk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Failed to delete skills");
    setSelected([]);
    await fetchSkills();
  }, [fetchSkills]);

  const toggleFeatured = useCallback(async (id: string, featured: boolean) => {
    setSkills((prev) => prev.map((s) => s._id === id ? { ...s, featured } : s));
    try {
      await updateSkill(id, { featured });
    } catch {
      setSkills((prev) => prev.map((s) => s._id === id ? { ...s, featured: !featured } : s));
    }
  }, [updateSkill]);

  const toggleEnabled = useCallback(async (id: string, enabled: boolean) => {
    setSkills((prev) => prev.map((s) => s._id === id ? { ...s, enabled } : s));
    try {
      await updateSkill(id, { enabled });
    } catch {
      setSkills((prev) => prev.map((s) => s._id === id ? { ...s, enabled: !enabled } : s));
    }
  }, [updateSkill]);

  const updateOrder = useCallback(async (id: string, order: number) => {
    setSkills((prev) => prev.map((s) => s._id === id ? { ...s, order } : s).sort((a, b) => a.order - b.order));
    try {
      await updateSkill(id, { order });
    } catch {
      await fetchSkills();
    }
  }, [updateSkill, fetchSkills]);

  const moveUp = useCallback(async (id: string) => {
    const idx = skills.findIndex((s) => s._id === id);
    if (idx <= 0) return;
    const prevOrder = skills[idx].order;
    const newOrder = skills[idx - 1].order;
    await updateOrder(id, newOrder);
    await updateSkill(skills[idx - 1]._id, { order: prevOrder });
    await fetchSkills();
  }, [skills, updateOrder, updateSkill, fetchSkills]);

  const moveDown = useCallback(async (id: string) => {
    const idx = skills.findIndex((s) => s._id === id);
    if (idx < 0 || idx >= skills.length - 1) return;
    const prevOrder = skills[idx].order;
    const newOrder = skills[idx + 1].order;
    await updateOrder(id, newOrder);
    await updateSkill(skills[idx + 1]._id, { order: prevOrder });
    await fetchSkills();
  }, [skills, updateOrder, updateSkill, fetchSkills]);

  const duplicateSkill = useCallback(async (skill: Skill) => {
    const { _id, id, createdAt, updatedAt, ...rest } = skill;
    await createSkill({
      ...rest,
      name: `${rest.name} (Copy)`,
      slug: "",
      enabled: false,
    } as SkillFormData);
  }, [createSkill]);

  return {
    skills,
    filteredSkills,
    stats,
    loading,
    error,
    search,
    categoryFilter,
    selected,
    setSearch,
    setCategoryFilter,
    setSelected,
    toggleSelectAll,
    toggleSelect,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    bulkDelete,
    toggleFeatured,
    toggleEnabled,
    updateOrder,
    moveUp,
    moveDown,
    duplicateSkill,
  };
}
