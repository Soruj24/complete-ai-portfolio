import { aiChatbotPlatform } from "./ai-chatbot-platform";
import { eCommercePlatform } from "./e-commerce-platform";
import { realTimeChat } from "./real-time-chat";
import { learningManagementSystem } from "./learning-management-system";
import { cryptoDashboard } from "./crypto-dashboard";

export { aiChatbotPlatform };
export { eCommercePlatform };
export { realTimeChat };
export { learningManagementSystem };
export { cryptoDashboard };

export const projects = [
  aiChatbotPlatform,
  eCommercePlatform,
  realTimeChat,
  learningManagementSystem,
  cryptoDashboard,
];

export const featuredProject = projects.find((p) => p.featured) || projects[0];
