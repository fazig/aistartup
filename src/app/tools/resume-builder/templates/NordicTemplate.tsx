import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function NordicTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: '#1e293b', lineHeight: 1.55, padding: '0.75rem' }}>
      {/* Header */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 300, letterSpacing: '0.05em', margin: 0, color: '#0f172a' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '0.95rem', color: primary, fontWeight: 500, letterSpacing: '0.03em', margin: '0.3rem 0 0.6rem 0' }}>
          {personal.jobTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.8rem', color: '#64748b' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>/ {personal.phone}</span>}
          {personal.location && <span>/ {personal.location}</span>}
          {personal.website && <span>/ {personal.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.6rem' }}>
            Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600 }}>
                <span>{exp.role} <span style={{ fontWeight: 400, color: '#64748b' }}>at</span> {exp.company}</span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, fontSize: '0.82rem', color: '#334155' }}>
                {exp.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: '0.2rem' }}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education & Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.4rem' }}>
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ color: '#64748b' }}>{edu.school}, {edu.endDate}</div>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.4rem' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {skills.flatMap(s => s.skills).map((skill, i) => (
                <span key={i} style={{ border: '1px solid #cbd5e1', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
