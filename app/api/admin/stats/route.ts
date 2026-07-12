import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { BlogPost } from "@/models/BlogPost";
import { ContactMessage } from "@/models/ContactMessage";
import { PageView } from "@/models/PageView";
import { Download } from "@/models/Download";
import mongoose from "mongoose";
import { getGitHubService } from "@/lib/services/github";
import { getAnalyticsService } from "@/lib/services/analytics";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const [
      projectCount, projectsLastMonth,
      skillCount, skillsLastMonth,
      blogCount, blogsLastMonth,
      messageCount, messagesLastMonth,
      projectViews, projectViewsLastMonth,
      dashboardStats,
      githubStats,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Skill.countDocuments(),
      Skill.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      BlogPost.countDocuments({ published: true }),
      BlogPost.countDocuments({ published: true, createdAt: { $gte: thirtyDaysAgo } }),
      ContactMessage.countDocuments({ read: false }),
      ContactMessage.countDocuments({ read: false, createdAt: { $gte: thirtyDaysAgo } }),
      Project.aggregate([{ $group: { _id: null, total: { $sum: "$stats.views" } } }]).then(r => r[0]?.total || 0),
      Project.aggregate([{ $match: { createdAt: { $gte: thirtyDaysAgo } } }, { $group: { _id: null, total: { $sum: "$stats.views" } } }]).then(r => r[0]?.total || 0),
      getAnalyticsService().getDashboardStats().catch(() => null),
      getGitHubService().getStats().catch(() => null),
    ]);

    const computeChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100 * 10) / 10;
    };

    const stats = {
      visitors: dashboardStats?.visitors ?? 0,
      visitorsChange: dashboardStats?.visitorsChange ?? 0,
      resumeDownloads: dashboardStats?.resumeDownloads ?? 0,
      resumeDownloadsChange: dashboardStats?.resumeDownloadsChange ?? 0,
      contactMessages: messageCount,
      contactMessagesChange: computeChange(messageCount, messagesLastMonth),
      githubContributions: githubStats?.totalPRs ?? 0,
      githubContributionsChange: githubStats ? Math.round((githubStats.contributionCount / Math.max(githubStats.totalPRs, 1)) * 100) : 0,
      projectViews,
      projectViewsChange: computeChange(projectViews, projectViewsLastMonth),
    };

    const recentActivityPromises = [
      Project.find().sort({ updatedAt: -1 }).limit(3).lean(),
      BlogPost.find({ published: true }).sort({ updatedAt: -1 }).limit(2).lean(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(2).lean(),
    ] as const;

    const [recentProjects, recentBlogs, recentMessages] = await Promise.all(recentActivityPromises);

    const recentActivity: Array<{ type: string; description: string; entity: string; timestamp: string }> = [];

    for (const p of recentProjects) {
      recentActivity.push({
        type: "update", entity: "Project",
        description: `Updated "${p.title}" project`,
        timestamp: p.updatedAt?.toISOString() || new Date().toISOString(),
      });
    }
    for (const b of recentBlogs) {
      recentActivity.push({
        type: "publish", entity: "Blog",
        description: `Published "${b.title}" blog post`,
        timestamp: b.updatedAt?.toISOString() || new Date().toISOString(),
      });
    }
    for (const m of recentMessages) {
      recentActivity.push({
        type: "message", entity: "Contact",
        description: `New message from ${m.name || m.email}`,
        timestamp: m.createdAt?.toISOString() || new Date().toISOString(),
      });
    }

    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const activity = recentActivity.slice(0, 8).map((item, i) => ({ id: `act_${i}`, ...item, user: session.user.name }));

    const dbStatus = mongoose.connection.readyState === 1 ? "healthy" : "error";

    const systemHealth = {
      database: dbStatus as "healthy" | "error",
      storage: "healthy" as const,
      performance: "healthy" as const,
      uptime: Math.round((process.uptime() / 3600) * 100) / 100,
      details: {
        database: dbStatus === "healthy" ? "MongoDB connected" : "MongoDB disconnected",
        storage: "Local storage",
        performance: "Response time normal",
      },
    };

    const draftProjects = await Project.find({ status: "draft" }).sort({ updatedAt: -1 }).limit(3).lean();
    const draftBlogs = await BlogPost.find({ published: false }).sort({ updatedAt: -1 }).limit(3).lean();

    const drafts = [
      ...draftProjects.map((p) => ({
        id: p._id?.toString() || "", title: p.title, type: "project" as const, status: p.status || "draft",
        updatedAt: p.updatedAt?.toISOString() || new Date().toISOString(), href: "/admin/projects",
      })),
      ...draftBlogs.map((b) => ({
        id: b._id?.toString() || "", title: b.title, type: "blog" as const, status: "draft",
        updatedAt: b.updatedAt?.toISOString() || new Date().toISOString(), href: "/admin/blogs",
      })),
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

    return NextResponse.json({ success: true, data: { stats, activity, systemHealth, drafts } });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
