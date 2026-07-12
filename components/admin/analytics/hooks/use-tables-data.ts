"use client";

import { useState, useEffect, useMemo } from "react";
import type { TablesData } from "@/components/admin/analytics/types";

export function useTablesData() {
  const [data, setData] = useState<TablesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/analytics/tables?days=30");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch {
        // handled by null state
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
}
