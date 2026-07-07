import type { Education } from "../types";

export const MOCK_EDUCATION: Education[] = [
  {
    id: "edu-1", institution: "Stanford University", degree: "Master of Science", field: "Computer Science",
    degreeType: "master", location: "Stanford, CA", current: true, order: 1, createdAt: "2026-01-10",
    description: "Advanced studies in computer science with focus on distributed systems and machine learning.",
    highlights: ["Research assistant in distributed computing lab", "Published paper on efficient gradient descent algorithms", "Teaching assistant for Introduction to Algorithms"],
    startDate: "2024-09-01", endDate: null, gpa: "3.92",
  },
  {
    id: "edu-2", institution: "UC Berkeley", degree: "Bachelor of Science", field: "Computer Science & Mathematics",
    degreeType: "bachelor", location: "Berkeley, CA", current: false, order: 2, createdAt: "2026-01-10",
    description: "Comprehensive undergraduate education in computer science with double major in mathematics.",
    highlights: ["Dean's List all semesters", "ACM programming competition finalist", "Undergraduate research in natural language processing", "CS department tutor for 3 semesters"],
    startDate: "2020-09-01", endDate: "2024-05-31", gpa: "3.85",
  },
  {
    id: "edu-3", institution: "MIT Online", degree: "Certificate", field: "Machine Learning",
    degreeType: "certificate", location: "Online", current: false, order: 3, createdAt: "2026-02-01",
    description: "Professional certificate program covering advanced machine learning concepts and applications.",
    highlights: ["Completed 6-course specialization in 8 months", "Capstone project received distinction", "Published capstone on GitHub with 500+ stars"],
    startDate: "2023-01-01", endDate: "2023-08-31",
  },
  {
    id: "edu-4", institution: "City High School", degree: "High School Diploma", field: "STEM",
    degreeType: "high-school", location: "San Jose, CA", current: false, order: 4, createdAt: "2026-02-15",
    description: "High school education with advanced placement courses in science and mathematics.",
    highlights: ["Valedictorian - class of 2020", "AP Scholar with Distinction", "Founder of Coding Club", "Science Olympiad state champion"],
    startDate: "2016-09-01", endDate: "2020-06-15", gpa: "4.0",
  },
];
