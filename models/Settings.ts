import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // General
    siteName: { type: String, default: "Portfolio" },
    siteDescription: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    contactEmail: { type: String, default: "" },

    // Profile
    fullName: { type: String, default: "" },
    professionalTitle: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // Social
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    specializations: { type: [String], default: [] },

    // SEO
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },
    ogImage: { type: String, default: "" },

    // Appearance
    theme: { type: String, default: "system" },
    accentColor: { type: String, default: "#3b82f6" },
    layoutStyle: { type: String, default: "modern" },

    // Security
    allowRegistration: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },

    updatedBy: { type: String },
  },
  { timestamps: true }
);

const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
