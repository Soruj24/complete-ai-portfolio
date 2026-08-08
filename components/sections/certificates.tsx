"use client";

import { useState, useEffect } from "react";
import { Award, ExternalLink, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

interface Certificate {
  _id: string;
  name: string;
  provider: string;
  providerLabel: string;
  description: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string;
  skills: string[];
  image: string;
}

export function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data = await res.json();
          if (data.success) setCertificates(data.data);
        }
      } catch {
        // Graceful degradation
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Section id="certificates">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" role="status" aria-label="Loading certificates" />
        </div>
      </Section>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <Section id="certificates">
      <SectionHeader
        label="Certificates"
        title="Professional Credentials"
        description="Certifications that validate my expertise and commitment to continuous learning."
      />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certificates.map((cert, i) => (
            <AnimatedSection key={cert._id} delay={i * 0.05}>
              <GlassCard variant="interactive" className="p-4 h-full">
                <div className="flex items-start justify-between mb-2.5">
                  <div className="p-2 rounded-lg bg-accent/8 text-accent">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-text-tertiary hover:text-accent transition-colors duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center">
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <h3 className="font-medium text-text-primary text-[13px] leading-snug">{cert.name}</h3>
                <p className="text-[11px] text-text-tertiary mt-0.5">{cert.providerLabel || cert.provider}</p>
                {cert.description && (
                  <p className="text-[12px] text-text-secondary mt-1.5 line-clamp-2">{cert.description}</p>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {cert.issueDate && (
                  <p className="text-[10px] text-text-tertiary mt-2.5">
                    Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {cert.expiryDate && ` · Expires ${new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                  </p>
                )}
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}
