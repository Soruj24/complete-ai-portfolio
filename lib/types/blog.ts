export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  readTime: number;
  featured: boolean;
  views: number;
  createdAt: string;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  createdAt: string;
}
