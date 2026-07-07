import { Briefcase, Sparkles, FileText, HelpCircle, Mail } from "lucide-react";

export const QUICK_ACTIONS = [
  { label: "Projects", icon: Briefcase, prompt: "Show me your best projects" },
  { label: "Hire Me", icon: Sparkles, prompt: "I want to hire you for a project. What are your rates and availability?" },
  { label: "Resume", icon: FileText, prompt: "I need help with my resume. Can you give me tips on how to make a strong developer resume and tell me about your experience?" },
  { label: "Generate", icon: Sparkles, prompt: "Help me brainstorm a project idea! I want to build something with AI and full-stack development. What would you recommend?" },
  { label: "Contact", icon: Mail, prompt: "How can I contact you directly?" },
  { label: "Skills", icon: HelpCircle, prompt: "What technologies do you specialize in?" },
];

export const SCROLL_THRESHOLD = 50;

export function getGreeting(): string {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

export function buildWelcomeMessage(): { id: string; role: "assistant"; content: string; timestamp: Date } {
  return {
    id: "welcome",
    role: "assistant",
    content: `${getGreeting()}! \n\nI'm **Soruj AI**, your friendly assistant.\n\nI can help you explore his experience, projects, and skills. You can also send a direct message through the **Contact Form** below or ask me how to get in touch!`,
    timestamp: new Date(),
  };
}
