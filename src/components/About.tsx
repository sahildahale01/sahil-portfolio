import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Brain, 
  BarChart3, 
  Code2, 
  Award, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2,
  Database,
  Terminal,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>About Sahil Dahale</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Turning Data Into <span className="bg-gradient-to-r from-red-400 to-red-400 bg-clip-text text-transparent">Decisions</span>.
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Bridging raw datasets, predictive machine learning models, and high-impact business intelligence solutions.
        </p>
      </div>

      {/* Main Grid: Story + Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Authoritative Bio & Focus Points */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-950/90 border border-slate-800 p-8 backdrop-blur-xl space-y-6 flex flex-col justify-between shadow-md">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-red-400" />
              <span>Background & Mission</span>
            </h3>
            
            {/* Recruiter Quote Block */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2">
              <p className="font-semibold text-red-400 font-mono text-xs uppercase tracking-wider">
                Recruiter Profile Statement
              </p>
              <blockquote className="italic text-slate-300 border-l-2 border-red-500 pl-3 my-2 space-y-2">
                <p>
                  "Hi, I’m <strong>Sahil Dahale</strong>, an Artificial Intelligence and Machine Learning student with a strong interest in <strong>Data Science, Machine Learning, Data Analytics, and intelligent software solutions</strong>."
                </p>
                <p>
                  "I enjoy taking real-world problems, working with data, and turning that data into <strong>meaningful insights and practical machine-learning solutions</strong>."
                </p>
                <p>
                  "My experience includes working with <strong>Python, SQL, Pandas, NumPy, Scikit-learn, Power BI</strong>, and modern development tools across data analysis, machine learning, NLP, and full-stack development."
                </p>
              </blockquote>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              I am a <strong className="text-white font-semibold">B.Tech Final Year Student</strong> specializing in Artificial Intelligence & Machine Learning at Sandip University, Nashik, India (Expected July 2027) with a strong academic record of <strong className="text-red-400 font-mono">CGPA 8.0 / 10</strong>. Across 5 industry internships and campus leadership as Campus President (representing 500+ students), I bridge the gap between raw data and impactful business decisions.
            </p>

            {/* Focus List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Data Analysis & Visualization</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Machine Learning & AI</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Business Intelligence & Dashboarding</span>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-2">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">AI & Machine Learning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                NLP pipelines, TF-IDF vectorization, classification, regression, clustering & model tuning.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-2">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Data Analytics & BI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Power BI DAX measures, star schema modeling, interactive dashboards & EDA insights.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-2">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Full-Stack Development</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                React, TypeScript, Node.js, Express REST APIs, unit testing & software documentation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Campus Leadership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Campus President at Sandip University representing 500+ students & organizing tech symposiums.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Metrics */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
            <div className="absolute top-0 right-0 p-6 text-red-500/10 group-hover:text-red-500/15 transition-colors">
              <Award className="w-20 h-20" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">Leadership Impact</span>
            <div className="text-4xl font-black text-red-400 font-mono my-2">500+</div>
            <p className="text-sm font-bold text-slate-200 mb-1">Students Represented</p>
            <p className="text-xs text-slate-400">Campus President at Sandip University student council advocacy & event leadership.</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
            <div className="absolute top-0 right-0 p-6 text-red-500/10 group-hover:text-red-500/15 transition-colors">
              <GraduationCap className="w-20 h-20" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">Academic Excellence</span>
            <div className="text-4xl font-black text-red-400 font-mono my-2">8.0 / 10</div>
            <p className="text-sm font-bold text-slate-200 mb-1">B.Tech AIML CGPA</p>
            <p className="text-xs text-slate-400">Sandip University, Nashik (Class X: 10/10 CGPA, Class XII: 87.5%).</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-sm">
            <div className="absolute top-0 right-0 p-6 text-red-500/10 group-hover:text-red-500/15 transition-colors">
              <Zap className="w-20 h-20" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">Practical Experience</span>
            <div className="text-4xl font-black text-red-400 font-mono my-2">5 Internships</div>
            <p className="text-sm font-bold text-slate-200 mb-1">Industry Internships</p>
            <p className="text-xs text-slate-400">Oasis Infobyte, Mindenious, HunarIntern, SaiKet Systems, Auspify Tech.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
