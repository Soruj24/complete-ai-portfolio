import mongoose, { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  avatar: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
  source: { type: String, default: "manual" },
  date: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

TestimonialSchema.index({ featured: 1 });
TestimonialSchema.index({ rating: -1 });

export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
