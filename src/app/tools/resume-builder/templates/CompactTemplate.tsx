import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function CompactTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: theme.textColor, lineHeight: 1.35, fontSize: '0.78rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `2px solid ${primary}`, paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: primary, margin: 0 }}>{personal.fullName}</h1>
          <div style={{ fontWeight: 600, color: '#475569' }}>{personal.jobTitle}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#64748b' }}>
          <div>{personal.email} | {personal.phone}</div>
          <div>{personal.location} {personal.website && `| ${personal.website.replace(/^https?:\/\//, '')}`}</div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <p style={{ margin: '0 0 0.6rem 0', color: '#334155', textAlign: 'justify' }}>{summary}</p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '0.6rem' }}>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', color: primary, borderBottom: '1px solid #e2e8f0', marginBottom: '0.3rem' }}>
            Experience
          </div>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>{exp.role}, <span style={{ color: primary }}>{exp.company}</span></span>
                <span style={{ color: '#64748b' }}>{exp.startDate} - {exp.current ? 'Pres' : exp.endDate}</span>
              </div>
              <ul style={{ margin: '0.1rem 0 0 1rem', padding: 0 }}>
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education & Skills inline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {education.length > 0 && (
          <div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', color: primary, borderBottom: '1px solid #e2e8f0', marginBottom: '0.3rem' }}>
              Education
            </div>
            {education.map(edu => (
              <div key={edu.id}>
                <strong>{edu.degree}</strong>, {edu.school} ({edu.endDate})
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', color: primary, borderBottom: '1px solid #e2e8f0', marginBottom: '0.3rem' }}>
              Core Skills
            </div>
            <div>{skills.flatMap(s => s.skills).join(' • ')}</div>
          </div>
        )}
      </div>
    </div>
  );
}
