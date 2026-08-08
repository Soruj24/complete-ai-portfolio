import {
  Rocket,
  Target,
  Lightbulb,
  Layers,
  Server,
  Puzzle,
  Bug,
  Wrench,
  ImageOff,
  BarChart3,
  TrendingUp,
  BookOpen,
  ArrowUp,
  Code,
  Database,
  FolderTree,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import {
  SectionCard,
  ResultCard,
  PhaseCard,
} from "./section-card";
import type { IProject } from "@/types";
import { TechStack } from "@/components/ui/tech-icon";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-secondary leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[7px]" />
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
        <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-secondary leading-relaxed">
          <span className="mt-[3px]">
            <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 16 16" fill="none">
              <path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="rounded-xl bg-background border border-border-subtle overflow-hidden">
      {language && (
        <div className="px-4 py-1.5 border-b border-border-subtle bg-surface">
          <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
            {language}
          </span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-[12px] font-mono text-text-secondary leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

function ScreenshotGrid({ screenshots, title }: { screenshots: string[]; title: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {screenshots.map((src, i) => (
        <div key={i} className="rounded-xl bg-surface border border-border-subtle overflow-hidden">
          <div className="relative aspect-[16/10] bg-background">
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  project: IProject;
}

export function ProjectContent({ project: p }: Props) {
  return (
    <div className="lg:col-span-1 space-y-6 min-w-0">
      {/* 1. Overview */}
      <SectionCard icon={Rocket} title="Overview" id="overview">
        <p className="text-[13.5px] text-text-secondary leading-relaxed">
          {p.overview ?? p.fullDescription ?? p.description}
        </p>
      </SectionCard>

      {/* 2. Problem */}
      {p.caseStudy?.problem && (
        <SectionCard icon={Target} title="Problem" id="problem">
          <p className="text-[13.5px] text-text-secondary leading-relaxed">
            {p.caseStudy.problem}
          </p>
        </SectionCard>
      )}

      {/* 3. Solution */}
      {p.caseStudy?.solution && (
        <SectionCard icon={Lightbulb} title="Solution" id="solution">
          <p className="text-[13.5px] text-text-secondary leading-relaxed">
            {p.caseStudy.solution}
          </p>
        </SectionCard>
      )}

      {/* 4. Key Features */}
      {p.features?.length > 0 && (
        <SectionCard icon={Layers} title="Key Features" id="features">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {p.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border-subtle"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 text-accent text-[11px] font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-[12.5px] text-text-secondary leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 5. Architecture */}
      {p.architecture && (
        <SectionCard icon={Server} title="Architecture" id="architecture">
          <p className="text-[13.5px] text-text-secondary leading-relaxed mb-4">
            {p.architecture}
          </p>
          {p.developmentHighlights?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.developmentHighlights.map((h) => (
                <div key={h.title} className="p-3.5 rounded-xl bg-background border border-border-subtle">
                  <h4 className="text-[12px] font-semibold text-text-primary mb-1">
                    {h.title}
                  </h4>
                  <p className="text-[11.5px] text-text-tertiary leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* 6. Technology Decisions */}
      {p.technologies?.length > 0 && (
        <SectionCard icon={Puzzle} title="Technology Decisions" id="tech-decisions">
          <p className="text-[13px] text-text-secondary leading-relaxed mb-4">
            Why these technologies were chosen for this project:
          </p>
          <TechStack technologies={p.technologies} />
          {p.databaseDesign && (
            <div className="mt-4">
              <h4 className="text-[12px] font-semibold text-text-primary mb-2">Database Design</h4>
              <CodeBlock code={p.databaseDesign} language="schema" />
            </div>
          )}
          {p.folderStructure && (
            <div className="mt-4">
              <h4 className="text-[12px] font-semibold text-text-primary mb-2">Project Structure</h4>
              <CodeBlock code={p.folderStructure.replace(/```/g, "")} />
            </div>
          )}
        </SectionCard>
      )}

      {/* 7. Challenges */}
      {p.challenges?.length > 0 && (
        <SectionCard icon={Bug} title="Challenges" id="challenges">
          <BulletList items={p.challenges} />
        </SectionCard>
      )}

      {/* 8. Solutions */}
      {p.solutions?.length > 0 && (
        <SectionCard icon={Wrench} title="How I Solved Them" id="solutions">
          <CheckList items={p.solutions} />
        </SectionCard>
      )}

      {/* Implementation Phases */}
      {p.implementation && p.implementation.length > 0 && (
        <SectionCard icon={Code} title="Implementation" id="implementation">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {p.implementation.map((phase, i) => (
              <PhaseCard key={phase.phase} phase={phase.phase} tasks={phase.tasks} i={i} />
            ))}
          </div>
        </SectionCard>
      )}

      {/* 9. Screenshots */}
      {p.screenshots && p.screenshots.length > 0 && (
        <SectionCard icon={ImageOff} title="Screenshots" id="screenshots">
          <ScreenshotGrid screenshots={p.screenshots} title={p.title} />
        </SectionCard>
      )}

      {/* Optimization */}
      {p.optimization && p.optimization.length > 0 && (
        <SectionCard icon={Zap} title="Optimization" id="optimization">
          <CheckList items={p.optimization} />
        </SectionCard>
      )}

      {/* Security */}
      {p.security && p.security.length > 0 && (
        <SectionCard icon={Shield} title="Security" id="security">
          <CheckList items={p.security} />
        </SectionCard>
      )}

      {/* Deployment */}
      {p.deployment && (
        <SectionCard icon={Globe} title="Deployment" id="deployment">
          <p className="text-[13.5px] text-text-secondary leading-relaxed">
            {p.deployment}
          </p>
        </SectionCard>
      )}

      {/* 10. Results / Impact */}
      {p.caseStudy && (p.caseStudy.results?.length || p.businessImpact) && (
        <SectionCard icon={BarChart3} title="Results &amp; Impact" id="results">
          {p.caseStudy.results && p.caseStudy.results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {p.caseStudy.results.map((r) => (
                <ResultCard key={r.metric} {...r} />
              ))}
            </div>
          )}
          {p.businessImpact && (
            <p className="text-[13.5px] text-text-secondary leading-relaxed">
              {p.businessImpact}
            </p>
          )}
        </SectionCard>
      )}

      {/* 11. Future Improvements */}
      {p.futureImprovements && p.futureImprovements.length > 0 && (
        <SectionCard icon={ArrowUp} title="Future Improvements" id="future">
          <BulletList items={p.futureImprovements} />
        </SectionCard>
      )}

      {/* 12. Lessons Learned */}
      {p.lessonsLearned && p.lessonsLearned.length > 0 && (
        <SectionCard icon={BookOpen} title="Lessons Learned" id="lessons">
          <BulletList items={p.lessonsLearned} />
        </SectionCard>
      )}
    </div>
  );
}
