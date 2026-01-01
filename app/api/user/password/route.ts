import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    await dbConnect();
    const user = await User.findById(session.user.id).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // Create notification
    await Notification.create({
      userId: user._id,
      title: "Password Changed",
      message: "Your password has been successfully updated. If you did not do this, please contact support.",
      type: "warning",
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
