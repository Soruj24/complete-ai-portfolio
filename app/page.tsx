import { Metadata } from "next";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const fullName = settings?.fullName || "Soruj Mahmud";
  const professionalTitle = settings?.professionalTitle || "Full-Stack Developer & AI Innovator";
  const bio = settings?.bio || "Professional portfolio of Soruj Mahmud, a Full-Stack Developer specializing in Next.js, AI integration, and scalable web solutions.";

  return {
    title: `${fullName} | ${professionalTitle}`,
    description: bio,
    keywords: ["Full-Stack Developer", "AI Engineer", "Next.js", "React", "TypeScript", "Portfolio"],
    openGraph: {
      title: `${fullName} | Portfolio`,
      description: `Explore the work and technical expertise of ${fullName}.`,
      type: "website",
    }
  };
}

async function getSettings() {
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    return settings;
  } catch (error) {
    console.error("Error fetching settings in page:", error);
    return null;
  }
}

export default async function PortfolioPage() {
  const settings = await getSettings();
  const fullName = settings?.fullName || "Soruj Mahmud";
  const siteName = settings?.siteName || "SORUJ";
  const contactEmail = settings?.contactEmail || "sorujmahmudb2h@gmail.com";
  const githubUrl = settings?.githubUrl || "https://github.com/Soruj24";
  const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com/in/soruj-mahmud";

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 selection:bg-blue-100 selection:text-blue-900 scroll-smooth transition-colors duration-500">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="contact">
        <Contact />
      </div>

      {/* Corporate CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 dark:bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-white/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-10 leading-tight">
            Ready to build something <br />
            <span className="text-blue-200">extraordinary together?</span>
          </h2>
          <p className="text-sm md:text-xl text-blue-100 font-medium mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            I&apos;m currently open to new opportunities and collaborations with forward-thinking companies.
            Let&apos;s discuss how I can contribute to your team&apos;s success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a 
              href="#contact" 
              className="px-8 md:px-10 py-4 md:py-5 bg-white text-blue-600 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-900/20 text-center"
            >
              Start a Conversation
            </a>
            <a 
              href={`mailto:${contactEmail}`}
              className="px-8 md:px-10 py-4 md:py-5 bg-blue-700 dark:bg-blue-800 text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-blue-800 dark:hover:bg-blue-900 transition-all border border-blue-500/30 text-center"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
      
      <footer className="py-12 md:py-20 border-t border-gray-100 dark:border-gray-800 bg-[#fafafa] dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
            <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
              {siteName}<span className="text-blue-600">.</span>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="text-gray-400 dark:text-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-widest text-center md:text-right">
                © {new Date().getFullYear()} {fullName}. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
                <a href={githubUrl} target="_blank" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 font-black text-[9px] md:text-xs uppercase tracking-widest transition-colors">GitHub</a>
                <a href={linkedinUrl} target="_blank" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 font-black text-[9px] md:text-xs uppercase tracking-widest transition-colors">LinkedIn</a>
                <a href={`mailto:${contactEmail}`} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 font-black text-[9px] md:text-xs uppercase tracking-widest transition-colors">Email</a>
                <a href="/login" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 font-black text-[9px] md:text-xs uppercase tracking-widest transition-colors">Login</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-gray-200/30 dark:border-gray-800 text-center">
            <p className="text-[8px] md:text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
              Built with Next.js • Tailwind CSS • Framer Motion • Shadcn UI
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
