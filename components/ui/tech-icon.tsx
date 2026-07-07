import { cn } from "@/lib/utils";

const techBase: Record<string, string> = {
  "next.js": "bg-neutral-950 dark:bg-neutral-50",
  react: "bg-sky-500",
  typescript: "bg-blue-600",
  javascript: "bg-amber-400",
  tailwind: "bg-cyan-500",
  node: "bg-emerald-600",
  python: "bg-amber-600",
  mongodb: "bg-emerald-500",
  postgresql: "bg-blue-500",
  redis: "bg-red-500",
  docker: "bg-blue-400",
  langchain: "bg-emerald-600",
  openai: "bg-teal-600",
  framer: "bg-pink-500",
  redux: "bg-violet-500",
  express: "bg-neutral-500",
  graphql: "bg-pink-600",
  aws: "bg-orange-400",
  git: "bg-orange-600",
  github: "bg-neutral-800 dark:bg-neutral-200",
  jest: "bg-red-600",
  cypress: "bg-emerald-600",
  vite: "bg-violet-500",
  prisma: "bg-indigo-600",
  trpc: "bg-blue-600",
  shadcn: "bg-neutral-950 dark:bg-neutral-50",
  radix: "bg-red-500",
  zod: "bg-blue-500",
  "react-hook-form": "bg-pink-500",
  "framer-motion": "bg-pink-500",
  gsap: "bg-emerald-500",
  socket: "bg-neutral-500",
  jwt: "bg-red-500",
  mcp: "bg-violet-500",
  langgraph: "bg-emerald-600",
  pinecone: "bg-amber-500",
  webrtc: "bg-orange-500",
};

function getColor(name: string): string {
  const normalized = name.toLowerCase().trim();
  const match = Object.entries(techBase).find(([key]) =>
    normalized.includes(key)
  );
  return match?.[1] ?? "bg-accent";
}

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium",
        "rounded-full bg-accent/10 text-accent border border-accent/15",
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", getColor(name))} />
      {name}
    </span>
  );
}

interface TechStackProps {
  technologies: string[];
  limit?: number;
  className?: string;
}

export function TechStack({ technologies, limit, className }: TechStackProps) {
  const display = limit ? technologies.slice(0, limit) : technologies;
  const remaining = limit ? technologies.length - limit : 0;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {display.map((tech) => (
        <TechBadge key={tech} name={tech} />
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full bg-surface text-text-tertiary border border-border">
          +{remaining}
        </span>
      )}
    </div>
  );
}
