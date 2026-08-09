"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Project, ProjectCategory, ProjectStatus, SortOption, ProjectStats } from "../types";
import { DEFAULT_PAGE_SIZE } from "../constants";

interface UseProjectsReturn {
  projects: Project[];
  filteredProjects: Project[];
  paginatedProjects: Project[];
  categories: ProjectCategory[];
  technologies: string[];
  stats: ProjectStats;
  loading: boolean;
  error: string | null;
  search: string;
  statusFilter: string;
  categoryFilter: string;
  techFilter: string;
  sort: SortOption;
  page: number;
  pageSize: number;
  selected: string[];
  viewMode: "table" | "grid";
  totalPages: number;
  totalResults: number;
  setSearch: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setCategoryFilter: (v: string) => void;
  setTechFilter: (v: string) => void;
  setSort: (v: SortOption) => void;
  setPage: (v: number) => void;
  setPageSize: (v: number) => void;
  setSelected: (v: string[]) => void;
  setViewMode: (v: "table" | "grid") => void;
  toggleSelectAll: () => void;
  toggleSelect: (id: string) => void;
  fetchProjects: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  toggleFeatured: (id: string, featured: boolean) => Promise<void>;
  toggleStatus: (id: string, status: ProjectStatus) => Promise<void>;
  duplicateProject: (project: Project) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selected, setSelected] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projRes, catRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/project-categories"),
      ]);

      if (!projRes.ok) throw new Error("Failed to fetch projects");

      const projJson = await projRes.json();
      const rawProjects = (projJson.data ?? []) as Record<string, unknown>[];
      const mapped: Project[] = rawProjects.map((p) => ({
        id: (p._id as string) || (p.id as string) || "",
        _id: p._id as string,
        title: (p.title as string) || "",
        slug: p.slug as string,
        description: (p.description as string) || "",
        content: p.content as string,
        category: (p.category as string) || "",
        tags: (p.tags as string[]) || [],
        techStack: (p.techStack as string[]) || [],
        status: (p.status as ProjectStatus) || "draft",
        priority: (p.priority as Project["priority"]) || "medium",
        featured: (p.featured as boolean) || false,
        order: p.order as number,
        image: p.image as string,
        images: p.images as string[],
        demoUrl: p.demoUrl as string,
        repoUrl: p.repoUrl as string,
        startDate: p.startDate as string,
        endDate: p.endDate as string,
        teamSize: p.teamSize as number,
        client: p.client as string,
        budget: p.budget as number,
        hoursSpent: p.hoursSpent as number,
        views: (p.views as number) || 0,
        rating: (p.rating as number) || 0,
        createdAt: p.createdAt as string,
        updatedAt: p.updatedAt as string,
      }));
      setProjects(mapped);

      if (catRes.ok) {
        const catJson = await catRes.json();
        setCategories((catJson.data ?? []) as ProjectCategory[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (techFilter !== "all") {
      result = result.filter((p) => p.techStack.includes(techFilter));
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "views":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "updated":
        result.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
        break;
    }

    return result;
  }, [projects, search, statusFilter, categoryFilter, techFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const totalResults = filteredProjects.length;

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, page, pageSize]);

  const stats = useMemo<ProjectStats>(() => ({
    total: projects.length,
    published: projects.filter((p) => p.status === "published").length,
    draft: projects.filter((p) => p.status === "draft" || p.status === "in-progress" || p.status === "review").length,
    featured: projects.filter((p) => p.featured).length,
  }), [projects]);

  const toggleSelectAll = useCallback(() => {
    if (selected.length === paginatedProjects.length) {
      setSelected([]);
    } else {
      setSelected(paginatedProjects.map((p) => p.id));
    }
  }, [selected.length, paginatedProjects]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const createProject = useCallback(async (data: Partial<Project>) => {
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create project");
    await fetchProjects();
  }, [fetchProjects]);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) throw new Error("Failed to update project");
    await fetchProjects();
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    setSelected((prev) => prev.filter((s) => s !== id));
    await fetchProjects();
  }, [fetchProjects]);

  const bulkDelete = useCallback(async (ids: string[]) => {
    const res = await fetch("/api/admin/projects/bulk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Failed to delete projects");
    setSelected([]);
    await fetchProjects();
  }, [fetchProjects]);

  const toggleFeatured = useCallback(async (id: string, featured: boolean) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, featured } : p)));
    try {
      await updateProject(id, { featured });
    } catch {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !featured } : p)));
      throw new Error("Failed to update featured status");
    }
  }, [updateProject]);

  const toggleStatus = useCallback(async (id: string, status: ProjectStatus) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    try {
      await updateProject(id, { status });
    } catch {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status } : p)));
      throw new Error("Failed to update status");
    }
  }, [updateProject]);

  const duplicateProject = useCallback(async (project: Project) => {
    const { id, _id, createdAt, updatedAt, ...rest } = project;
    await createProject({
      ...rest,
      title: `${rest.title} (Copy)`,
      status: "draft",
      featured: false,
    });
  }, [createProject]);

  return {
    projects,
    filteredProjects,
    paginatedProjects,
    categories,
    technologies,
    stats,
    loading,
    error,
    search,
    statusFilter,
    categoryFilter,
    techFilter,
    sort,
    page,
    pageSize,
    selected,
    viewMode,
    totalPages,
    totalResults,
    setSearch,
    setStatusFilter,
    setCategoryFilter,
    setTechFilter,
    setSort,
    setPage,
    setPageSize,
    setSelected,
    setViewMode,
    toggleSelectAll,
    toggleSelect,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    bulkDelete,
    toggleFeatured,
    toggleStatus,
    duplicateProject,
  };
}
