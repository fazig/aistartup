import React from 'react';
import { ResumeData, ResumeTheme } from '../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function CreativeTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: theme.textColor, lineHeight: 1.45 }}>
      {/* Top Banner */}
      <header style={{ background: primary, color: '#ffffff', padding: '1.75rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e0e7ff', margin: '0.3rem 0 0.8rem 0' }}>
          {personal.jobTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <div style={{ padding: '0 0.5rem', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#475569', margin: 0 }}>
            "{summary}"
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem', padding: '0 0.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: primary, marginBottom: '0.6rem' }}>
            Work History
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{exp.role} — <span style={{ color: primary }}>{exp.company}</span></span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
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

      {/* Skills Grid */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.25rem', padding: '0 0.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: primary, marginBottom: '0.5rem' }}>
            Skills & Tools
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {skills.flatMap(s => s.skills).map((skill, i) => (
              <span key={i} style={{ background: primary, color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education & Projects 2-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '0 0.5rem' }}>
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: primary, marginBottom: '0.4rem' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <strong>{edu.degree}</strong>
                <div style={{ color: '#64748b' }}>{edu.school} ({edu.endDate})</div>
              </div>
            ))}
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: primary, marginBottom: '0.4rem' }}>Projects</h2>
            {projects.map(p => (
              <div key={p.id} style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <strong>{p.title}</strong>
                <div style={{ color: '#475569' }}>{p.description}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
