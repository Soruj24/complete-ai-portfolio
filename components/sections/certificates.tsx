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
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      </Section>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <Section id="certificates" variant="alt">
      <SectionHeader
        label="Certificates"
        title="Professional Credentials"
        description="Certifications that validate my expertise and commitment to continuous learning."
      />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <AnimatedSection key={cert._id} delay={i * 0.05}>
              <GlassCard variant="interactive" className="p-5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <h3 className="font-semibold text-text-primary text-sm leading-snug">{cert.name}</h3>
                <p className="text-xs text-text-tertiary mt-1">{cert.providerLabel || cert.provider}</p>
                {cert.description && (
                  <p className="text-xs text-text-secondary mt-2 line-clamp-2">{cert.description}</p>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {cert.issueDate && (
                  <p className="text-[11px] text-text-tertiary mt-3">
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
