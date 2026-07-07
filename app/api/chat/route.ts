import { auth } from "@/auth";
import { chatService } from "@/lib/services";
import { sendMessageSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const messages = await chatService.getConversation(userId || session.user.id);
    return createApiResponse(messages);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const validation = sendMessageSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    await dbConnect();

    const { message, receiverId } = validation.data;

    const newMessage = await chatService.sendMessage({
      senderId: session.user.id,
      senderName: session.user.name || "Unknown",
      message,
      isAdmin: session.user.role === "admin",
    });

    if (session.user.role === "admin") {
      await Notification.create({
        userId: receiverId,
        title: "New Message from Support",
        message: message.length > 50 ? message.substring(0, 50) + "..." : message,
        type: "info",
        link: "/contact?openChat=true",
      });
    } else {
      const admins = await User.find({ role: "admin" });
      const notificationPromises = admins.map((admin) =>
        Notification.create({
          userId: admin._id.toString(),
          title: "New Chat Message",
          message: `${session.user.name}: ${message.length > 50 ? message.substring(0, 50) + "..." : message}`,
          type: "info",
          link: `/admin/dashboard?tab=overview&userId=${session.user.id}`,
        })
      );
      await Promise.all(notificationPromises);
    }

    return createApiResponse(newMessage, { message: "Message sent", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
