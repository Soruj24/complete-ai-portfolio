export type BlogStatus = "draft" | "review" | "published" | "archived";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  featured: boolean;
  coverImage: string;
  readingTime: number;
  views: number;
  likes: number;
  comments: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface BlogStats {
  total: number;
  published: number;
  draft: number;
  review: number;
  archived: number;
  featured: number;
  totalViews: number;
  totalComments: number;
}

export const BLOG_STATUS_LABELS: Record<BlogStatus, string> = {
  draft: "Draft",
  review: "In Review",
  published: "Published",
  archived: "Archived",
};
