export function buildResumePrompt(
  resumeText: string,
  portfolioContext: string,
  jobDescription?: string,
): string {
  return `You are an expert technical resume reviewer. Analyze this resume against my portfolio context.

Resume Content:
${resumeText}

My Portfolio Context (for cross-reference):
${portfolioContext}

${jobDescription ? `Target Job Description:\n${jobDescription}` : ""}

Provide a structured analysis with these sections:
1. **Skills Assessment** — rate each skill category (missing, basic, proficient, expert). Cross-reference with my portfolio.
2. **Experience Gaps** — identify missing skills or experience for the target role
3. **ATS Score** — give a score out of 100 and explain why
4. **Strengths** — top 3 things the resume does well
5. **Weaknesses** — top 3 things to improve
6. **Rewrite Suggestions** — specific line-by-line recommendations
7. **Portfolio Alignment** — which of my projects best match this candidate's profile
8. **Verdict** — hire / maybe / pass with reasoning

Format as structured markdown with clear headings. Be honest and specific — this is for a senior engineering role.`;
}

export function buildQaSystemPrompt(context: string): string {
  return `You are a portfolio AI assistant. Answer questions about the portfolio owner's work, skills, and experience.

Use this retrieved context to answer accurately:
${context}

Rules:
- If the context doesn't contain the answer, say so honestly
- Cite specific projects, skills, or experiences when possible
- Keep answers concise but informative
- Format in markdown`;
}

export function buildProjectGenerationPrompt(spec: string): string {
  return `You are a senior software engineer and technical writer. Given the following project specification, generate a complete case study page in structured JSON format.

Specification:
${spec}

Return a valid JSON object with this exact structure:
{
  "title": "string",
  "description": "string (one sentence)",
  "fullDescription": "string (2-3 paragraphs)",
  "technologies": ["string"],
  "features": ["string"],
  "overview": "string",
  "problem": "string",
  "solution": "string",
  "architecture": "string",
  "challenges": ["string"],
  "implementation": [
    { "phase": "Phase 1: ...", "tasks": ["string"] }
  ],
  "results": [
    { "metric": "string", "value": "string", "label": "string" }
  ],
  "businessImpact": "string",
  "emoji": "string (single emoji)",
  "category": "AI | Full Stack | Frontend"
}

Make every section sound professional and enterprise-grade. Generate realistic, specific metrics. Return ONLY valid JSON, no markdown.`;
}
