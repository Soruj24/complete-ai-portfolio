import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";
import { redisRateLimit } from "@/lib/redis";
import { headers } from "next/headers";
import { forgotPasswordSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    const { success, remaining } = await redisRateLimit(ip, 3, 60);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "X-RateLimit-Remaining": remaining.toString() } }
      );
    }

    const body = await request.json();
    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      // Security: don't reveal if user exists or not
      return Response.json({ success: true });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await user.save();

    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
