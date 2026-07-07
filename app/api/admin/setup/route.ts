import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { z } from "zod";

const setupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
    }

    const body = await req.json();
    const parsed = setupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message, fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    return NextResponse.json({ success: true, message: "Admin user created successfully" });
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
