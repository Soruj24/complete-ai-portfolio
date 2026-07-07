"use client";

import { useState, type ReactNode } from "react";
import { Loader2, CheckCircle, AlertCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeedButtonProps {
  resource: "all" | "projects" | "skills" | "experience" | "blogs";
  label: string;
  icon?: ReactNode;
}

export function SeedButton({ resource, label, icon }: SeedButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleClick() {
    setState("loading");
    setMessage("");
    try {
      const params = resource === "all" ? "all=1" : `${resource}=1`;
      const res = await fetch(`/api/seed?${params}`);
      const text = await res.text();

      if (text.includes("Unauthorized") || text.includes("Forbidden")) {
        setState("error");
        setMessage("You must be logged in as admin");
        return;
      }

      setState("success");
      setMessage(resource === "all" ? "All data seeded" : `${label} seeded`);
    } catch {
      setState("error");
      setMessage("Failed to seed. Is MongoDB running?");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={state === "loading"}
        className="h-8 text-xs gap-1.5"
      >
        {state === "loading" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : state === "success" ? (
          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
        ) : state === "error" ? (
          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
        ) : (
          icon || <Database className="h-3.5 w-3.5" />
        )}
        {state === "loading" ? "Seeding..." : label}
      </Button>
      {message && (
        <span className={`text-xs ${state === "error" ? "text-red-500" : "text-emerald-500"}`}>
          {message}
        </span>
      )}
    </div>
  );
}
