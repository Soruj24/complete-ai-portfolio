import { resumeData } from "@/lib/resume";
import { AutoPrint } from "./auto-print";
import "./resume-print.css";

function PrintSkillGroup({ category, items }: { category: string; items: string[] }) {
  return (
    <div className="resume-skills-row">
      <span className="resume-skill-category">{category}:</span>
      <span className="resume-skill-items">{items.join(", ")}</span>
    </div>
  );
}

export default function ResumePage() {
  const data = resumeData;

  return (
    <div className="resume-document">
      <AutoPrint />
      <header className="resume-header">
        <h1 className="resume-name">{data.contact.name}</h1>
        <p className="resume-title">{data.contact.title}</p>
        <div className="resume-contact">
          <span>{data.contact.location}</span>
          <span className="resume-sep">|</span>
          <span>{data.contact.phone}</span>
          <span className="resume-sep">|</span>
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          {data.contact.github && (
            <>
              <span className="resume-sep">|</span>
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
                github.com/Soruj24
              </a>
            </>
          )}
          {data.contact.linkedin && (
            <>
              <span className="resume-sep">|</span>
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/soruj-mahmud
              </a>
            </>
          )}
        </div>
      </header>

      <section className="resume-section">
        <h2 className="resume-section-title">Summary</h2>
        <p className="resume-text">{data.summary}</p>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Technical Skills</h2>
        <div className="resume-skills-grid">
          {data.skills.map((group) => (
            <PrintSkillGroup key={group.category} category={group.category} items={group.items} />
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <span className="resume-entry-role">{exp.role}</span>
                <span className="resume-entry-company"> &mdash; {exp.company}</span>
              </div>
              <span className="resume-entry-period">{exp.period}</span>
            </div>
            <ul className="resume-list">
              {exp.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-entry-role">{proj.name}</span>
              <span className="resume-entry-tech">{proj.tech}</span>
            </div>
            <ul className="resume-list">
              {proj.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <span className="resume-entry-role">{edu.degree}</span>
                <span className="resume-entry-company"> &mdash; {edu.institution}</span>
              </div>
            </div>
            <p className="resume-entry-location">{edu.location}</p>
            <ul className="resume-list">
              {edu.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Certifications</h2>
        <ul className="resume-list resume-list-plain">
          {data.certifications.map((cert, i) => (
            <li key={i}>{cert.name}</li>
          ))}
        </ul>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Languages</h2>
        <p className="resume-text">
          {data.languages.map((l) => `${l.name} (${l.level})`).join(" | ")}
        </p>
      </section>
    </div>
  );
}
