import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { ChatMessage } from "@/models/ChatMessage";
import { User } from "@/models/User";
import { Notification } from "@/models/Notification";
import { NextResponse } from "next/server";

// GET messages
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get("userId");

    if (session.user.role === "admin") {
      // Admin fetching messages for a specific user
      if (!otherUserId) return NextResponse.json([]);
      const messages = await ChatMessage.find({
        $or: [
          { senderId: session.user.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: session.user.id },
        ],
      }).sort({ createdAt: 1 });
      return NextResponse.json(messages);
    } else {
      // User fetching their conversation with admin
      const admin = await User.findOne({ role: "admin" });
      if (!admin) return NextResponse.json([]);

      const messages = await ChatMessage.find({
        $or: [
          { senderId: session.user.id, receiverId: admin._id },
          { senderId: admin._id, receiverId: session.user.id },
        ],
      }).sort({ createdAt: 1 });
      return NextResponse.json(messages);
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// SEND a message
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, receiverId } = await request.json();
    await dbConnect();

    if (session.user.role !== "admin") {
      // If user is sending, automatically target the admin
      const admin = await User.findOne({ role: "admin" });
      if (!admin)
        return NextResponse.json({ error: "No admin found" }, { status: 404 });
      const finalReceiverId = admin._id;
    }

    const newMessage = await ChatMessage.create({
      senderId: session.user.id,
      senderName: session.user.name,
      senderImage: session.user.image,
      receiverId: receiverId,
      message,
      isAdmin: session.user.role === "admin",
      isRead: false,
    });

    // If admin is replying, send a notification to the user
    if (session.user.role === "admin") {
      await Notification.create({
        userId: receiverId,
        title: "New Message from Support",
        message: `Support: ${message.length > 50 ? message.substring(0, 50) + "..." : message}`,
        type: "info",
        link: "/contact?openChat=true", // Linking to contact page and automatically opening chat
      });
    } else {
      // If user is sending, send a notification to all admins
      const admins = await User.find({ role: "admin" });
      console.log(`Found ${admins.length} admins for chat notification`);

      if (admins.length > 0) {
        const notificationPromises = admins.map((admin) => {
          console.log(`Creating chat notification for admin: ${admin.email}`);
          return Notification.create({
            userId: admin._id.toString(),
            title: "New Chat Message",
            message: `${session.user.name}: ${message.length > 50 ? message.substring(0, 50) + "..." : message}`,
            type: "info",
            link: `/admin/dashboard?tab=overview&userId=${session.user.id}`,
          });
        });
        await Promise.all(notificationPromises);
        console.log("All chat notifications created successfully");
      }
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
