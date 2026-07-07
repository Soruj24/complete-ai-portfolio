import { AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface ErrorAlertProps {
  message: string;
  id?: string;
}

export function ErrorAlert({ message, id }: ErrorAlertProps) {
  return (
    <GlassCard className="p-4 flex items-center gap-3 border-error/30" role="alert" aria-live="assertive" data-testid={id}>
      <AlertCircle className="w-5 h-5 text-error shrink-0" aria-hidden="true" />
      <p className="text-sm text-error">{message}</p>
    </GlassCard>
  );
}
