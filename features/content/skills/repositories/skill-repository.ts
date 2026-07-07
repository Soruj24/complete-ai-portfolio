import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_SKILLS } from "../constants/mock-data";
import type { Skill } from "../types";

interface SkillEntity extends Skill { _id: string; }

export class SkillRepository extends MockRepository<SkillEntity> {
  constructor() { super({ baseUrl: "", resourceName: "skills" }); }
  protected searchFields: (keyof SkillEntity)[] = ["name"];
  protected generateMockData(): SkillEntity[] { return MOCK_SKILLS.map((s) => ({ ...s, _id: s.id })); }
}

export const skillRepository = new SkillRepository();
