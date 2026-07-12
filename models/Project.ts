import mongoose, { Schema, model, models } from "mongoose";

const CaseStudyResultSchema = new Schema({
  metric: { type: String },
  value: { type: String },
  label: { type: String },
}, { _id: false });

const CaseStudySchema = new Schema({
  problem: { type: String },
  solution: { type: String },
  results: [CaseStudyResultSchema],
}, { _id: false });

const PerformanceSchema = new Schema({
  loadTime: { type: Number },
  accessibility: { type: Number },
  bestPractices: { type: Number },
  seo: { type: Number },
}, { _id: false });

const ImplementationPhaseSchema = new Schema({
  phase: { type: String },
  tasks: [{ type: String }],
}, { _id: false });

const DevelopmentHighlightSchema = new Schema({
  title: { type: String },
  description: { type: String },
}, { _id: false });

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  features: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  category: { type: String },
  status: { type: String, default: "completed" },
  screenshots: [{ type: String }],
  challenges: [{ type: String }],
  solutions: [{ type: String }],
  featured: { type: Boolean, default: false },
  difficulty: { type: String },
  duration: { type: String },
  teamSize: { type: String },
  completionDate: { type: String },
  tags: [{ type: String }],
  emoji: { type: String },
  stats: {
    completionTime: String,
    teamSize: String,
    complexity: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  architecture: { type: String },
  developmentHighlights: [DevelopmentHighlightSchema],
  lessonsLearned: [{ type: String }],
  futureImprovements: [{ type: String }],
  metaDescription: { type: String },
  seoTitle: { type: String },
  performance: PerformanceSchema,
  caseStudy: CaseStudySchema,
  overview: { type: String },
  research: { type: String },
  planning: { type: String },
  databaseDesign: { type: String },
  folderStructure: { type: String },
  implementation: [ImplementationPhaseSchema],
  optimization: [{ type: String }],
  security: [{ type: String }],
  deployment: { type: String },
  businessImpact: { type: String },
}, { timestamps: true });

ProjectSchema.index({ featured: -1, createdAt: -1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ status: 1 });

export const Project = models.Project || model("Project", ProjectSchema);
