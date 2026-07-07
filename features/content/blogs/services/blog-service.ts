import { blogRepository } from "../repositories/blog-repository";
import { MOCK_BLOG_POSTS, CATEGORIES } from "../constants";
import type { BlogPost, BlogStats } from "../types";

export class BlogService {
  async getAll(): Promise<BlogPost[]> {
    const result = await blogRepository.getAll({ limit: 100 });
    return result.data;
  }

  async getById(id: string): Promise<BlogPost> {
    const result = await blogRepository.getById(id);
    return result.data;
  }

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    return blogRepository.create(data).then((r) => r.data);
  }

  async getStats(): Promise<BlogStats> { return blogRepository.getStats(); }

  getCategories() { return CATEGORIES; }

  filter(items: BlogPost[], search: string, status: string, category: string): BlogPost[] {
    let result = [...items];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    if (status !== "all") result = result.filter((p) => p.status === status);
    if (category) result = result.filter((p) => p.category === category);
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const blogService = new BlogService();
