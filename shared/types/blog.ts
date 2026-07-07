export interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author?: string;
  tags?: string[];
  likes: string[];
  comments: BlogComment[];
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogComment {
  _id: string;
  userId: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  tags?: string[];
}

export interface AddCommentRequest {
  postId: string;
  content: string;
}

export interface LikeRequest {
  postId: string;
}
