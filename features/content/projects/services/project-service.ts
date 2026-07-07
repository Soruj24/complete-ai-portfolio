import { projectRepository } from "../repositories/project-repository";
import { MOCK_PROJECTS, CATEGORIES, TAGS } from "../constants";
import type { Project, ProjectStats, KanbanColumn, ProjectFilterState } from "../types";

export class ProjectService {
  async getAll(): Promise<Project[]> {
    const result = await projectRepository.getAll({ limit: 100 });
    return result.data;
  }

  async getById(id: string): Promise<Project> {
    const result = await projectRepository.getById(id);
    return result.data;
  }

  async getStats(): Promise<ProjectStats> {
    return projectRepository.getStats();
  }

  async create(data: Partial<Project>): Promise<Project> {
    return projectRepository.create(data).then((r) => r.data);
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return projectRepository.update(id, data).then((r) => r.data);
  }

  async delete(id: string): Promise<void> {
    await projectRepository.delete(id);
  }

  async updateStatus(id: string, status: Project["status"]): Promise<Project> {
    return projectRepository.updateStatus(id, status);
  }

  getCategories() { return CATEGORIES; }
  getTags() { return TAGS; }

  filter(items: Project[], filters: ProjectFilterState): Project[] {
    let result = [...items];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    if (filters.status !== "all") result = result.filter((p) => p.status === filters.status);
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.priority !== "all") result = result.filter((p) => p.priority === filters.priority);

    result.sort((a, b) => {
      let cmp: number;
      switch (filters.sort) {
        case "title": cmp = a.title.localeCompare(b.title); break;
        case "views": cmp = a.views - b.views; break;
        case "rating": cmp = a.rating - b.rating; break;
        default: cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return filters.order === "asc" ? cmp : -cmp;
    });

    return result;
  }

  buildKanbanColumns(items: Project[]): KanbanColumn[] {
    const statuses: Project["status"][] = ["draft", "in-progress", "review", "published", "archived"];
    const labels: Record<string, string> = {
      draft: "Draft", "in-progress": "In Progress", review: "In Review",
      published: "Published", archived: "Archived",
    };
    return statuses.map((s) => ({
      id: s,
      title: labels[s],
      items: items.filter((p) => p.status === s),
    }));
  }
}

export const projectService = new ProjectService();
