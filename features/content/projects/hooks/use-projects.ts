"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { projectService } from "../services/project-service";
import type { Project, ProjectStats, ProjectFilterState } from "../types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<ProjectFilterState>({
    search: "", status: "all", category: "", priority: "all", sort: "date", order: "desc",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, projectStats] = await Promise.all([
        projectService.getAll(),
        projectService.getStats(),
      ]);
      setProjects(data);
      setStats(projectStats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => projectService.filter(projects, filters), [projects, filters]);
  const columns = useMemo(() => projectService.buildKanbanColumns(filtered), [filtered]);
  const categories = useMemo(() => projectService.getCategories(), []);
  const tags = useMemo(() => projectService.getTags(), []);

  const setFilters = useCallback((partial: Partial<ProjectFilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateStatus = useCallback(async (id: string, status: Project["status"]) => {
    await projectService.updateStatus(id, status);
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
  }, []);

  const addProject = useCallback(async (data: Partial<Project>) => {
    const created = await projectService.create(data);
    setProjects((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    const updated = await projectService.update(id, data);
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, ...updated } : p));
    return updated;
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await projectService.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    projects, filtered, stats, columns,
    categories, tags,
    loading, error, filters, setFilters,
    updateStatus, addProject, updateProject, deleteProject, refresh: fetchData,
  };
}
