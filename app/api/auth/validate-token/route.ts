import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.json({ valid: false });
    }

    await dbConnect();

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json({ valid: false });
    }

    return Response.json({ valid: true });
  } catch (error) {
    console.error("Token validation error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
