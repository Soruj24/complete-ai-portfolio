import { dbConnect } from "@/config/db";
import { Achievement } from "@/models/Achievement";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 }).lean();
    return createApiResponse(achievements);
  } catch (error) {
    return handleApiError(error);
  }
}
