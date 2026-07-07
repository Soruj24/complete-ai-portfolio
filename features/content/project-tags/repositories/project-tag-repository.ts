import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_TAGS } from "../constants/mock-data";
import type { ProjectTag } from "../types";

interface TagEntity extends ProjectTag { _id: string; }

export class ProjectTagRepository extends MockRepository<TagEntity> {
  constructor() { super({ baseUrl: "", resourceName: "project-tags" }); }
  protected searchFields: (keyof TagEntity)[] = ["name"];
  protected generateMockData(): TagEntity[] { return MOCK_TAGS.map((t) => ({ ...t, _id: t.id })); }
}

export const projectTagRepository = new ProjectTagRepository();
