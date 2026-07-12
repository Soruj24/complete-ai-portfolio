import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/ai/prompts", {
  name: "Prompt Library",
  nameSingular: "Prompt",
  description: "Manage AI prompts and templates",
  icon: "Library",
  path: "/admin/ai/prompts",
  endpoint: "/api/admin/ai/prompts",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "content", label: "Content", type: "richtext", showInTable: false, validation: { required: true } },
    { key: "category", label: "Category", type: "select", filterable: true, options: [] },
    { key: "model", label: "Model", type: "text", sortable: true },
    { key: "temperature", label: "Temperature", type: "number", validation: { min: 0, max: 2 } },
    { key: "maxTokens", label: "Max Tokens", type: "number" },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
    { key: "version", label: "Version", type: "number", sortable: true, showInForm: false },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true, history: true },
});

registerResource("/admin/ai/llm-providers", {
  name: "LLM Providers",
  nameSingular: "Provider",
  description: "Configure large language model providers",
  icon: "Sparkles",
  path: "/admin/ai/llm-providers",
  endpoint: "/api/admin/ai/llm-providers",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "provider", label: "Provider", type: "select", options: [
      { label: "OpenAI", value: "openai" }, { label: "Anthropic", value: "anthropic" },
      { label: "Google", value: "google" }, { label: "Ollama", value: "ollama" }, { label: "Custom", value: "custom" },
    ]},
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "configured", label: "Configured", type: "toggle", sortable: true, showInForm: false },
    { key: "defaultModel", label: "Default Model", type: "text", sortable: true },
    { key: "createdAt", label: "Added", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/ai/mcp-servers", {
  name: "MCP Servers",
  nameSingular: "MCP Server",
  description: "Manage MCP (Model Context Protocol) servers",
  icon: "Cable",
  path: "/admin/ai/mcp-servers",
  endpoint: "/api/admin/ai/mcp-servers",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "type", label: "Type", type: "select", options: [
      { label: "STDIO", value: "stdio" }, { label: "SSE", value: "sse" }, { label: "Streamable HTTP", value: "streamable-http" },
    ]},
    { key: "command", label: "Command", type: "text", showInTable: false },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", options: [
      { label: "Connected", value: "connected" }, { label: "Disconnected", value: "disconnected" }, { label: "Error", value: "error" },
    ]},
    { key: "lastSeen", label: "Last Seen", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/webrtc", {
  name: "WebRTC Settings",
  nameSingular: "Configuration",
  description: "Manage WebRTC configurations",
  icon: "Phone",
  path: "/admin/webrtc",
  endpoint: "/api/admin/webrtc",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});
