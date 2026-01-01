import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  year: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  icon: { type: String },
  color: { type: String }
}, { timestamps: true });

export const Experience = models.Experience || model("Experience", ExperienceSchema);
