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

    const { postId, action } = await request.json();
    await dbConnect();

    const post = await BlogPost.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const userId = session.user.id;
    const userIndex = post.likes.indexOf(userId);

    if (action === "like") {
      if (userIndex === -1) {
        post.likes.push(userId);
      } else {
        post.likes.splice(userIndex, 1);
      }
    }

    await post.save();
    return NextResponse.json({ likes: post.likes.length, isLiked: post.likes.includes(userId) });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
