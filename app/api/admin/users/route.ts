import { auth } from "@/auth";
import { adminService } from "@/lib/services";
import { updateUserSchema, deleteUserSchema } from "@/lib/schemas";
import { createApiResponse, createErrorResponse, handleApiError } from "@/lib/utils/api-response";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }

    const users = await adminService.getUsers();
    return createApiResponse(users);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }

    const body = await request.json();
    const validation = deleteUserSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    await adminService.deleteUser(validation.data.userId);
    return createApiResponse(null, { message: "User deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return createErrorResponse("Forbidden", 403);
    }

    const body = await request.json();
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return createErrorResponse("Validation failed", 400, validation.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const { userId, ...updateData } = validation.data;
    await adminService.updateUser(userId, updateData);
    return createApiResponse(null, { message: "User updated successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
