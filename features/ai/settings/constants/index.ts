import type { AiSettings, AiProvider, AiPreset } from "../types";

export const DEFAULT_SETTINGS: AiSettings = {
  defaultModel: "gpt-4o", defaultProvider: "openai",
  temperature: 0.7, topP: 1, maxTokens: 4096, streaming: true,
  systemPrompt: "You are a helpful AI assistant integrated into a portfolio CMS platform.",
  enableCostTracking: true, monthlyBudgetLimit: 500,
  rateLimitPerMinute: 60, maxConcurrentRequests: 10,
  logPrompts: true, logResponses: false, retentionDays: 30,
  fallbackEnabled: true, fallbackModel: "gpt-4o-mini",
  cacheEnabled: true, cacheTtl: 3600,
};

export const PROVIDERS: AiProvider[] = [
  { id: "openai", name: "OpenAI", apiKey: "sk-...aBcD", baseUrl: "https://api.openai.com/v1", enabled: true, models: ["GPT-4o", "GPT-4o Mini", "GPT-4 Turbo"], color: "#10a37f", icon: "Brain" },
  { id: "anthropic", name: "Anthropic", apiKey: "sk-ant-...XyZ", baseUrl: "https://api.anthropic.com/v1", enabled: true, models: ["Claude 3.5 Sonnet", "Claude 3 Haiku"], color: "#d97706", icon: "Brain" },
  { id: "google", name: "Google AI", apiKey: "AIza...1234", baseUrl: "https://generativelanguage.googleapis.com/v1", enabled: false, models: ["Gemini Pro", "Gemini Ultra"], color: "#4285f4", icon: "Brain" },
  { id: "ollama", name: "Ollama (Local)", apiKey: "", baseUrl: "http://localhost:11434/v1", enabled: true, models: ["Llama 3.1", "Mistral", "CodeLlama"], color: "#6b7280", icon: "Server" },
  { id: "mistral", name: "Mistral AI", apiKey: "", baseUrl: "https://api.mistral.ai/v1", enabled: false, models: ["Mistral Large", "Mistral Small"], color: "#7c3aed", icon: "Brain" },
];

export const PRESETS: AiPreset[] = [
  { id: "creative", name: "Creative", description: "High temperature for creative tasks", temperature: 0.9, topP: 0.95, maxTokens: 8192 },
  { id: "balanced", name: "Balanced", description: "Default balanced configuration", temperature: 0.7, topP: 1, maxTokens: 4096 },
  { id: "precise", name: "Precise", description: "Low temperature for factual responses", temperature: 0.1, topP: 0.5, maxTokens: 2048 },
  { id: "code", name: "Code", description: "Optimized for code generation", temperature: 0.2, topP: 0.8, maxTokens: 8192 },
];

export const CATEGORIES = [
  { id: "general", label: "General", icon: "Settings2" },
  { id: "providers", label: "Providers", icon: "Globe" },
  { id: "model", label: "Model Config", icon: "Cpu" },
  { id: "limits", label: "Rate Limits", icon: "Gauge" },
  { id: "logging", label: "Logging", icon: "ScrollText" },
  { id: "advanced", label: "Advanced", icon: "Zap" },
];
