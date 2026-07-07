import { auth } from "@/auth";
import { portfolioService } from "@/lib/services";
import { settingsSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const settings = await portfolioService.getSettings();
    return createApiResponse(settings);
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
    const validation = settingsSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }
    const settings = await portfolioService.upsertSettings({ ...validation.data, updatedBy: session.user.id });
    return createApiResponse(settings, { message: "Settings updated" });
  } catch (error) {
    return handleApiError(error);
  }
}
