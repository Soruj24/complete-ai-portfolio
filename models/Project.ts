import mongoose, { Schema, model, models } from "mongoose";

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
    likes: { type: Number, default: 0 }
  },
  architecture: { type: String },
  developmentHighlights: [{
    title: String,
    description: String
  }],
  lessonsLearned: [{ type: String }]
}, { timestamps: true });

export const Project = models.Project || model("Project", ProjectSchema);
