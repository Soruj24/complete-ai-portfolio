"use client";

import {
  Brain,
  Bot,
  Database,
  Layers,
  Server,
  Monitor,
  ArrowRight,
  Plug,
  Workflow,
  Cloud,
  Cpu,
  Globe,
  MessageSquare,
  Search,
  Boxes,
  Network,
  Loader2,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";

interface AiProject {
  name: string;
  problem: string;
  architecture: { step: string; icon: React.ElementType; label: string }[];
  model: string;
  tools: string[];
  vectorDb: string;
  backend: string;
  frontend: string;
  capabilities: string[];
}

const AI_PROJECTS: AiProject[] = [
  {
    name: "Intelligent Document Q&A System",
    problem:
      "Users need to query large document collections and get accurate, context-aware answers with source citations.",
    architecture: [
      { step: "1", icon: Globe, label: "User Query" },
      { step: "2", icon: Search, label: "Query Embedding" },
      { step: "3", icon: Database, label: "Vector Search" },
      { step: "4", icon: Brain, label: "LLM + Context" },
      { step: "5", icon: MessageSquare, label: "Streamed Answer" },
    ],
    model: "GPT-4o / Claude 3.5 Sonnet",
    tools: ["LangChain", "Retrieval Chain", "Structured Output"],
    vectorDb: "Pinecone / pgvector",
    backend: "Node.js + Express",
    frontend: "Next.js + Streaming UI",
    capabilities: [
      "RAG with source citations",
      "Semantic document search",
      "Streaming token-by-token responses",
      "Multi-format document ingestion (PDF, DOCX, TXT)",
      "Conversation memory with context window",
    ],
  },
  {
    name: "Multi-Agent Research Assistant",
    problem:
      "Complex research tasks require multiple specialized agents collaborating to gather, analyze, and synthesize information.",
    architecture: [
      { step: "1", icon: MessageSquare, label: "User Task" },
      { step: "2", icon: Network, label: "Planner Agent" },
      { step: "3", icon: Boxes, label: "Worker Agents" },
      { step: "4", icon: Brain, label: "Synthesis" },
      { step: "5", icon: Monitor, label: "Final Report" },
    ],
    model: "GPT-4o / Claude 3.5 Sonnet",
    tools: ["LangGraph", "LangChain Tools", "Tavily Search"],
    vectorDb: "In-memory (agent state)",
    backend: "Node.js + LangGraph.js",
    frontend: "Next.js + Real-time Stream",
    capabilities: [
      "Multi-agent orchestration with LangGraph",
      "Task decomposition and parallel execution",
      "Tool calling across agents",
      "Stateful conversation with checkpointing",
      "Dynamic agent routing based on task type",
    ],
  },
  {
    name: "AI-Powered Code Review Bot",
    problem:
      "Development teams need automated, intelligent code review that understands context, suggests improvements, and catches issues beyond linting.",
    architecture: [
      { step: "1", icon: Plug, label: "MCP Server" },
      { step: "2", icon: Cpu, label: "Code Analysis" },
      { step: "3", icon: Brain, label: "LLM Review" },
      { step: "4", icon: Workflow, label: "Tool Execution" },
      { step: "5", icon: MessageSquare, label: "PR Comments" },
    ],
    model: "Claude 3.5 Sonnet / GPT-4o",
    tools: ["MCP Protocol", "GitHub API", "Tree-sitter AST"],
    vectorDb: "Codebase embeddings (Pinecone)",
    backend: "Node.js + MCP Server",
    frontend: "GitHub App / Web Dashboard",
    capabilities: [
      "MCP server for AI tool integration",
      "AST-aware code analysis",
      "Context-aware suggestions with codebase understanding",
      "Automated PR review comments",
      "Security vulnerability detection",
    ],
  },
  {
    name: "RAG-Powered Knowledge Base",
    problem:
      "Organizations need an internal knowledge base where employees can ask questions and get answers grounded in company documentation.",
    architecture: [
      { step: "1", icon: Cloud, label: "Doc Ingestion" },
      { step: "2", icon: Database, label: "Chunk + Embed" },
      { step: "3", icon: Server, label: "Vector Store" },
      { step: "4", icon: Brain, label: "RAG Chain" },
      { step: "5", icon: Monitor, label: "Chat UI" },
    ],
    model: "GPT-4o Mini / Claude 3 Haiku",
    tools: ["LangChain", "Text Splitters", "Retrieval QA"],
    vectorDb: "MongoDB Atlas / Pinecone",
    backend: "Next.js API Routes",
    frontend: "Next.js + shadcn/ui",
    capabilities: [
      "Multi-format document ingestion pipeline",
      "Semantic chunking with overlap",
      "Hybrid search (semantic + keyword)",
      "Grounded answers with source references",
      "Admin dashboard for document management",
    ],
  },
];

function ArchitectureFlow({ steps }: { steps: AiProject["architecture"] }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.step} className="flex items-center gap-1 shrink-0">
            <div className="flex flex-col items-center gap-1 p-2 sm:p-2.5 rounded-lg bg-background border border-border-subtle min-w-[56px] sm:min-w-[64px]">
              <Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span className="text-[8px] sm:text-[9px] font-medium text-text-tertiary text-center leading-tight">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-border-strong shrink-0" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle">
      {label}
    </span>
  );
}

function ProjectCard({ project, index }: { project: AiProject; index: number }) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="p-5 md:p-6 rounded-2xl bg-surface border border-border-subtle space-y-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-accent/8 text-accent">
              <Brain className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
              {project.name}
            </h3>
          </div>
          <p className="text-[12.5px] text-text-secondary leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Architecture Flow */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-2">
            Architecture
          </p>
          <ArchitectureFlow steps={project.architecture} />
        </div>

        {/* Tech Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
              Model
            </p>
            <p className="text-[11.5px] text-text-secondary">{project.model}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
              Vector DB
            </p>
            <p className="text-[11.5px] text-text-secondary">{project.vectorDb}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
              Backend
            </p>
            <p className="text-[11.5px] text-text-secondary">{project.backend}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
              Frontend
            </p>
            <p className="text-[11.5px] text-text-secondary">{project.frontend}</p>
          </div>
        </div>

        {/* Tools */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-2">
            Tools
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tools.map((tool) => (
              <TechPill key={tool} label={tool} />
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-2">
            Key Capabilities
          </p>
          <ul className="space-y-1.5">
            {project.capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11.5px] text-text-secondary leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-[5px]" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function AiEngineering() {
  return (
    <Section id="ai-engineering">
      <div className="container">
        <SectionHeader
          label="AI Engineering"
          title="Building with LLMs & Agents"
          description="Production AI applications using RAG, multi-agent systems, tool calling, and modern LLM infrastructure."
        />

        {/* Capabilities Overview */}
        <AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
            {[
              { icon: MessageSquare, label: "AI Chatbots" },
              { icon: Search, label: "RAG Systems" },
              { icon: Bot, label: "AI Agents" },
              { icon: Plug, label: "MCP Tools" },
              { icon: Boxes, label: "Multi-Agent" },
              { icon: Database, label: "Vector DBs" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 p-3 sm:p-3.5 rounded-xl bg-surface border border-border-subtle min-h-[72px] justify-center"
                >
                  <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-text-secondary text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {AI_PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <AnimatedSection delay={0.3}>
          <p className="text-center text-[11px] text-text-tertiary mt-8 max-w-lg mx-auto">
            These projects use existing foundation models (OpenAI, Anthropic) via API.
            I build the application layer — retrieval pipelines, agent orchestration, tool integration, and streaming interfaces.
          </p>
        </AnimatedSection>
      </div>
    </Section>
  );
}
