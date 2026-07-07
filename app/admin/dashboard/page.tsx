"use client";

import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

const CommandCenterPage = lazy(() =>
  import("@/components/admin/command-center/command-center-page").then((m) => ({
    default: m.CommandCenterPage,
  }))
);

function AdminDashboardFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-6 w-6 animate-spin text-text-tertiary" />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<AdminDashboardFallback />}>
      <CommandCenterPage />
    </Suspense>
  );
}
