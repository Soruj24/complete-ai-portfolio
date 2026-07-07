"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Code } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GITHUB_USERNAME } from "@/lib/constants";

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

export function OpenSource() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        else setError(true);
      })
      .catch(() => setError(true));
    return () => controller.abort();
  }, []);

  if (error || repos.length === 0) return null;

  return (
    <Section id="open-source">
      <div className="container">
        <SectionHeader
          label="Open Source"
          title="GitHub Activity"
          description="Top repositories by stars. Real code, real contributions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.name} delay={i * 0.04}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <GlassCard variant="interactive" className="p-5 h-full flex flex-col">
                  <div className="flex items-start gap-2 mb-2">
                    <Code className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <h3 className="text-sm font-semibold leading-tight line-clamp-1">{repo.name}</h3>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed flex-1">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-text-tertiary mt-auto pt-2 border-t border-border">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
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
