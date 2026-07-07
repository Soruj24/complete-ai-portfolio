import { blogRepository } from "@/lib/repositories";
import type { BlogPost, CreateBlogRequest } from "@/shared/types";

class BlogService {
  async getPosts(publishedOnly: boolean = false): Promise<BlogPost[]> {
    const params: any = { sort: "createdAt", order: "desc" as const };
    if (publishedOnly) {
      params.filter = { published: true };
    }
    const result = await blogRepository.findAll(params);
    return result.data as unknown as BlogPost[];
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const post = await blogRepository.findById(id);
    return post as unknown as BlogPost | null;
  }

  async createPost(data: CreateBlogRequest): Promise<BlogPost> {
    const post = await blogRepository.create(data as any);
    return post as unknown as BlogPost;
  }

  async updatePost(id: string, data: Partial<CreateBlogRequest>): Promise<BlogPost | null> {
    const post = await blogRepository.update(id, data as any);
    return post as unknown as BlogPost | null;
  }

  async deletePost(id: string): Promise<BlogPost | null> {
    const post = await blogRepository.delete(id);
    return post as unknown as BlogPost | null;
  }

  async addComment(
    postId: string,
    comment: { userId: string; name: string; content: string }
  ): Promise<BlogPost | null> {
    const post = await blogRepository.addComment(postId, comment);
    return post as unknown as BlogPost | null;
  }

  async toggleLike(postId: string, userId: string): Promise<BlogPost | null> {
    const post = await blogRepository.toggleLike(postId, userId);
    return post as unknown as BlogPost | null;
  }
}

export const blogService = new BlogService();
