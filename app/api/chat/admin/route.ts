import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { ChatMessage } from "@/models/ChatMessage";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

// GET all users who have messaged (Admin only)
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Find unique users who have sent messages to admin or received from admin
    const uniqueUserIdsFromMessages = await ChatMessage.distinct("senderId", { isAdmin: false });
    const receiversFromAdmin = await ChatMessage.distinct("receiverId", { isAdmin: true });
    
    const allUserIds = Array.from(new Set([...uniqueUserIdsFromMessages, ...receiversFromAdmin]));

    const users = await User.find({ _id: { $in: allUserIds } }, "name email image status");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
