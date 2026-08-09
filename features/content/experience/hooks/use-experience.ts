"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Experience, ExperienceFormData } from "../types";

interface UseExperienceReturn {
  experiences: Experience[];
  filteredExperiences: Experience[];
  stats: { total: number; enabled: number; current: number; companies: number };
  loading: boolean;
  error: string | null;
  search: string;
  typeFilter: string;
  selected: string[];
  setSearch: (v: string) => void;
  setTypeFilter: (v: string) => void;
  setSelected: (v: string[]) => void;
  toggleSelectAll: () => void;
  toggleSelect: (id: string) => void;
  fetchExperiences: () => Promise<void>;
  createExperience: (data: ExperienceFormData) => Promise<void>;
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  toggleEnabled: (id: string, enabled: boolean) => Promise<void>;
  updateOrder: (id: string, order: number) => Promise<void>;
  moveUp: (id: string) => Promise<void>;
  moveDown: (id: string) => Promise<void>;
  duplicateExperience: (exp: Experience) => Promise<void>;
}

export function useExperience(): UseExperienceReturn {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/experience");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const json = await res.json();
      const raw = (json.data ?? []) as Record<string, unknown>[];
      const mapped: Experience[] = raw.map((e) => ({
        _id: (e._id as string) || "",
        id: (e._id as string) || "",
        role: (e.role as string) || (e.position as string) || "",
        company: (e.company as string) || "",
        location: (e.location as string) || "",
        employmentType: (e.employmentType as Experience["employmentType"]) || "full-time",
        startDate: (e.startDate as string) || "",
        endDate: (e.endDate as string) || null,
        current: (e.current as boolean) || false,
        description: (e.description as string) || "",
        responsibilities: (e.responsibilities as string[]) || [],
        technologies: (e.technologies as string[]) || (e.techStack as string[]) || [],
        achievements: (e.achievements as string[]) || [],
        order: (e.order as number) || 0,
        enabled: e.enabled !== false,
        createdAt: e.createdAt as string,
        updatedAt: e.updatedAt as string,
      }));
      mapped.sort((a, b) => a.order - b.order);
      setExperiences(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const filteredExperiences = useMemo(() => {
    let result = [...experiences];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.role.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q) ||
          e.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (typeFilter !== "all") {
      result = result.filter((e) => e.employmentType === typeFilter);
    }
    return result;
  }, [experiences, search, typeFilter]);

  const stats = useMemo(() => ({
    total: experiences.length,
    enabled: experiences.filter((e) => e.enabled).length,
    current: experiences.filter((e) => e.current).length,
    companies: new Set(experiences.map((e) => e.company)).size,
  }), [experiences]);

  const toggleSelectAll = useCallback(() => {
    if (selected.length === filteredExperiences.length) {
      setSelected([]);
    } else {
      setSelected(filteredExperiences.map((e) => e._id));
    }
  }, [selected.length, filteredExperiences]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  }, []);

  const createExperience = useCallback(async (data: ExperienceFormData) => {
    const res = await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create experience");
    await fetchExperiences();
  }, [fetchExperiences]);

  const updateExperience = useCallback(async (id: string, data: Partial<Experience>) => {
    const res = await fetch(`/api/experience/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update experience");
    await fetchExperiences();
  }, [fetchExperiences]);

  const deleteExperience = useCallback(async (id: string) => {
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete experience");
    setSelected((prev) => prev.filter((s) => s !== id));
    await fetchExperiences();
  }, [fetchExperiences]);

  const bulkDelete = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => fetch(`/api/experience/${id}`, { method: "DELETE" })));
    setSelected([]);
    await fetchExperiences();
  }, [fetchExperiences]);

  const toggleEnabled = useCallback(async (id: string, enabled: boolean) => {
    setExperiences((prev) => prev.map((e) => e._id === id ? { ...e, enabled } : e));
    try {
      await updateExperience(id, { enabled });
    } catch {
      setExperiences((prev) => prev.map((e) => e._id === id ? { ...e, enabled: !enabled } : e));
    }
  }, [updateExperience]);

  const updateOrder = useCallback(async (id: string, order: number) => {
    setExperiences((prev) => prev.map((e) => e._id === id ? { ...e, order } : e).sort((a, b) => a.order - b.order));
    try {
      await updateExperience(id, { order });
    } catch {
      await fetchExperiences();
    }
  }, [updateExperience, fetchExperiences]);

  const moveUp = useCallback(async (id: string) => {
    const idx = experiences.findIndex((e) => e._id === id);
    if (idx <= 0) return;
    const prevOrder = experiences[idx].order;
    const newOrder = experiences[idx - 1].order;
    await updateOrder(id, newOrder);
    await updateExperience(experiences[idx - 1]._id, { order: prevOrder });
    await fetchExperiences();
  }, [experiences, updateOrder, updateExperience, fetchExperiences]);

  const moveDown = useCallback(async (id: string) => {
    const idx = experiences.findIndex((e) => e._id === id);
    if (idx < 0 || idx >= experiences.length - 1) return;
    const prevOrder = experiences[idx].order;
    const newOrder = experiences[idx + 1].order;
    await updateOrder(id, newOrder);
    await updateExperience(experiences[idx + 1]._id, { order: prevOrder });
    await fetchExperiences();
  }, [experiences, updateOrder, updateExperience, fetchExperiences]);

  const duplicateExperience = useCallback(async (exp: Experience) => {
    const { _id, id, createdAt, updatedAt, ...rest } = exp;
    await createExperience({
      ...rest,
      role: `${rest.role} (Copy)`,
      enabled: false,
    } as ExperienceFormData);
  }, [createExperience]);

  return {
    experiences,
    filteredExperiences,
    stats,
    loading,
    error,
    search,
    typeFilter,
    selected,
    setSearch,
    setTypeFilter,
    setSelected,
    toggleSelectAll,
    toggleSelect,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    bulkDelete,
    toggleEnabled,
    updateOrder,
    moveUp,
    moveDown,
    duplicateExperience,
  };
}
