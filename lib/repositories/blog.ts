import { BaseRepository } from "./base";
import { BlogPost, IBlogPost } from "@/models/BlogPost";

class BlogRepository extends BaseRepository<IBlogPost> {
  constructor() {
    super(BlogPost as any);
  }

  async addComment(
    postId: string,
    comment: { userId: string; name: string; content: string }
  ): Promise<IBlogPost | null> {
    return BlogPost.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            userId: comment.userId,
            userName: comment.name,
            content: comment.content,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    ).lean() as any;
  }

  async toggleLike(postId: string, userId: string): Promise<IBlogPost | null> {
    const post = await BlogPost.findById(postId);
    if (!post) return null;

    const index = post.likes.indexOf(userId);
    if (index > -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    return post.toObject() as any;
  }
}

export const blogRepository = new BlogRepository();
