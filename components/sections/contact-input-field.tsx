"use client";

import { cn } from "@/lib/utils";

export function InputField({
  id, label, error, placeholder, type = "text", ...props
}: {
  id: string; label: string; error?: string; placeholder?: string; type?: string;
  [key: string]: unknown;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-text-secondary">{label}</label>
      <input id={id} type={type} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm rounded-xl border bg-background transition-colors",
          "placeholder:text-text-tertiary/60",
          "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50",
          error ? "border-error" : "border-border"
        )}
        {...props}
      />
      {error && <p id={`${id}-error`} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}
