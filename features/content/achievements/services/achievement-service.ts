import { achievementRepository } from "../repositories/achievement-repository";
import type { Achievement } from "../types";

export class AchievementService {
  async getAll(): Promise<Achievement[]> {
    const result = await achievementRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Achievement>): Promise<Achievement> {
    return achievementRepository.create(data).then((r) => r.data);
  }
}

export const achievementService = new AchievementService();
