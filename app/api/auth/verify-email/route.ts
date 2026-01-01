import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Create notification
    await Notification.create({
      userId: user._id,
      title: "Email Verified",
      message: "Your email has been successfully verified. Welcome to the platform!",
      type: "success",
    });

    return NextResponse.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
