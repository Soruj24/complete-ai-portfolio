import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_CATEGORIES } from "../constants/mock-data";
import type { ProjectCategory } from "../types";

interface CategoryEntity extends ProjectCategory { _id: string; }

export class ProjectCategoryRepository extends MockRepository<CategoryEntity> {
  constructor() { super({ baseUrl: "", resourceName: "project-categories" }); }

  protected searchFields: (keyof CategoryEntity)[] = ["name", "description"];

  protected generateMockData(): CategoryEntity[] {
    return MOCK_CATEGORIES.map((c) => ({ ...c, _id: c.id }));
  }
}

export const projectCategoryRepository = new ProjectCategoryRepository();
