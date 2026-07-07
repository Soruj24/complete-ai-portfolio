import { blogCategoryRepository } from "../repositories/blog-category-repository";
import type { BlogCategory } from "../types";

export class BlogCategoryService {
  async getAll(): Promise<BlogCategory[]> {
    const result = await blogCategoryRepository.getAll();
    return result.data;
  }

  async create(data: Partial<BlogCategory>): Promise<BlogCategory> {
    return blogCategoryRepository.create(data).then((r) => r.data);
  }
}

export const blogCategoryService = new BlogCategoryService();
