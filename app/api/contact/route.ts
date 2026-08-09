import { auth } from "@/auth";
import { contactService } from "@/lib/services";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const result = await contactService.getMessages({ page, limit });
    return createApiResponse(result.data, { pagination: { page, limit, total: result.total, totalPages: Math.ceil(result.total / limit) } });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return createErrorResponse("Missing required fields", 400);
    }

    const session = await auth();
    const msg = await contactService.send({
      name,
      email,
      subject,
      message,
    });

    return createApiResponse(msg, { message: "Message sent successfully", status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return createErrorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return createErrorResponse("ID and action required", 400);
    }

    let result;
    switch (action) {
      case "read":
        result = await contactService.markAsRead(id);
        break;
      case "unread":
        result = await contactService.markAsUnread(id);
        break;
      case "archive":
        result = await contactService.archive(id);
        break;
      default:
        return createErrorResponse("Invalid action", 400);
    }

    return createApiResponse(result, { message: `Message ${action}d` });
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
