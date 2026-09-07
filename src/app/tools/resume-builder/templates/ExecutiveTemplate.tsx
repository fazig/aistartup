import React from 'react';
import { ResumeData, ResumeTheme } from '../types';
import { Mail, Phone, MapPin, Globe, Share2, Code } from 'lucide-react';

export default function ExecutiveTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;
  const primary = theme.primaryColor;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32% 68%', minHeight: '100%', color: theme.textColor, lineHeight: 1.45 }}>
      {/* Left Sidebar */}
      <aside style={{ background: primary, color: '#ffffff', padding: '1.5rem 1.25rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.3rem' }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>
            {personal.jobTitle}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.78rem' }}>
          <h3 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {personal.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', wordBreak: 'break-all' }}>
                <Mail size={12} /> {personal.email}
              </div>
            )}
            {personal.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={12} /> {personal.phone}
              </div>
            )}
            {personal.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={12} /> {personal.location}
              </div>
            )}
            {personal.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', wordBreak: 'break-all' }}>
                <Globe size={12} /> {personal.website.replace(/^https?:\/\//, '')}
              </div>
            )}
            {personal.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', wordBreak: 'break-all' }}>
                <Share2 size={12} /> {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </div>
            )}
            {personal.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', wordBreak: 'break-all' }}>
                <Code size={12} /> {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </div>
            )}
          </div>
        </div>

        {/* Education in sidebar */}
        {education.length > 0 && (
          <div style={{ marginBottom: '1.5rem', fontSize: '0.78rem' }}>
            <h3 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>
              Education
            </h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                <div style={{ color: '#cbd5e1' }}>{edu.school}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '1.5rem', fontSize: '0.78rem' }}>
            <h3 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>
              Skills
            </h3>
            {skills.map(sk => (
              <div key={sk.id} style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.2rem' }}>{sk.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {sk.skills.map((s, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.35rem', borderRadius: '3px', fontSize: '0.72rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages in sidebar */}
        {languages.length > 0 && (
          <div style={{ fontSize: '0.78rem' }}>
            <h3 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.3rem', marginBottom: '0.6rem' }}>
              Languages
            </h3>
            {languages.map(l => (
              <div key={l.id} style={{ marginBottom: '0.25rem' }}>
                <strong>{l.language}</strong>: {l.proficiency}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Content Area */}
      <main style={{ padding: '1.5rem 1.5rem', background: '#ffffff' }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderBottom: `2px solid #e2e8f0`, paddingBottom: '0.25rem', marginBottom: '0.4rem' }}>
              Executive Summary
            </h2>
            <p style={{ fontSize: '0.83rem', color: '#334155', textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderBottom: `2px solid #e2e8f0`, paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>
              Professional Experience
            </h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{exp.role}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: primary, fontWeight: 600, marginBottom: '0.25rem' }}>
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                {exp.highlights.length > 0 && (
                  <ul style={{ margin: '0 0 0 1.1rem', padding: 0, fontSize: '0.8rem', color: '#334155' }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderBottom: `2px solid #e2e8f0`, paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
              Key Projects
            </h2>
            {projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{proj.title}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{proj.role}</span>
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>Stack: {proj.techStack}</div>
                )}
                <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0.15rem 0 0 0' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: primary, letterSpacing: '0.05em', borderBottom: `2px solid #e2e8f0`, paddingBottom: '0.25rem', marginBottom: '0.4rem' }}>
              Certifications
            </h2>
            {certifications.map(c => (
              <div key={c.id} style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <strong>{c.title}</strong> — {c.issuer} {c.date && `(${c.date})`}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
