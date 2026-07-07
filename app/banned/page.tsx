"use client";

import { useRouter } from "next/navigation";
import { Ban, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BannedPage() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface shadow-lg p-8 text-center border border-error/20 rounded-2xl">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Ban className="w-10 h-10 text-error" />
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-2">Account Banned</h1>
        <p className="text-text-secondary mb-8">
          Your account has been suspended due to a violation of our terms of service or suspicious activity.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-border-subtle text-left">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-accent" /> Need Help?
            </h3>
            <p className="text-sm text-text-tertiary">
              If you believe this is a mistake, please contact support.
            </p>
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full py-6 rounded-xl border-border-subtle hover:bg-surface-hover text-text-secondary font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>

        <p className="mt-8 text-xs text-text-tertiary">
          Access to this application is restricted for banned accounts.
        </p>
      </div>
    </div>
  );
}
