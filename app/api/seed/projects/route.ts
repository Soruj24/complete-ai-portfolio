import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, message: "Projects are now managed through the admin API." });
}
