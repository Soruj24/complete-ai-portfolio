"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";


interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export function OpenSource() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github/repos");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (data.success) {
          setRepos(data.data.slice(0, 6));
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <Section id="opensource">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
        </div>
      </Section>
    );
  }

  if (error || repos.length === 0) return null;

  return (
    <Section id="opensource">
      <SectionHeader
        label="Open Source"
        title="Projects & Contributions"
        description="Open source projects I've built and contributed to on GitHub."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.id} delay={i * 0.05}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlassCard variant="interactive" className="p-4 h-full">
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className="p-1.5 rounded-md bg-accent/8 text-accent">
                      <Github className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-text-primary text-[13px] truncate">{repo.name}</h3>
                      <p className="text-[11px] text-text-secondary line-clamp-2 mt-0.5">
                        {repo.description || "No description"}
                      </p>
                    </div>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {repo.forks_count}
                    </span>
                  </div>
                </GlassCard>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}
