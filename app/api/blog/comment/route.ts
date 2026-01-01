import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { BlogPost } from "@/models/BlogPost";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, content } = await request.json();
    await dbConnect();

    const post = await BlogPost.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const newComment = {
      userId: session.user.id,
      userName: session.user.name,
      userImage: session.user.image,
      content,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    return NextResponse.json(post.comments[post.comments.length - 1]);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
