import { CheckCircle2, Rocket as RocketIcon, BarChart3 as BarChartIcon, Target as TargetIcon, Lightbulb as LightbulbIcon, Search as SearchIcon, Building as BuildingIcon, Server as ServerIcon, Database as DatabaseIcon, FolderTree as FolderTreeIcon, Code as CodeIcon, Cpu as CpuIcon, Zap as ZapIcon, Shield as ShieldIcon, Globe as GlobeIcon, TrendingUp as TrendingUpIcon, BookOpen as BookOpenIcon } from "lucide-react";
import { SectionCard, ResultCard, PhaseCard } from "./section-card";
import type { IProject } from "@/types";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  project: IProject;
}

export function ProjectContent({ project: p }: Props) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <SectionCard icon={RocketIcon} title="Overview">
        <p className="text-sm text-text-secondary leading-relaxed">{p.overview ?? p.fullDescription}</p>
      </SectionCard>

      {p.caseStudy?.results && p.caseStudy.results.length > 0 && (
        <SectionCard icon={BarChartIcon} title="Key Results">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {p.caseStudy.results.map((r) => <ResultCard key={r.metric} {...r} />)}
          </div>
        </SectionCard>
      )}

      {p.caseStudy && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SectionCard icon={TargetIcon} title="The Problem">
            <p className="text-sm text-text-secondary leading-relaxed">{p.caseStudy.problem}</p>
          </SectionCard>
          <SectionCard icon={LightbulbIcon} title="The Solution">
            <p className="text-sm text-text-secondary leading-relaxed">{p.caseStudy.solution}</p>
          </SectionCard>
        </div>
      )}

      {p.research && <SectionCard icon={SearchIcon} title="Research"><p className="text-sm text-text-secondary leading-relaxed">{p.research}</p></SectionCard>}
      {p.planning && <SectionCard icon={BuildingIcon} title="Planning"><p className="text-sm text-text-secondary leading-relaxed">{p.planning}</p></SectionCard>}

      <SectionCard icon={ServerIcon} title="Architecture">
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{p.architecture}</p>
        {p.developmentHighlights && p.developmentHighlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {p.developmentHighlights.map((h) => (
              <div key={h.title} className="p-3 rounded-xl bg-background border border-border">
                <h4 className="text-xs font-semibold mb-1">{h.title}</h4>
                <p className="text-[11px] text-text-tertiary leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {p.databaseDesign && <SectionCard icon={DatabaseIcon} title="Database Design"><p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{p.databaseDesign}</p></SectionCard>}

      {p.folderStructure && (
        <SectionCard icon={FolderTreeIcon} title="Folder Structure">
          <pre className="text-xs text-text-secondary leading-relaxed bg-background p-4 rounded-xl border border-border overflow-x-auto whitespace-pre font-mono">{p.folderStructure.replace(/```/g, "")}</pre>
        </SectionCard>
      )}

      {p.implementation && p.implementation.length > 0 && (
        <SectionCard icon={CodeIcon} title="Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.implementation.map((phase, i) => <PhaseCard key={phase.phase} phase={phase.phase} tasks={phase.tasks} i={i} />)}
          </div>
        </SectionCard>
      )}

      {p.challenges && p.challenges.length > 0 && <SectionCard icon={CpuIcon} title="Challenges"><BulletList items={p.challenges} /></SectionCard>}
      {p.optimization && p.optimization.length > 0 && <SectionCard icon={ZapIcon} title="Optimization"><CheckList items={p.optimization} /></SectionCard>}
      {p.security && p.security.length > 0 && <SectionCard icon={ShieldIcon} title="Security"><CheckList items={p.security} /></SectionCard>}

      {p.deployment && <SectionCard icon={GlobeIcon} title="Deployment"><p className="text-sm text-text-secondary leading-relaxed">{p.deployment}</p></SectionCard>}
      {p.businessImpact && <SectionCard icon={TrendingUpIcon} title="Business Impact"><p className="text-sm text-text-secondary leading-relaxed">{p.businessImpact}</p></SectionCard>}

      {p.lessonsLearned && p.lessonsLearned.length > 0 && <SectionCard icon={BookOpenIcon} title="Lessons Learned"><BulletList items={p.lessonsLearned} /></SectionCard>}

      {p.futureImprovements && p.futureImprovements.length > 0 && <SectionCard icon={RocketIcon} title="Future Improvements"><BulletList items={p.futureImprovements} /></SectionCard>}
    </div>
  );
}
