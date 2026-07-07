import { Loader2, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  defaultText?: string;
  className?: string;
  variant?: "accent" | "secondary";
}

export function SubmitButton({
  onClick,
  disabled = false,
  loading = false,
  loadingText = "Processing...",
  defaultText = "Submit",
  className = "",
  variant = "accent",
}: SubmitButtonProps) {
  const baseClass =
    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variantClass =
    variant === "accent"
      ? "bg-accent text-accent-foreground hover:brightness-110"
      : "bg-surface text-text-primary border border-border hover:bg-border";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseClass, variantClass, className)}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        <>
          <Sparkle className="w-4 h-4" aria-hidden="true" />
          {defaultText}
        </>
      )}
    </button>
  );
}
