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
}

export const projectCategoryService = new ProjectCategoryService();
