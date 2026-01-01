import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";
import { settingsSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Admin settings fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validation = settingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;
    await dbConnect();

    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { ...data, updatedBy: session.user.id },
        { new: true }
      );
    } else {
      settings = await Settings.create({ ...data, updatedBy: session.user.id });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
