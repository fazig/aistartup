import React from 'react';
import { ResumeData, ResumeTheme } from '../types';

export default function AcademicTemplate({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div style={{ color: '#111827', fontFamily: 'Georgia, Cambria, serif', lineHeight: 1.5, padding: '0.5rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', borderBottom: '2px solid #111827', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '0.04em', margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: '1rem', fontStyle: 'italic', margin: '0.25rem 0 0.5rem 0' }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {personal.location && <span>{personal.location}</span>}
          {personal.email && <span>• {personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.website && <span>• {personal.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Education First for Academic */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111827', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{edu.school}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                {edu.degree} {edu.gpa && `(GPA: ${edu.gpa})`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111827', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Research & Professional Profile
          </h2>
          <p style={{ fontSize: '0.85rem', textAlign: 'justify', margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111827', paddingBottom: '0.2rem', marginBottom: '0.6rem' }}>
            Professional Appointments
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{exp.role}, {exp.company}</span>
                <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.highlights.length > 0 && (
                <ul style={{ margin: '0.25rem 0 0 1.25rem', padding: 0, fontSize: '0.85rem' }}>
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
          <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111827', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Selected Projects & Publications
          </h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <strong>{proj.title}</strong> ({proj.techStack})
              <p style={{ margin: '0.1rem 0' }}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111827', paddingBottom: '0.2rem', marginBottom: '0.4rem' }}>
            Areas of Expertise
          </h2>
          {skills.map(sk => (
            <div key={sk.id} style={{ fontSize: '0.85rem', marginBottom: '0.2rem' }}>
              <strong>{sk.name}:</strong> {sk.skills.join(', ')}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
