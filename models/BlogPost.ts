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
  content: string;
  excerpt: string;
  category: string;
  image: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  likes: string[];
  comments: IComment[];
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
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImage: { type: String },
    likes: [{ type: String }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
