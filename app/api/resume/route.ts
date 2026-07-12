import { dbConnect } from "@/config/db";
import { Resume } from "@/models/Resume";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    await dbConnect();
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 }).lean();
    return createApiResponse(resume);
  } catch (error) {
    return handleApiError(error);
  }
}
