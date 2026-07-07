import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_ACHIEVEMENTS } from "../constants/mock-data";
import type { Achievement } from "../types";

interface AchEntity extends Achievement { _id: string; }

export class AchievementRepository extends MockRepository<AchEntity> {
  constructor() { super({ baseUrl: "", resourceName: "achievements" }); }
  protected searchFields: (keyof AchEntity)[] = ["title", "description", "category", "issuer"];
  protected generateMockData(): AchEntity[] { return MOCK_ACHIEVEMENTS.map((a) => ({ ...a, _id: a.id })); }
}

export const achievementRepository = new AchievementRepository();
