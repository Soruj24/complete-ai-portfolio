import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Experience } from "@/models/Experience";
import { NextResponse } from "next/server";
import { logAction } from "@/lib/audit";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    await dbConnect();
    const experience = await Experience.findByIdAndUpdate(id, body, { new: true });

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    await logAction({
      action: "UPDATE",
      userId: session.user.id!,
      userEmail: session.user.email!,
      entityType: "EXPERIENCE",
      entityId: id,
      changes: body,
    });

    return NextResponse.json({ success: true, experience });
  } catch (error) {
    console.error("Experience update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    const experience = await Experience.findByIdAndDelete(id);

    if (experience) {
      await logAction({
        action: "DELETE",
        userId: session.user.id!,
        userEmail: session.user.email!,
        entityType: "EXPERIENCE",
        entityId: id,
        changes: { deletedExperienceRole: experience.role },
      });
    }

    return NextResponse.json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Experience delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
