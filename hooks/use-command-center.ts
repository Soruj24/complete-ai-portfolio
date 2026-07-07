"use client";

import { useState, useEffect, useCallback } from "react";
import type { CommandCenterData } from "@/shared/types/command-center";

interface UseCommandCenterReturn {
  data: CommandCenterData | null;
  loading: boolean;
  error: boolean;
  user: { name: string; email: string } | null;
  refetch: () => void;
}

export function useCommandCenter(): UseCommandCenterReturn {
  const [data, setData] = useState<CommandCenterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [statsRes, userRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/auth/me"),
      ]);

      if (!statsRes.ok) throw new Error("Failed to fetch stats");
      const statsJson = await statsRes.json();
      setData(statsJson.data);

      if (userRes.ok) {
        const userJson = await userRes.json();
        if (userJson.success) setUser(userJson.user);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, user, refetch: fetchData };
}
