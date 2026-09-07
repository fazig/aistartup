import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function SplitTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: '1.5rem', color: theme.textColor, lineHeight: 1.45 }}>
      {/* Left Column */}
      <div style={{ borderRight: `1px solid #e2e8f0`, paddingRight: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: primary, lineHeight: 1.2, marginBottom: '0.25rem' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 600, marginBottom: '1rem' }}>
          {personal.jobTitle}
        </div>

        {/* Contact */}
        <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '1.25rem' }}>
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
          {personal.website && <div>{personal.website.replace(/^https?:\/\//, '')}</div>}
          {personal.linkedin && <div>{personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: primary, marginBottom: '0.4rem' }}>
              Skills
            </h3>
            {skills.map(sk => (
              <div key={sk.id} style={{ marginBottom: '0.4rem', fontSize: '0.78rem' }}>
                <strong>{sk.name}</strong>
                <div style={{ color: '#475569' }}>{sk.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: primary, marginBottom: '0.4rem' }}>
              Education
            </h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '0.4rem', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ color: '#64748b' }}>{edu.school} ({edu.endDate})</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div>
        {summary && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, marginBottom: '0.35rem' }}>
              Summary
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#334155', margin: 0 }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, marginBottom: '0.5rem' }}>
              Work Experience
            </h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>{exp.role}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: primary, fontWeight: 600, marginBottom: '0.2rem' }}>
                  {exp.company}
                </div>
                <ul style={{ margin: '0 0 0 1.1rem', padding: 0, fontSize: '0.8rem', color: '#334155' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '0.15rem' }}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: primary, marginBottom: '0.4rem' }}>
              Key Projects
            </h3>
            {projects.map(p => (
              <div key={p.id} style={{ fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                <strong>{p.title}</strong>: {p.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
