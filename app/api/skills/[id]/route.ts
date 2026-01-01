import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Skill } from "@/models/Skill";
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
    
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await logAction({
      action: "UPDATE",
      userId: session.user.id!,
      userEmail: session.user.email!,
      entityType: "SKILL",
      entityId: id,
      changes: body,
    });

    return NextResponse.json({ success: true, skill });
  } catch (error) {
    console.error("Skill update error:", error);
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
    const skill = await Skill.findByIdAndDelete(id);

    if (skill) {
      await logAction({
        action: "DELETE",
        userId: session.user.id!,
        userEmail: session.user.email!,
        entityType: "SKILL",
        entityId: id,
        changes: { deletedSkillName: skill.name },
      });
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Skill delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
