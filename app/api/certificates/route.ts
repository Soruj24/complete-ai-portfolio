import { dbConnect } from "@/config/db";
import { Certificate } from "@/models/Certificate";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 }).lean();
    return createApiResponse(certificates);
  } catch (error) {
    return handleApiError(error);
  }
}
