import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_EDUCATION } from "../constants/mock-data";
import type { Education } from "../types";

interface EduEntity extends Education { _id: string; }

export class EducationRepository extends MockRepository<EduEntity> {
  constructor() { super({ baseUrl: "", resourceName: "education" }); }
  protected searchFields: (keyof EduEntity)[] = ["institution", "degree", "field", "description"];
  protected generateMockData(): EduEntity[] { return MOCK_EDUCATION.map((e) => ({ ...e, _id: e.id })); }
}

export const educationRepository = new EducationRepository();
