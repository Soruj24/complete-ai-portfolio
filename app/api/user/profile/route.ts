import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await request.json();

    await dbConnect();
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, image },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create notification
    await Notification.create({
      userId: user._id,
      title: "Profile Updated",
      message: "Your profile information has been successfully updated.",
      type: "success",
    });

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
