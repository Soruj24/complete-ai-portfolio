"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
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
      <Section id="opensource" variant="alt">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      </Section>
    );
  }

  if (error || repos.length === 0) return null;

  return (
    <Section id="opensource" variant="alt">
      <SectionHeader
        label="Open Source"
        title="Projects & Contributions"
        description="Open source projects I've built and contributed to on GitHub."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <AnimatedSection key={repo.id} delay={i * 0.05}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlassCard variant="interactive" className="p-5 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-text-primary text-sm truncate">{repo.name}</h3>
                      <p className="text-xs text-text-secondary line-clamp-2 mt-0.5">
                        {repo.description || "No description"}
                      </p>
                    </div>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent" />
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
