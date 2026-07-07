import type { IProject } from "@/shared/types";
import type { Project, ProjectStats } from "../types";
import { MOCK_PROJECTS, CATEGORIES, TAGS } from "../constants";

const API_BASE = "/api/projects";

function toLocalProject(api: IProject): Project {
  return {
    id: api._id ?? api.id ?? "",
    title: api.title,
    slug: api.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description: api.description,
    content: api.fullDescription ?? "",
    category: api.category,
    tags: api.tags ?? [],
    techStack: api.technologies ?? [],
    status: (api.status as Project["status"]) ?? "draft",
    priority: "medium",
    featured: api.featured ?? false,
    order: 0,
    image: api.image,
    images: api.screenshots ?? [],
    demoUrl: api.liveUrl,
    repoUrl: api.githubUrl,
    startDate: api.completionDate ?? new Date().toISOString(),
    endDate: undefined,
    teamSize: parseInt(api.teamSize) || 1,
    client: undefined,
    budget: undefined,
    hoursSpent: 0,
    views: api.stats?.views ?? 0,
    rating: 0,
    createdAt: api.createdAt ?? new Date().toISOString(),
    updatedAt: api.updatedAt ?? new Date().toISOString(),
  };
}

function toApiProject(project: Partial<Project>): Partial<IProject> {
  return {
    title: project.title || "Untitled Project",
    description: (project.description || "No description provided.").padEnd(10, " "),
    fullDescription: project.content,
    image: project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    technologies: project.techStack?.length ? project.techStack : ["General"],
    features: [],
    githubUrl: project.repoUrl || "",
    liveUrl: project.demoUrl || "",
    category: project.category || "Uncategorized",
    status: project.status ?? "draft",
    screenshots: project.images ?? [],
    challenges: [],
    solutions: [],
    featured: project.featured ?? false,
    difficulty: "intermediate",
    duration: "",
    teamSize: String(project.teamSize ?? 1),
    completionDate: project.startDate,
    tags: project.tags ?? [],
    emoji: "🚀",
    stats: { completionTime: "", teamSize: "", complexity: "", views: project.views ?? 0, likes: 0 },
    architecture: "",
    developmentHighlights: [],
    lessonsLearned: [],
  };
}

export class ProjectRepository {
  async getAll(_params?: { limit?: number }): Promise<{ success: boolean; data: Project[] }> {
    try {
      const res = await fetch(API_BASE, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const json = await res.json();
        const apiProjects: IProject[] = json.data ?? json.projects ?? [];
        if (apiProjects.length > 0) {
          return { success: true, data: apiProjects.map(toLocalProject) };
        }
      }
    } catch {
      // DB unavailable
    }
    return { success: true, data: MOCK_PROJECTS.map((p) => ({ ...p })) };
  }

  async getById(id: string): Promise<{ success: boolean; data: Project }> {
    const res = await fetch(`${API_BASE}/${id}`);
    const json = await res.json();
    return { success: true, data: toLocalProject(json.data ?? json) };
  }

  async create(data: Partial<Project>): Promise<{ success: boolean; data: Project }> {
    const payload = toApiProject(data);
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.data) {
      const details = json.error?.details
        ? Object.entries(json.error.details).map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`).join("; ")
        : json.message || "Failed to create project";
      throw new Error(details);
    }
    return { success: true, data: toLocalProject(json.data) };
  }

  async update(id: string, data: Partial<Project>): Promise<{ success: boolean; data: Project }> {
    const payload = toApiProject(data);
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.data) {
      const details = json.error?.details
        ? Object.entries(json.error.details).map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`).join("; ")
        : json.message || "Failed to update project";
      throw new Error(details);
    }
    return { success: true, data: toLocalProject(json.data) };
  }

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Failed to delete project");
    }
    return { success: true };
  }

  async updateStatus(id: string, status: Project["status"]): Promise<Project> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    return toLocalProject(json.data ?? json);
  }

  async getStats(): Promise<ProjectStats> {
    try {
      const { data: items } = await this.getAll();
      return {
        total: items.length,
        published: items.filter((p) => p.status === "published").length,
        draft: items.filter((p) => p.status === "draft").length,
        inProgress: items.filter((p) => p.status === "in-progress").length,
        archived: items.filter((p) => p.status === "archived").length,
        featured: items.filter((p) => p.featured).length,
        totalViews: items.reduce((s, p) => s + p.views, 0),
        totalHours: items.reduce((s, p) => s + p.hoursSpent, 0),
        avgRating: items.length ? +(items.reduce((s, p) => s + p.rating, 0) / items.length).toFixed(1) : 0,
      };
    } catch {
      return { total: 0, published: 0, draft: 0, inProgress: 0, archived: 0, featured: 0, totalViews: 0, totalHours: 0, avgRating: 0 };
    }
  }
}

export const projectRepository = new ProjectRepository();
