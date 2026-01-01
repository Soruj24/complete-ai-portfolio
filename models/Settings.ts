import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "YOURAPP",
    },
    contactEmail: {
      type: String,
      default: "admin@yourapp.com",
    },
    allowRegistration: {
      type: Boolean,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    // Personal Info
    fullName: {
      type: String,
      default: "Soruj Mahmud",
    },
    professionalTitle: {
      type: String,
      default: "Aspiring Full-Stack Developer",
    },
    bio: {
      type: String,
      default: "Self-taught developer with comprehensive project-based learning in modern web technologies and AI applications",
    },
    location: {
      type: String,
      default: "Tangail, Dhaka, Bangladesh",
    },
    phone: {
      type: String,
      default: "+8801795397598",
    },
    githubUrl: {
      type: String,
      default: "https://github.com/",
    },
    linkedinUrl: {
      type: String,
      default: "https://linkedin.com/",
    },
    twitterUrl: {
      type: String,
      default: "https://twitter.com/",
    },
    specializations: {
      type: [String],
      default: [
        "LangChain and AI Applications",
        "MCP Server Development",
        "Next.js, React, TypeScript",
        "MongoDB, Node.js",
        "Modern Web Technologies",
      ],
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
