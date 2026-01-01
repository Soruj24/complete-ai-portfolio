import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { BlogPost } from "@/models/BlogPost";
import { NextResponse } from "next/server";
import { blogPostSchema } from "@/lib/validations";

// GET all posts or a single post
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const post = await BlogPost.findById(id);
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json(post);
    }

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const totalPosts = await BlogPost.countDocuments();
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      posts,
      pagination: {
        total: totalPosts,
        page,
        limit,
        pages: Math.ceil(totalPosts / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// CREATE a new post (Admin only)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = blogPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, content, excerpt, category, image } = validation.data;
    await dbConnect();

    const post = await BlogPost.create({
      title,
      content,
      excerpt,
      category,
      image,
      authorId: session.user.id,
      authorName: session.user.name,
      authorImage: session.user.image,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE a post (Admin only)
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await dbConnect();
    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
