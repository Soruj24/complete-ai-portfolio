import { getSession } from "@/lib/auth/session";
import { portfolioService } from "@/lib/services";
import { projectSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";
import { projects as initialProjects } from "@/data/projects";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true" || undefined;

    const result = await portfolioService.getProjects({ page, limit, category, featured });

    if (result.data.length === 0 && page === 1) {
      const skip = (page - 1) * limit;
      const paginatedInitial = initialProjects.slice(skip, skip + limit);
      return createApiResponse(paginatedInitial, {
        pagination: {
          page, limit, total: initialProjects.length,
          totalPages: Math.ceil(initialProjects.length / limit),
          hasNext: page < Math.ceil(initialProjects.length / limit),
          hasPrev: page > 1,
        },
      });
    }

    return createApiResponse(result.data, { pagination: result.pagination });
  } catch (error) {
    console.error("Projects fetch error:", error);
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }

    const body = await request.json();
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const project = await portfolioService.createProject(validation.data);
    return createApiResponse(project, { message: "Project created", status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return handleApiError(error);
  }
}
