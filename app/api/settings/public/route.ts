import { portfolioService } from "@/lib/services";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const settings = await portfolioService.getSettings();
    return createApiResponse(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
