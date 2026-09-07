import React from 'react';
import { ResumeData, ResumeTheme } from '../types';
import { Mail, Phone, MapPin, Globe, Share2, Code } from 'lucide-react';

export default function ModernTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ color: theme.textColor, lineHeight: 1.5 }}>
      {/* Header */}
      <header style={{ borderBottom: `2px solid ${primary}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: primary, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#475569', marginBottom: '0.75rem' }}>
          {personal.jobTitle}
        </div>
        
        {/* Contact info row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.82rem', color: '#64748b' }}>
          {personal.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Mail size={13} color={primary} /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={13} color={primary} /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} color={primary} /> {personal.location}
            </span>
          )}
          {personal.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Globe size={13} color={primary} /> {personal.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personal.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Share2 size={13} color={primary} /> {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </span>
          )}
          {personal.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Code size={13} color={primary} /> {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.4rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#334155', textAlign: 'justify' }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.6rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
            Work Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{exp.role}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: primary, fontWeight: 600, marginBottom: '0.3rem' }}>
                {exp.company} {exp.location && `• ${exp.location}`}
              </div>
              {exp.highlights.length > 0 && (
                <ul style={{ margin: '0.2rem 0 0 1.2rem', padding: 0, fontSize: '0.82rem', color: '#334155' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.5rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{edu.degree}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                {edu.school} {edu.location && `• ${edu.location}`} {edu.gpa && `• GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.5rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
            Skills & Competencies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {skills.map(sk => (
              <div key={sk.id} style={{ fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                <strong style={{ minWidth: '130px', color: '#0f172a' }}>{sk.name}:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {sk.skills.map((s, idx) => (
                    <span key={idx} style={{ background: 'rgba(0,0,0,0.05)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.78rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.5rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
            Key Projects
          </h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{proj.title}</span>
                {proj.role && <span style={{ fontSize: '0.78rem', color: primary, fontWeight: 600 }}>{proj.role}</span>}
              </div>
              {proj.techStack && (
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.2rem' }}>
                  Tech: {proj.techStack} {proj.link && `• ${proj.link}`}
                </div>
              )}
              <p style={{ fontSize: '0.82rem', color: '#334155', margin: 0 }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Languages 2-col row */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.4rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
                Certifications
              </h2>
              {certifications.map(c => (
                <div key={c.id} style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  <strong>{c.title}</strong> — {c.issuer} {c.date && `(${c.date})`}
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: primary, marginBottom: '0.4rem', borderLeft: `3px solid ${primary}`, paddingLeft: '0.5rem' }}>
                Languages
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem' }}>
                {languages.map(l => (
                  <span key={l.id}><strong>{l.language}</strong>: {l.proficiency}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
