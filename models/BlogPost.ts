import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: Date;
}

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  author?: string;
  tags: string[];
  published: boolean;
  status: "draft" | "review" | "published" | "archived";
  featured: boolean;
  readingTime: number;
  views: number;
  likes: string[];
  comments: IComment[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userImage: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    coverImage: { type: String },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImage: { type: String },
    author: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "review", "published", "archived"], default: "draft" },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: [{ type: String }],
    comments: [CommentSchema],
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
