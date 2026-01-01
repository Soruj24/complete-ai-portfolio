import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { authenticator } from "otplib";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id).select("+twoFactorSecret");

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({ error: "2FA not set up" }, { status: 400 });
    }

    const isValid = authenticator.verify({
      token,
      secret: user.twoFactorSecret,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 });
    }

    user.twoFactorEnabled = true;
    await user.save();

    return NextResponse.json({ success: true, message: "2FA enabled successfully" });
  } catch (error) {
    console.error("2FA Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
