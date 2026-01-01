import { dbConnect } from "@/config/db";
import { Notification } from "@/models/Notification";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const notifications = await Notification.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    return Response.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, all } = await request.json();
    await dbConnect();

    if (all) {
      await Notification.updateMany(
        { userId: session.user.id, isRead: false },
        { isRead: true }
      );
    } else if (id) {
      await Notification.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        { isRead: true }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating notification:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    await dbConnect();

    await Notification.findOneAndDelete({ _id: id, userId: session.user.id });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
