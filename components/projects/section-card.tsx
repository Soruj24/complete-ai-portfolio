import { CheckCircle2, Calendar, Clock, Users, BarChart3 } from "lucide-react";

export function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function ResultCard({ metric, value, label }: { metric: string; value: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
      <div className="text-xl md:text-2xl font-bold text-accent">{value}</div>
      <div className="text-xs text-text-secondary mt-1">{metric}</div>
      <div className="text-[10px] text-text-tertiary mt-0.5">{label}</div>
    </div>
  );
}

export function PhaseCard({ phase, tasks, i }: { phase: string; tasks: string[]; i: number }) {
  return (
    <div className="p-5 rounded-xl bg-surface border border-border">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-bold">{i + 1}</span>
        <h3 className="text-sm font-semibold">{phase}</h3>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, j) => (
          <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
        {label === "Completed" ? <Calendar className="w-4 h-4" /> : label === "Duration" ? <Clock className="w-4 h-4" /> : label === "Team" ? <Users className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
      </div>
      <div>
        <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
