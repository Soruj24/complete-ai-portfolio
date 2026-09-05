export type {
  ResumeContact,
  ResumeSkillGroup,
  ResumeExperience,
  ResumeEducation,
  ResumeProject,
  ResumeCertification,
  ResumeLanguage,
  ResumeData,
} from "./resume-types";

export { resumeData } from "./resume-data";
export {
  getResumeJsonLd,
  formatSkillGroups,
  formatExperience,
  formatProjects,
  getPlainTextResume,
} from "./resume-utils";
