import { auth } from "@/auth";
import { portfolioService } from "@/lib/services";
import { experienceSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const { id } = await params;
    const body = await request.json();
    const validation = experienceSchema.partial().safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }
    const exp = await portfolioService.updateExperience(id, validation.data);
    if (!exp) return createErrorResponse("Experience not found", 404);
    return createApiResponse(exp, { message: "Experience updated" });
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
    const exp = await portfolioService.deleteExperience(id);
    if (!exp) return createErrorResponse("Experience not found", 404);
    return createApiResponse(null, { message: "Experience deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
