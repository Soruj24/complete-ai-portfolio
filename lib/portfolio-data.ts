import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";
import { Project } from "@/models/Project";
import { Experience } from "@/models/Experience";
import { Certificate } from "@/models/Certificate";
import { Achievement } from "@/models/Achievement";
import { Testimonial } from "@/models/Testimonial";
import { SocialLink } from "@/models/SocialLink";

export async function getPortfolioData() {
  try {
    await dbConnect();

    const [settings, projects, experience, certificates, achievements, testimonials, socialLinks] =
      await Promise.all([
        Settings.findOne().lean().catch(() => null),
        Project.find().sort({ featured: -1, createdAt: -1 }).limit(50).lean().catch(() => []),
        Experience.find().sort({ startDate: -1 }).lean().catch(() => []),
        Certificate.find().sort({ issueDate: -1 }).lean().catch(() => []),
        Achievement.find().sort({ featured: -1, date: -1 }).lean().catch(() => []),
        Testimonial.find().sort({ featured: -1 }).limit(4).lean().catch(() => []),
        SocialLink.find().lean().catch(() => []),
      ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      projects: JSON.parse(JSON.stringify(projects)),
      experience: JSON.parse(JSON.stringify(experience)),
      certificates: JSON.parse(JSON.stringify(certificates)),
      achievements: JSON.parse(JSON.stringify(achievements)),
      testimonials: JSON.parse(JSON.stringify(testimonials)),
      socialLinks: JSON.parse(JSON.stringify(socialLinks)),
    };
  } catch {
    return {
      settings: null,
      projects: [],
      experience: [],
      certificates: [],
      achievements: [],
      testimonials: [],
      socialLinks: [],
    };
  }
}
