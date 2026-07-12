import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import {
  Hero, About, Skills, Projects, Experience,
  Contact, Certificates, Achievements, Testimonials,
  OpenSource, CTA,
} from "@/components/sections";
import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";
import { SITE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `${settings?.fullName || SITE.name} | ${settings?.professionalTitle || SITE.title}`,
    description: settings?.bio || SITE.description,
    openGraph: {
      title: `${settings?.fullName || SITE.name} | Portfolio`,
      description: settings?.bio || SITE.description,
    },
  };
}

async function getSettings() {
  try {
    await dbConnect();
    const settings = await Settings.findOne().lean();
    return settings;
  } catch {
    return null;
  }
}

export default async function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent/20 selection:text-accent">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certificates />
      <Testimonials />
      <OpenSource />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
