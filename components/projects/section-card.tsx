import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export function SectionCard({
  icon: Icon,
  title,
  id,
  children,
}: {
  icon: LucideIcon;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border-subtle">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-accent/8 text-accent">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export function ResultCard({
  metric,
  value,
  label,
}: {
  metric: string;
  value: string;
  label?: string;
}) {
  return (
    <div className="text-center p-4 rounded-xl bg-background border border-border-subtle">
      <div className="text-xl md:text-2xl font-bold text-accent">{value}</div>
      <div className="text-[12px] font-medium text-text-secondary mt-1">{metric}</div>
      {label && (
        <div className="text-[10px] text-text-tertiary mt-0.5">{label}</div>
      )}
    </div>
  );
}

export function PhaseCard({
  phase,
  tasks,
  i,
}: {
  phase: string;
  tasks: string[];
  i: number;
}) {
  return (
    <div className="p-5 rounded-xl bg-background border border-border-subtle">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent text-[12px] font-bold">
          {i + 1}
        </span>
        <h3 className="text-[13px] font-semibold text-text-primary">{phase}</h3>
      </div>
      <ul className="space-y-1.5">
        {tasks.map((task, j) => (
          <li key={j} className="flex items-start gap-2 text-[12.5px] text-text-secondary">
            <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-[3px]" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DetailBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-accent/8 text-accent shrink-0">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
          {label}
        </p>
        <p className="text-[13px] font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}
