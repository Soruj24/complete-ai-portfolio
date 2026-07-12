import { dbConnect } from "@/config/db";
import { SocialLink } from "@/models/SocialLink";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    await dbConnect();
    const links = await SocialLink.find({ isActive: true }).sort({ order: 1 }).lean();
    return createApiResponse(links);
  } catch (error) {
    return handleApiError(error);
  }
}
