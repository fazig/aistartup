import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function TimelineTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: theme.textColor, lineHeight: 1.45 }}>
      {/* Header */}
      <header style={{ marginBottom: '1.25rem', borderBottom: `2px solid ${primary}`, paddingBottom: '0.75rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: primary, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#475569', margin: '0.2rem 0' }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {personal.email} • {personal.phone} • {personal.location}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <p style={{ fontSize: '0.84rem', color: '#334155', marginBottom: '1.25rem' }}>{summary}</p>
      )}

      {/* Timeline Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, marginBottom: '0.75rem' }}>
            Career Timeline
          </h2>
          <div style={{ borderLeft: `2px solid ${primary}`, paddingLeft: '1rem', marginLeft: '0.5rem' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                {/* Circle marker */}
                <div style={{ position: 'absolute', left: '-1.45rem', top: '0.2rem', width: '10px', height: '10px', borderRadius: '50%', background: primary }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.88rem' }}>
                  <span>{exp.role} @ {exp.company}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0, fontSize: '0.8rem', color: '#334155' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, marginBottom: '0.5rem' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              <strong>{edu.degree}</strong> — {edu.school} ({edu.endDate})
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, marginBottom: '0.4rem' }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {skills.flatMap(s => s.skills).map((skill, i) => (
              <span key={i} style={{ background: 'rgba(0,0,0,0.06)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
