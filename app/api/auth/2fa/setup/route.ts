import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import qrcode from "qrcode";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, "User Management App", secret);
    const qrCodeUrl = await qrcode.toDataURL(otpauth);

    // Store secret temporarily but don't enable 2FA until verified
    user.twoFactorSecret = secret;
    await user.save();

    return NextResponse.json({ qrCodeUrl, secret });
  } catch (error) {
    console.error("2FA Setup Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
