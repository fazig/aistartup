import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function MinimalistTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div style={{ color: '#000000', lineHeight: 1.45, padding: '0.5rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #000', paddingBottom: '0.75rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.5rem', color: '#333' }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website.replace(/^https?:\/\//, '')}</span>}
          {personal.linkedin && <span>• {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          {personal.github && <span>• {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.82rem', textAlign: 'justify', margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.45rem' }}>
            Professional Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{exp.role}</span>
                <span style={{ fontSize: '0.78rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                {exp.company} {exp.location && `, ${exp.location}`}
              </div>
              {exp.highlights.length > 0 && (
                <ul style={{ margin: '0 0 0 1.1rem', padding: 0, fontSize: '0.8rem' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '0.15rem' }}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.4rem' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '0.83rem' }}>{edu.degree}</span>
                <span style={{ fontSize: '0.78rem' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ fontSize: '0.78rem' }}>
                {edu.school} {edu.location && `• ${edu.location}`} {edu.gpa && `• GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.4rem' }}>
            Technical Skills
          </h2>
          {skills.map(sk => (
            <div key={sk.id} style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <strong>{sk.name}:</strong> {sk.skills.join(', ')}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.4rem' }}>
            Projects
          </h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.45rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{proj.title}</strong>
                {proj.techStack && <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>{proj.techStack}</span>}
              </div>
              <p style={{ margin: 0 }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Languages */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.3rem' }}>
                Certifications
              </h2>
              {certifications.map(c => (
                <div key={c.id}>• {c.title} ({c.issuer})</div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.3rem' }}>
                Languages
              </h2>
              <div>{languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
