export interface AIPrompt {
  _id: string;
  name: string;
  content: string;
  category: string;
  tags: string[];
  variables: string[];
  model: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
  version: number;
  createdAt: string;
}

export interface LLMProvider {
  _id: string;
  name: string;
  provider: "openai" | "anthropic" | "google" | "ollama" | "custom";
  apiKey: string;
  baseUrl: string;
  models: string[];
  defaultModel: string;
  enabled: boolean;
  configured: boolean;
  createdAt: string;
}

export interface MCPServer {
  _id: string;
  name: string;
  type: "stdio" | "sse" | "streamable-http";
  command: string;
  args: string[];
  env: Record<string, string>;
  enabled: boolean;
  status: "connected" | "disconnected" | "error";
  lastSeen: string;
  createdAt: string;
}

export interface WebRTCConfig {
  _id: string;
  name: string;
  iceServers: { urls: string; username?: string; credential?: string }[];
  enabled: boolean;
  createdAt: string;
}
