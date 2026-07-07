import { experienceRepository } from "../repositories/experience-repository";
import type { Experience } from "../types";

export class ExperienceService {
  async getAll(): Promise<Experience[]> {
    const result = await experienceRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Experience>): Promise<Experience> {
    return experienceRepository.create(data).then((r) => r.data);
  }
}

export const experienceService = new ExperienceService();
