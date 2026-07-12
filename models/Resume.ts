import mongoose, { Schema, model, models } from "mongoose";

const ResumeSectionSchema = new Schema({
  title: { type: String },
  type: { type: String, enum: ["summary", "experience", "education", "skills", "certifications", "custom"], default: "custom" },
  content: { type: String },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
}, { _id: false });

const ResumeSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String },
  summary: { type: String },
  file: { type: String },
  version: { type: String },
  sections: [ResumeSectionSchema],
  templates: [{
    id: { type: String },
    name: { type: String },
    description: { type: String },
    preview: { type: String },
  }],
  isActive: { type: Boolean, default: true },
  downloads: { type: Number, default: 0 },
}, { timestamps: true });

export const Resume = models.Resume || model("Resume", ResumeSchema);
