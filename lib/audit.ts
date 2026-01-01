import AuditLog from "@/models/AuditLog";
import { dbConnect } from "@/config/db";
import { headers } from "next/headers";

interface LogActionParams {
  action: string;
  userId: string;
  userEmail: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
}

export async function logAction({
  action,
  userId,
  userEmail,
  entityType,
  entityId,
  changes = {},
}: LogActionParams) {
  try {
    await dbConnect();
    
    // In Next.js 15, headers() is a promise
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    await AuditLog.create({
      action,
      userId,
      userEmail,
      entityType,
      entityId,
      changes,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
