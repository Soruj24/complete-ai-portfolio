"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PermissionCell({ granted }: { granted: boolean }) {
  return (
    <div className={cn(
      "h-7 w-7 rounded-md flex items-center justify-center transition-all",
      granted ? "bg-success/10 text-success" : "bg-surface-hover text-text-tertiary/30",
    )}>
      {granted ? <CheckCircle2 className="h-3.5 w-3.5" /> : "-"}
    </div>
  );
}
