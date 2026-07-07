import { skillRepository } from "../repositories/skill-repository";
import type { Skill } from "../types";

export class SkillService {
  async getAll(): Promise<Skill[]> {
    const result = await skillRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Skill>): Promise<Skill> {
    return skillRepository.create(data).then((r) => r.data);
  }
}

export const skillService = new SkillService();
