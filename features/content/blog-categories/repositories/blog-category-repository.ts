import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_BLOG_CATEGORIES } from "../constants/mock-data";
import type { BlogCategory } from "../types";

interface CatEntity extends BlogCategory { _id: string; }

export class BlogCategoryRepository extends MockRepository<CatEntity> {
  constructor() { super({ baseUrl: "", resourceName: "blog-categories" }); }
  protected searchFields: (keyof CatEntity)[] = ["name", "description"];
  protected generateMockData(): CatEntity[] { return MOCK_BLOG_CATEGORIES.map((c) => ({ ...c, _id: c.id })); }
}

export const blogCategoryRepository = new BlogCategoryRepository();
