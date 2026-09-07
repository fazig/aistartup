import React from 'react';
import { ResumeData, ResumeTheme } from '../types';
import { Terminal, Code, Globe, Share2, Mail, Phone, MapPin } from 'lucide-react';

export default function TechTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: theme.textColor, lineHeight: 1.5, fontFamily: 'monospace, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Terminal size={20} color={primary} />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#f8fafc' }}>
            {personal.fullName}
          </h1>
        </div>
        <div style={{ fontSize: '1rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.75rem' }}>
          &gt; {personal.jobTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem', color: '#94a3b8' }}>
          {personal.email && <span>email: {personal.email}</span>}
          {personal.github && <span>github: {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
          {personal.website && <span>web: {personal.website.replace(/^https?:\/\//, '')}</span>}
          {personal.location && <span>loc: {personal.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <div style={{ background: 'rgba(0,0,0,0.03)', borderLeft: `3px solid ${primary}`, padding: '0.75rem', borderRadius: '4px', marginBottom: '1.2rem', fontSize: '0.82rem' }}>
          <p style={{ margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: primary, marginBottom: '0.6rem' }}>
            ## EXPERIENCE
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700 }}>
                <span>{exp.role} @ <span style={{ color: primary }}>{exp.company}</span></span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>[{exp.startDate} - {exp.current ? 'NOW' : exp.endDate}]</span>
              </div>
              <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: '0.8rem', color: '#334155' }}>
                {exp.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: '0.2rem' }}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: primary, marginBottom: '0.6rem' }}>
            ## OPEN SOURCE & PROJECTS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.6rem', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.title}</div>
                {proj.techStack && (
                  <div style={{ fontSize: '0.72rem', color: primary, fontWeight: 600, margin: '0.15rem 0' }}>
                    [{proj.techStack}]
                  </div>
                )}
                <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: primary, marginBottom: '0.5rem' }}>
            ## TECH STACK & SKILLS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {skills.map(sk => (
              <div key={sk.id} style={{ fontSize: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                <strong style={{ minWidth: '120px' }}>{sk.name}:</strong>
                <span style={{ color: '#475569' }}>{sk.skills.join(' | ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: primary, marginBottom: '0.4rem' }}>
            ## EDUCATION
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>{edu.degree}</strong>, {edu.school}</span>
              <span style={{ color: '#64748b' }}>{edu.endDate}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
