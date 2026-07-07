import type { Message, ContactRequest } from "../types";

const SUBJECTS = [
  "Partnership Opportunity",
  "Freelance Project Inquiry",
  "Collaboration Request",
  "Website Feedback",
  "Job Opportunity",
  "Speaking Engagement",
  "Technical Question",
  "Feature Request",
];

const FIRST_NAMES = ["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry", "Iris", "Jack", "Kate", "Leo"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

export const MOCK_MESSAGES: Message[] = Array.from({ length: 42 }, (_, i) => {
  const statuses: Array<Message["status"]> = ["read", "unread", "flagged"];
  const sources: Array<Message["source"]> = ["contact-form", "newsletter", "direct"];
  const categories = ["General", "Project", "Business", "Technical", "Other"];

  const daysAgo = Math.floor(Math.random() * 60);
  const createdAt = new Date(Date.now() - daysAgo * 86400000);
  const isRead = Math.random() > 0.3;

  return {
    id: `msg-${i + 1}`,
    name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`,
    email: `user${i + 1}@example.com`,
    subject: SUBJECTS[i % SUBJECTS.length],
    content: `This is a detailed message regarding "${SUBJECTS[i % SUBJECTS.length]}". I would love to discuss this further and explore how we can work together on this exciting opportunity. Looking forward to your response.`,
    status: i < 5 ? "unread" : isRead ? Math.random() > 0.8 ? "flagged" : "read" : "unread",
    source: sources[i % sources.length],
    category: categories[i % categories.length],
    ip: `192.168.1.${i + 1}`,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    readAt: isRead ? new Date(createdAt.getTime() + 3600000).toISOString() : undefined,
    createdAt: createdAt.toISOString(),
  };
});

export const MOCK_CONTACT_REQUESTS: ContactRequest[] = Array.from({ length: 15 }, (_, i) => {
  const statuses: ContactRequest["status"][] = ["new", "contacted", "qualified", "converted", "closed"];
  const priorities: ContactRequest["priority"][] = ["low", "medium", "high"];

  return {
    id: `req-${i + 1}`,
    name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`,
    email: `lead${i + 1}@example.com`,
    phone: i % 3 === 0 ? `+1-555-${String(1000 + i).slice(1)}` : undefined,
    company: i % 2 === 0 ? `Company ${String.fromCharCode(65 + (i % 26))}` : undefined,
    budget: i % 3 === 0 ? `$${10 + Math.floor(Math.random() * 90)}k` : undefined,
    message: `I am interested in discussing a potential project. My budget range is flexible and I am looking for an experienced developer.`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString(),
  };
});
