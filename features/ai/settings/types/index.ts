export interface AiSettings {
  defaultModel: string;
  defaultProvider: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  streaming: boolean;
  systemPrompt: string;
  enableCostTracking: boolean;
  monthlyBudgetLimit: number;
  rateLimitPerMinute: number;
  maxConcurrentRequests: number;
  logPrompts: boolean;
  logResponses: boolean;
  retentionDays: number;
  fallbackEnabled: boolean;
  fallbackModel: string;
  cacheEnabled: boolean;
  cacheTtl: number;
}

export interface AiProvider {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  enabled: boolean;
  models: string[];
  color: string;
  icon: string;
}

export interface AiPreset {
  id: string;
  name: string;
  description: string;
  temperature: number;
  topP: number;
  maxTokens: number;
}
