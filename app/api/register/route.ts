import { dbConnect } from "@/config/db";
import { sendVerificationEmail } from "@/lib/email";
import { User } from "@/models/User";
import Settings from "@/models/Settings";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { registerSchema } from "@/lib/validations";
import { redisRateLimit } from "@/lib/redis";

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

    await dbConnect();

    // Check if registration is allowed
    const settings = await Settings.findOne();
    if (settings && settings.allowRegistration === false) {
      // Still allow the first user to register as admin
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        return Response.json({ error: "Registration is currently disabled by administrator." }, { status: 403 });
      }
    }

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, image } = validation.data;

    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if it's the first user, if so make them admin
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";
    
    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      role,
      isVerified: role === "admin", // Admin is auto-verified
      verificationToken: role === "admin" ? undefined : verificationToken,
      verificationTokenExpires: role === "admin" ? undefined : verificationTokenExpires,
    });

    // Send verification email if not admin
    if (role !== "admin") {
      const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
      await sendVerificationEmail(email, verificationUrl);
    }

    return Response.json({ 
      success: true, 
      message: role === "admin" ? "Admin registered" : "Verification email sent" 
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}