import type { LucideIcon } from "lucide-react";

interface AiPageShellProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AiPageShell({ icon: Icon, title, description, children }: AiPageShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container pt-28 pb-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="p-3 rounded-2xl bg-accent/10 text-accent">
              <Icon className="w-6 h-6" aria-hidden="true" />
            </span>
          </div>
          <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-lg mx-auto">
            {description}
          </p>
        </div>
        <div className="max-w-xl mx-auto space-y-6">{children}</div>
      </div>
    </main>
  );
}
