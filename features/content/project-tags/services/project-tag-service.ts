import { projectTagRepository } from "../repositories/project-tag-repository";
import type { ProjectTag } from "../types";

export class ProjectTagService {
  async getAll(): Promise<ProjectTag[]> {
    const result = await projectTagRepository.getAll();
    return result.data;
  }

  async create(data: Partial<ProjectTag>): Promise<ProjectTag> {
    return projectTagRepository.create(data).then((r) => r.data);
  }
}

export const projectTagService = new ProjectTagService();
