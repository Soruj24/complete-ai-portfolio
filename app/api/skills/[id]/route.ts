import { auth } from "@/auth";
import { portfolioService } from "@/lib/services";
import { skillSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const { id } = await params;
    const body = await request.json();
    const validation = skillSchema.partial().safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }
    const skill = await portfolioService.updateSkill(id, validation.data);
    if (!skill) return createErrorResponse("Skill not found", 404);
    return createApiResponse(skill, { message: "Skill updated" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const { id } = await params;
    const skill = await portfolioService.deleteSkill(id);
    if (!skill) return createErrorResponse("Skill not found", 404);
    return createApiResponse(null, { message: "Skill deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
