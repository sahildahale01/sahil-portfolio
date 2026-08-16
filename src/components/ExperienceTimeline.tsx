import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Terminal
} from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase">
          <Briefcase className="w-3.5 h-3.5 text-red-400" />
          <span>Industry Internships</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PROFESSIONAL <span className="bg-gradient-to-r from-red-400 via-red-400 to-indigo-400 bg-clip-text text-transparent">EXPERIENCE</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Hands-on technical roles spanning Data Science, Machine Learning pipelines, Full-Stack Web Development, and Data Analytics.
        </p>
      </div>

      {/* Vertical Cinematic Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 lg:ml-12 space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 sm:pl-10 group">
            
            {/* Timeline Node Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-red-500 text-red-400 flex items-center justify-center font-mono text-xs font-bold shadow-sm group-hover:scale-110 transition-transform">
              0{index + 1}
            </div>

            {/* Experience Card */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 hover:border-red-500/40 p-6 sm:p-8 backdrop-blur-xl transition-all shadow-md space-y-4">
              
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                    <span>{exp.role}</span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                      {exp.type}
                    </span>
                  </h3>
                  <p className="text-base font-semibold text-red-400 font-mono mt-1">
                    @ {exp.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base font-sans">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> Stack:
                </span>
                {exp.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
