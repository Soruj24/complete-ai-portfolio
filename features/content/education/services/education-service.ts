import { educationRepository } from "../repositories/education-repository";
import type { Education } from "../types";

export class EducationService {
  async getAll(): Promise<Education[]> {
    const result = await educationRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Education>): Promise<Education> {
    return educationRepository.create(data).then((r) => r.data);
  }
}

export const educationService = new EducationService();
