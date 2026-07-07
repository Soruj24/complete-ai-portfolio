import { auth } from "@/auth";
import { blogService } from "@/lib/services";
import { createBlogSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    if (id) {
      const post = await blogService.getPostById(id);
      if (!post) return createErrorResponse("Post not found", 404);
      return createApiResponse(post);
    }

    const posts = await blogService.getPosts(publishedOnly);
    return createApiResponse(posts);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const validation = createBlogSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const post = await blogService.createPost(validation.data);
    return createApiResponse(post, { message: "Post created", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return createErrorResponse("ID required", 400);

    await blogService.deletePost(id);
    return createApiResponse(null, { message: "Post deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
