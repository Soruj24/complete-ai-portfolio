import { userRepository } from "@/lib/repositories";
import type { AdminUser, SystemHealth } from "@/shared/types";
import { dbConnect } from "@/config/db";

class AdminService {
  async getUsers(): Promise<AdminUser[]> {
    const result = await userRepository.findAll({ sort: "createdAt", order: "desc" });
    return result.data as unknown as AdminUser[];
  }

  async updateUser(
    userId: string,
    data: { role?: string; status?: string; name?: string }
  ): Promise<AdminUser | null> {
    const user = await userRepository.update(userId, data as any);
    return user as unknown as AdminUser | null;
  }

  async deleteUser(userId: string): Promise<AdminUser | null> {
    const user = await userRepository.delete(userId);
    return user as unknown as AdminUser | null;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const start = Date.now();
    let dbStatus: SystemHealth["database"] = { status: "connected", latency: 0 };

    try {
      await dbConnect();
      dbStatus = { status: "connected", latency: Date.now() - start };
    } catch {
      dbStatus = { status: "error", latency: Date.now() - start };
    }

    return {
      status: dbStatus.status === "connected" ? "healthy" : "degraded",
      uptime: process.uptime(),
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        percentage: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100),
      },
      cpu: { load: 0, cores: require("os").cpus().length },
      database: dbStatus,
    };
  }
}

export const adminService = new AdminService();
