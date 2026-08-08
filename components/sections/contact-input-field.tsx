"use client";

import { cn } from "@/lib/utils";

export function InputField({
  id, label, error, placeholder, type = "text", ...props
}: {
  id: string; label: string; error?: string; placeholder?: string; type?: string;
  [key: string]: unknown;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-[12px] font-medium text-text-secondary">{label}</label>
      <input id={id} type={type} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-3 py-2 text-[13px] rounded-lg border bg-background transition-colors duration-200",
          "placeholder:text-text-disabled",
          "focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/40",
          error ? "border-error" : "border-border-subtle"
        )}
        {...props}
      />
      {error && <p id={`${id}-error`} className="text-[11px] text-error" role="alert">{error}</p>}
    </div>
  );
}
