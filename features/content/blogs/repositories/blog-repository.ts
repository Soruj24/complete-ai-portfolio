import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_BLOG_POSTS } from "../constants/mock-data";
import type { BlogPost, BlogStats } from "../types";

interface BlogEntity extends BlogPost { _id: string; }

export class BlogRepository extends MockRepository<BlogEntity> {
  constructor() { super({ baseUrl: "", resourceName: "blogs" }); }

  protected searchFields: (keyof BlogEntity)[] = ["title", "excerpt", "tags", "category", "author"];

  protected generateMockData(): BlogEntity[] {
    return MOCK_BLOG_POSTS.map((p) => ({ ...p, _id: p.id }));
  }

  async getStats(): Promise<BlogStats> {
    const items = this.generateMockData();
    return {
      total: items.length,
      published: items.filter((p) => p.status === "published").length,
      draft: items.filter((p) => p.status === "draft").length,
      review: items.filter((p) => p.status === "review").length,
      archived: items.filter((p) => p.status === "archived").length,
      featured: items.filter((p) => p.featured).length,
      totalViews: items.reduce((s, p) => s + p.views, 0),
      totalComments: items.reduce((s, p) => s + p.comments, 0),
    };
  }
}

export const blogRepository = new BlogRepository();
