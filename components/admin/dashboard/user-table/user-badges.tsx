import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "admin";
  return (
    <Badge variant="outline" className={cn(
      "rounded px-2 py-0.5 font-medium text-[10px] border-border-subtle",
      isAdmin ? "bg-accent/10 text-accent" : "bg-info/10 text-info",
    )}>
      {role}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active";
  return (
    <Badge className={cn(
      "rounded-full px-2.5 py-0.5 font-medium text-[10px] border-none",
      isActive ? "bg-success/10 text-success" : "bg-error/10 text-error",
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5 inline-block", isActive ? "bg-success" : "bg-error")} />
      {status}
    </Badge>
  );
}

export function VerifiedBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <Badge variant="outline" className="rounded px-2 py-0.5 text-[10px] font-medium border-border-subtle bg-success/5 text-success">
        Verified
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="rounded px-2 py-0.5 text-[10px] font-medium border-border-subtle text-text-tertiary">
      Pending
    </Badge>
  );
}

export function UserAvatar({ name, verified }: { name: string; verified: boolean }) {
  return (
    <div className="relative shrink-0">
      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center font-medium text-accent text-sm">
        {name.charAt(0).toUpperCase()}
      </div>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5">
          <CheckCircle className="h-3 w-3 text-success" />
        </div>
      )}
    </div>
  );
}
