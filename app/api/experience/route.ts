import { auth } from "@/auth";
import { portfolioService } from "@/lib/services";
import { experienceSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const experience = await portfolioService.getExperience();
    return createApiResponse(experience);
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
    const validation = experienceSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }
    const experience = await portfolioService.createExperience(validation.data);
    return createApiResponse(experience, { message: "Experience created", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
