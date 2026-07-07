import type { Experience } from "../types";

export const MOCK_EXPERIENCE: Experience[] = [
  {
    id: "exp-1", company: "TechCorp Inc.", position: "Senior Full-Stack Developer", location: "San Francisco, CA",
    employmentType: "full-time", current: true, order: 1, createdAt: "2026-01-10",
    description: "Leading development of microservices architecture and mentoring junior developers. Building scalable web applications serving 100K+ users.",
    highlights: ["Architected microservices migration reducing latency by 40%", "Led team of 5 developers delivering 12 major features", "Implemented CI/CD pipeline reducing deployment time by 60%"],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    startDate: "2023-03-01", endDate: null,
  },
  {
    id: "exp-2", company: "StartupXYZ", position: "Full-Stack Developer", location: "Remote",
    employmentType: "full-time", current: false, order: 2, createdAt: "2026-01-10",
    description: "Built and maintained the core product from MVP to production, working across the full stack in a fast-paced startup environment.",
    highlights: ["Built MVP that secured $2M seed funding", "Developed real-time analytics dashboard with 50+ data points", "Reduced API response time by 70% through query optimization"],
    techStack: ["React", "Node.js", "MongoDB", "Redis", "GraphQL", "Docker"],
    startDate: "2021-06-01", endDate: "2023-02-28",
  },
  {
    id: "exp-3", company: "WebAgency Pro", position: "Frontend Developer", location: "New York, NY",
    employmentType: "contract", current: false, order: 3, createdAt: "2026-01-15",
    description: "Developed responsive web applications for diverse clients across industries including e-commerce, healthcare, and education.",
    highlights: ["Delivered 20+ client projects on time and within budget", "Built reusable component library used across all projects", "Improved Lighthouse scores from 60 to 95+ for client sites"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js", "WordPress"],
    startDate: "2019-09-01", endDate: "2021-05-31",
  },
  {
    id: "exp-4", company: "DevStudio", position: "Junior Developer", location: "Austin, TX",
    employmentType: "full-time", current: false, order: 4, createdAt: "2026-01-20",
    description: "Started professional career building web applications and learning modern development practices under senior mentorship.",
    highlights: ["Contributed to 8 production applications", "Implemented automated testing achieving 85% code coverage", "Won internal hackathon with AI-powered chatbot"],
    techStack: ["JavaScript", "React", "Node.js", "MySQL", "Git"],
    startDate: "2018-01-15", endDate: "2019-08-31",
  },
  {
    id: "exp-5", company: "Various Clients", position: "Freelance Web Developer", location: "Remote",
    employmentType: "freelance", current: false, order: 5, createdAt: "2026-02-01",
    description: "Provided freelance web development services to small businesses and startups, managing full project lifecycles independently.",
    highlights: ["Completed 30+ freelance projects with 5-star client rating", "Built custom e-commerce solutions increasing client revenue by 25%", "Established referral network resulting in repeat business rate of 80%"],
    techStack: ["React", "Next.js", "Node.js", "Tailwind CSS", "Stripe"],
    startDate: "2016-06-01", endDate: "2018-01-14",
  },
  {
    id: "exp-6", company: "College Tech Lab", position: "Software Engineering Intern", location: "Boston, MA",
    employmentType: "internship", current: false, order: 6, createdAt: "2026-02-15",
    description: "Internship focused on full-stack development and research in human-computer interaction.",
    highlights: ["Developed research data collection tool used by 3 departments", "Co-authored paper on accessible web interfaces", "Won Best Intern Project award"],
    techStack: ["Python", "Django", "JavaScript", "PostgreSQL"],
    startDate: "2017-06-01", endDate: "2017-08-31",
  },
];
