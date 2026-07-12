import { dbConnect } from "@/config/db";
import { Testimonial } from "@/models/Testimonial";
import { createApiResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ featured: true }).sort({ order: 1, rating: -1 }).lean();
    return createApiResponse(testimonials);
  } catch (error) {
    return handleApiError(error);
  }
}
