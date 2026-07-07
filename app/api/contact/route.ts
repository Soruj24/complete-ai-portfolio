import { auth } from "@/auth";
import { contactService } from "@/lib/services";
import { contactSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    await dbConnect();

    const message = await contactService.send(validation.data);

    const admins = await User.find({ role: "admin" });
    const notificationPromises = admins.map((admin) =>
      Notification.create({
        userId: admin._id.toString(),
        title: "New Contact Message",
        message: `${validation.data.name} sent: ${validation.data.subject}`,
        type: "info",
        link: "/admin/dashboard?tab=inquiries",
      })
    );
    await Promise.all(notificationPromises);

    return createApiResponse(message, { message: "Message sent successfully", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const messages = await contactService.getMessages();
    return createApiResponse(messages);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return createErrorResponse("ID required", 400);
    }

    await contactService.deleteMessage(id);
    return createApiResponse(null, { message: "Message deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
