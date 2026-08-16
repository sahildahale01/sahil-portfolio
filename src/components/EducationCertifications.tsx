import React from 'react';
import { EDUCATION_LIST, CERTIFICATIONS_LIST } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function EducationCertifications() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase">
          <GraduationCap className="w-3.5 h-3.5 text-red-400" />
          <span>Academic Foundation</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          EDUCATION & <span className="bg-gradient-to-r from-red-400 via-red-400 to-indigo-400 bg-clip-text text-transparent">CERTIFICATIONS</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Rigorous academic training in AI/ML along with specialized industry credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Education Column */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5 text-red-400" />
            <span>Academic Qualifications</span>
          </h3>

          <div className="space-y-4">
            {EDUCATION_LIST.map((edu, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-red-500/30 backdrop-blur-xl transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-white font-sans">{edu.degree}</h4>
                    <p className="text-xs font-mono text-red-400">{edu.institution} • {edu.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
                    {edu.grade}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{edu.details}</p>

                <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-red-400" />
            <span>Industry Certifications</span>
          </h3>

          <div className="space-y-4">
            {CERTIFICATIONS_LIST.map((cert, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-500/30 backdrop-blur-xl transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans">{cert.title}</h4>
                  <p className="text-xs font-mono text-red-400">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-slate-500">ID: {cert.credentialId}</p>
                  )}
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shrink-0 flex items-center gap-1 ${
                    cert.status === 'Completed'
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : 'bg-slate-900 border border-slate-800 text-slate-300'
                  }`}
                >
                  {cert.status === 'Completed' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-red-400" /> Completed
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-red-400" /> In Progress
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
