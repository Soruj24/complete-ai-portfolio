import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(200),
  category: z.string().min(2, "Category is required"),
  image: z.string().url("Invalid image URL"),
  tags: z.array(z.string()).default([]),
});

export const addCommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  content: z.string().min(1, "Comment is required").max(1000),
});

export const likeSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});
