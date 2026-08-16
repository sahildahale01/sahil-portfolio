import React from 'react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, EDUCATION_LIST, CERTIFICATIONS_LIST, LEADERSHIP_ROLES } from '../data/portfolioData';
import { FileText, Download, Printer, X, CheckCircle2, MapPin, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrintDownload = () => {
    window.print();
  };

  const handleTextDownload = () => {
    const resumeText = `
===================================================================
SAHIL DAHALE
B.Tech Final Year Student • Data Analyst • Data Scientist
Location: Nashik, Maharashtra, India
Email: sahildahale321@gmail.com
Phone: +91 8885055486
LinkedIn: https://www.linkedin.com/in/sahil-dahale-50aa42299/
===================================================================

SUMMARY
${PERSONAL_INFO.bio}

EDUCATION
- B.Tech in Artificial Intelligence & Machine Learning | Sandip University, Nashik
  Grade: CGPA 8.0/10 | Expected Graduation: July 2027
- Higher Secondary Certificate (Class XII) | State Board | Grade: 87.5% (2023)
- Secondary School Certificate (Class X) | State Board | Grade: 10/10 CGPA (2021)

INTERNSHIP EXPERIENCES
${EXPERIENCES.map(e => `
* ${e.role} @ ${e.company} (${e.period}) - ${e.location}
  ${e.highlights.map(h => `  - ${h}`).join('\n')}
  Stack: ${e.technologies.join(', ')}
`).join('\n')}

FEATURED PROJECTS
${PROJECTS.map(p => `
* ${p.title} (${p.category})
  Problem: ${p.problem}
  Approach: ${p.approach}
  Stack: ${p.technologies.join(', ')}
`).join('\n')}

LEADERSHIP
- Campus President @ Sandip University (Representing 3000+ students)
- Hackathon Organizing Lead @ DIPEX Official

CERTIFICATIONS
${CERTIFICATIONS_LIST.map(c => `- ${c.title} (${c.issuer}) - ${c.status}`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sahil_Dahale_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleHtmlDownload = () => {
    const a = document.createElement('a');
    a.href = '/sahil_dahale_full_portfolio.html';
    a.download = 'Sahil_Dahale_Portfolio.html';
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto font-sans text-slate-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur-md z-10 pt-1">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold">
            <FileText className="w-4 h-4 text-red-400" />
            <span>SAHIL DAHALE — OFFICIAL CV</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDownload}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleHtmlDownload}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-800"
              title="Download Standalone HTML Portfolio"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Single HTML</span>
            </button>

            <button
              onClick={handleTextDownload}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="space-y-8 pt-6">
          
          {/* Header Contact Block */}
          <div className="text-center space-y-2 border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-black text-white tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-red-400 font-mono text-sm font-semibold">{PERSONAL_INFO.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-400" /> {PERSONAL_INFO.location}</span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-1 text-slate-300 hover:text-red-400 hover:underline">
                <Phone className="w-3.5 h-3.5 text-red-400" /> {PERSONAL_INFO.phone}
              </a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 text-slate-300 hover:text-red-400 hover:underline">
                <Mail className="w-3.5 h-3.5 text-red-400" /> {PERSONAL_INFO.email}
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-red-400 hover:underline">
                <Linkedin className="w-3.5 h-3.5 text-red-400" /> linkedin.com/in/sahil-dahale-50aa42299
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Professional Summary</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Education</h2>
            <div className="space-y-2">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white">{edu.degree}</h3>
                    <p className="text-slate-400">{edu.institution} • {edu.location}</p>
                  </div>
                  <span className="font-mono text-red-400 font-bold">{edu.grade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Internships */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Work & Internship Experience</h2>
            <div className="space-y-3">
              {EXPERIENCES.map(exp => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-sm">{exp.role}</h3>
                      <p className="text-red-400 font-mono">{exp.company} ({exp.type})</p>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px]">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] font-mono text-slate-400 pt-1">Stack: {exp.technologies.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Key AI/ML Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECTS.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{p.shortDesc}</p>
                  <p className="text-[10px] font-mono text-red-400">Tech: {p.technologies.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Leadership</h2>
              {LEADERSHIP_ROLES.map(l => (
                <div key={l.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <h3 className="font-bold text-white">{l.role}</h3>
                  <p className="text-red-400 font-mono text-[11px]">{l.organization}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">Certifications</h2>
              <div className="space-y-1.5">
                {CERTIFICATIONS_LIST.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between">
                    <div>
                      <span className="font-bold text-white block">{c.title}</span>
                      <span className="text-slate-400 text-[10px]">{c.issuer}</span>
                    </div>
                    <span className="text-[10px] font-mono text-red-400">{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
