export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ResumeAnalysis {
  analysis: string;
}

export interface ResumeAnalysisRequest {
  file: File;
  jobDescription?: string;
}

export interface QuestionRequest {
  question: string;
}

export interface ProjectGenerationRequest {
  spec: string;
}

export interface ImplementationPhase {
  phase: string;
  tasks: string[];
}

export interface MetricResult {
  metric: string;
  value: string;
  label: string;
}

export interface GeneratedProject {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  implementation: ImplementationPhase[];
  results: MetricResult[];
  businessImpact: string;
  emoji: string;
  category: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
