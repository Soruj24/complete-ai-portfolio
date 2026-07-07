import { projectCategoryRepository } from "../repositories/project-category-repository";
import type { ProjectCategory } from "../types";

export class ProjectCategoryService {
  async getAll(): Promise<ProjectCategory[]> {
    const result = await projectCategoryRepository.getAll();
    return result.data;
  }

  async create(data: Partial<ProjectCategory>): Promise<ProjectCategory> {
    return projectCategoryRepository.create(data).then((r) => r.data);
  }

  async update(id: string, data: Partial<ProjectCategory>): Promise<ProjectCategory> {
    return projectCategoryRepository.update(id, data).then((r) => r.data);
  }

  async delete(id: string): Promise<boolean> {
    return projectCategoryRepository.delete(id).then((r) => r.data);
  }
}

export const projectCategoryService = new ProjectCategoryService();
