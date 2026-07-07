import { auth } from "@/auth";
import { portfolioService } from "@/lib/services";
import { skillSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const skills = await portfolioService.getSkills({ category });
    return createApiResponse(skills);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }
    const body = await request.json();
    const validation = skillSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }
    const skill = await portfolioService.createSkill(validation.data);
    return createApiResponse(skill, { message: "Skill created", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
