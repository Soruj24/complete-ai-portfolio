import {
  ArrowRight, ArrowDown, Circle, Square, Diamond, GitBranch,
  MessageSquare, Brain, Database, Globe, Code, FileText,
  Sparkles,
} from "lucide-react";
import type { ElementType } from "react";

export interface WorkflowNode {
  id: string;
  label: string;
  type: "agent" | "tool" | "llm" | "memory" | "input" | "output" | "condition";
  status: "idle" | "running" | "completed" | "error";
  icon: ElementType;
  duration?: string;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
  condition?: string;
}

export const workflows = [
  { value: "customer-support", label: "Customer Support Agent" },
  { value: "research-assistant", label: "Research Assistant" },
  { value: "code-reviewer", label: "Code Reviewer" },
  { value: "content-generator", label: "Content Generator" },
];

export const defaultNodes: WorkflowNode[] = [
  { id: "input", label: "User Input", type: "input", status: "completed", icon: MessageSquare, duration: "0ms" },
  { id: "router", label: "Intent Router", type: "condition", status: "completed", icon: GitBranch, duration: "45ms" },
  { id: "classify", label: "Query Classifier", type: "llm", status: "completed", icon: Brain, duration: "320ms" },
  { id: "search", label: "Knowledge Search", type: "tool", status: "running", icon: Database, duration: "150ms" },
  { id: "context", label: "Context Builder", type: "memory", status: "idle", icon: FileText, duration: "" },
  { id: "generate", label: "Response Generator", type: "llm", status: "idle", icon: Sparkles, duration: "" },
  { id: "output", label: "Final Response", type: "output", status: "idle", icon: MessageSquare, duration: "" },
];

export const defaultEdges: WorkflowEdge[] = [
  { from: "input", to: "router", label: "message" },
  { from: "router", to: "classify", label: "classified" },
  { from: "classify", to: "search", label: "search query" },
  { from: "search", to: "context", label: "results" },
  { from: "context", to: "generate", label: "context" },
  { from: "generate", to: "output", label: "response" },
];

export const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  agent: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-500" },
  tool: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500" },
  llm: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
  memory: { bg: "bg-success/10", border: "border-success/30", text: "text-success" },
  input: { bg: "bg-info/10", border: "border-info/30", text: "text-info" },
  output: { bg: "bg-success/10", border: "border-success/30", text: "text-success" },
  condition: { bg: "bg-warning/10", border: "border-warning/30", text: "text-warning" },
};

export const statusColors: Record<string, string> = {
  idle: "bg-surface-hover",
  running: "bg-accent/20 animate-pulse",
  completed: "bg-success/20",
  error: "bg-error/20",
};
