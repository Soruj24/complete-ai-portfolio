import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_EXPERIENCE } from "../constants/mock-data";
import type { Experience } from "../types";

interface ExpEntity extends Experience { _id: string; }

export class ExperienceRepository extends MockRepository<ExpEntity> {
  constructor() { super({ baseUrl: "", resourceName: "experience" }); }
  protected searchFields: (keyof ExpEntity)[] = ["company", "position", "description"];
  protected generateMockData(): ExpEntity[] { return MOCK_EXPERIENCE.map((e) => ({ ...e, _id: e.id })); }
}

export const experienceRepository = new ExperienceRepository();
