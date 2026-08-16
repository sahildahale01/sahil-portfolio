import React from 'react';
import { LEADERSHIP_ROLES } from '../data/portfolioData';
import { Award, Users, CheckCircle2, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase">
          <Award className="w-3.5 h-3.5 text-red-400" />
          <span>Responsibility & Advocacy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          LEADERSHIP <span className="bg-gradient-to-r from-red-400 via-red-400 to-indigo-400 bg-clip-text text-transparent">BEYOND CODE</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Demonstrated ability to communicate, coordinate, advocate for peers, and organize technical innovation events.
        </p>
      </div>

      {/* Leadership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LEADERSHIP_ROLES.map(role => (
          <div
            key={role.id}
            className="group relative rounded-3xl bg-slate-950 border border-slate-800 hover:border-red-500/40 p-8 backdrop-blur-xl transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Badge & Impact Pill */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold">
                  {role.impactMetric}
                </span>
              </div>

              {/* Role Title & Org */}
              <div>
                <h3 className="text-2xl font-bold text-white font-sans group-hover:text-red-400 transition-colors">
                  {role.role}
                </h3>
                <p className="text-sm font-semibold text-red-400 font-mono mt-1">
                  {role.organization}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {role.description}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-2.5 border-t border-slate-800 pt-4 text-xs sm:text-sm text-slate-300">
                {role.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Verified Leadership Role</span>
              <span className="text-red-400 font-semibold">Build + Lead + Coordinate</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
