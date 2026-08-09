import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String },
  color: { type: String },
  description: { type: String },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  yearsOfExperience: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

SkillSchema.index({ category: 1, order: 1 });
SkillSchema.index({ featured: -1 });

export const Skill = models.Skill || model("Skill", SkillSchema);
