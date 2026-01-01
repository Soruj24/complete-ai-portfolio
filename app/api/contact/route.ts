import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { ContactMessage } from "@/models/ContactMessage";
import { Notification } from "@/models/Notification";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, userId } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newMessage = await ContactMessage.create({
      userId: userId || null,
      name,
      email,
      subject,
      message,
    });

    // Create notifications for all admin users
    const admins = await User.find({ role: "admin" });
    console.log(`Found ${admins.length} admins for notification`);
    
    if (admins.length > 0) {
      const notificationPromises = admins.map(admin => {
        console.log(`Creating notification for admin: ${admin.email} (ID: ${admin._id})`);
        return Notification.create({
          userId: admin._id.toString(),
          title: "New Contact Message",
          message: `${name} sent a message: ${subject}`,
          type: "info",
          link: "/admin/dashboard?tab=inquiries",
        });
      });
      await Promise.all(notificationPromises);
      console.log("All notifications created successfully");
    }

    return NextResponse.json(
      { message: "Message sent successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await dbConnect();
    await ContactMessage.findByIdAndDelete(id);
    return NextResponse.json({ message: "Message deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
