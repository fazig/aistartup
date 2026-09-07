import React from 'react';
import { ResumeData, ResumeTheme } from '../types';
import ModernTemplate from './ModernTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import TechTemplate from './TechTemplate';
import CreativeTemplate from './CreativeTemplate';
import AcademicTemplate from './AcademicTemplate';
import NordicTemplate from './NordicTemplate';
import SplitTemplate from './SplitTemplate';
import CompactTemplate from './CompactTemplate';
import TimelineTemplate from './TimelineTemplate';

export default function ResumeRenderer({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const getTemplate = () => {
    switch (theme.templateId) {
      case 'executive':
        return <ExecutiveTemplate data={data} theme={theme} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} theme={theme} />;
      case 'tech':
        return <TechTemplate data={data} theme={theme} />;
      case 'creative':
        return <CreativeTemplate data={data} theme={theme} />;
      case 'academic':
        return <AcademicTemplate data={data} theme={theme} />;
      case 'nordic':
        return <NordicTemplate data={data} theme={theme} />;
      case 'split':
        return <SplitTemplate data={data} theme={theme} />;
      case 'compact':
        return <CompactTemplate data={data} theme={theme} />;
      case 'timeline':
        return <TimelineTemplate data={data} theme={theme} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} theme={theme} />;
    }
  };

  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'serif':
        return 'Georgia, Cambria, "Times New Roman", Times, serif';
      case 'mono':
        return 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      case 'geometric':
        return '"Trebuchet MS", "Lucida Sans", Arial, sans-serif';
      case 'sans':
      default:
        return 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    }
  };

  const getPadding = () => {
    switch (theme.density) {
      case 'compact':
        return '1.25rem';
      case 'spacious':
        return '2.5rem';
      case 'normal':
      default:
        return '2rem';
    }
  };

  return (
    <div
      id="resume-preview-sheet"
      className="resume-sheet"
      style={{
        width: '100%',
        maxWidth: theme.paperSize === 'letter' ? '816px' : '794px',
        minHeight: theme.paperSize === 'letter' ? '1056px' : '1123px',
        background: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: getPadding(),
        margin: '0 auto',
        fontFamily: getFontFamily(),
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      {getTemplate()}
    </div>
  );
}

export { ResumeRenderer };
