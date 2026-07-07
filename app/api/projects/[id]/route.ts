import { getSession } from "@/lib/auth/session";
import { portfolioService } from "@/lib/services";
import { projectSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await portfolioService.getProjectById(id);
    if (!project) {
      return createErrorResponse("Project not found", 404);
    }
    return createApiResponse(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const { id } = await params;
    const body = await request.json();
    const validation = projectSchema.partial().safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const project = await portfolioService.updateProject(id, validation.data);
    if (!project) {
      return createErrorResponse("Project not found", 404);
    }
    return createApiResponse(project, { message: "Project updated" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const { id } = await params;
    const project = await portfolioService.deleteProject(id);
    if (!project) {
      return createErrorResponse("Project not found", 404);
    }
    return createApiResponse(null, { message: "Project deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
