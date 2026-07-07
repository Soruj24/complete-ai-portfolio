import { AISettingsPage } from "@/features/ai/settings";

export const metadata = { title: "AI Settings - Admin", description: "Configure AI model providers and defaults" };

export default function AISettingsPageRoute() {
  return <AISettingsPage />;
}
