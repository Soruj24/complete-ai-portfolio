import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { getPortfolioData } from "@/lib/portfolio-data";
import { SITE } from "@/lib/constants";

const Skills = dynamic(() => import("@/components/sections/skills").then(m => ({ default: m.Skills })), { ssr: true });
const Services = dynamic(() => import("@/components/sections/services").then(m => ({ default: m.Services })), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/projects").then(m => ({ default: m.Projects })), { ssr: true });
const Experience = dynamic(() => import("@/components/sections/experience").then(m => ({ default: m.Experience })), { ssr: true });
const AiEngineering = dynamic(() => import("@/components/sections/ai-engineering").then(m => ({ default: m.AiEngineering })), { ssr: true });
const Achievements = dynamic(() => import("@/components/sections/achievements").then(m => ({ default: m.Achievements })), { ssr: true });
const Certificates = dynamic(() => import("@/components/sections/certificates").then(m => ({ default: m.Certificates })), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(m => ({ default: m.Testimonials })), { ssr: true });
const OpenSource = dynamic(() => import("@/components/sections/open-source").then(m => ({ default: m.OpenSource })), { ssr: true });
const CTA = dynamic(() => import("@/components/sections/cta").then(m => ({ default: m.CTA })), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/contact").then(m => ({ default: m.Contact })), { ssr: true });

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const s = data.settings;
  return {
    title: `${s?.fullName || SITE.name} | ${s?.professionalTitle || SITE.title}`,
    description: s?.bio || SITE.description,
    openGraph: {
      title: `${s?.fullName || SITE.name} | Portfolio`,
      description: s?.bio || SITE.description,
    },
  };
}

export default async function PortfolioPage() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero settings={data.settings} socialLinks={data.socialLinks} />
      <About settings={data.settings} />
      <Skills />
      <Services />
      <Projects initialProjects={data.projects} />
      <Experience initialExperiences={data.experience} />
      <AiEngineering />
      <Achievements initialAchievements={data.achievements} />
      <Certificates initialCertificates={data.certificates} />
      <Testimonials initialTestimonials={data.testimonials} />
      <OpenSource />
      <CTA settings={data.settings} />
      <Contact settings={data.settings} socialLinks={data.socialLinks} />
      <Footer />
    </main>
  );
}
