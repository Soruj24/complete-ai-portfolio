import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, message: "Seed data has been moved to the database. Use the admin panel to manage content." });
}

export async function POST() {
  return NextResponse.json({ success: true, message: "Seed data has been moved to the database. Use the admin panel to manage content." });
}
