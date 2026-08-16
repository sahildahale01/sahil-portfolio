import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { 
  FolderGit2, 
  ExternalLink, 
  Linkedin, 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle, 
  Activity, 
  Brain, 
  BarChart3, 
  Sliders, 
  Play,
  ArrowRight
} from 'lucide-react';

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'ML' | 'NLP' | 'Analytics' | 'Web'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Interactive Simulator States for Modal
  // 1. Resume NLP Matcher
  const [jobDescInput, setJobDescInput] = useState('Looking for AI ML Engineer proficient in Python, Scikit-learn, NLP, and Data Pipelines.');
  const [resumeTextInput, setResumeTextInput] = useState('Sahil Dahale - AI ML Engineer skilled in Python, Scikit-learn, TF-IDF NLP text processing, Pandas, and Model Building.');
  const [matchScoreResult, setMatchScoreResult] = useState<number | null>(88);

  // 2. Churn Predictor
  const [churnTenure, setChurnTenure] = useState(4);
  const [churnSupportTickets, setChurnSupportTickets] = useState(6);
  const [churnMonthlyCharge, setChurnMonthlyCharge] = useState(85);

  // 3. Credit Fraud
  const [fraudAmount, setFraudAmount] = useState(450);
  const [fraudHour, setFraudHour] = useState(3);
  const [fraudDistance, setFraudDistance] = useState(120);
  const [fraudForeign, setFraudForeign] = useState(true);

  // 4. Sales BI Dashboard
  const [salesRegion, setSalesRegion] = useState('North');
  const [salesCategory, setSalesCategory] = useState('Tech');

  // 5. Customer Clustering
  const [clusterIncome, setClusterIncome] = useState(70);
  const [clusterScore, setClusterScore] = useState(80);

  // 6. Attrition Predictor
  const [attritionOvertime, setAttritionOvertime] = useState(true);
  const [attritionYears, setAttritionYears] = useState(2);
  const [attritionWLB, setAttritionWLB] = useState(2);

  // 7. Spam Filter
  const [spamInputText, setSpamInputText] = useState('URGENT! You have won a $1,000 cash reward! Click link now to claim your prize.');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const calculateResumeMatch = () => {
    const jobWords = new Set(jobDescInput.toLowerCase().match(/\w+/g) || []);
    const resumeWords = new Set(resumeTextInput.toLowerCase().match(/\w+/g) || []);
    if (jobWords.size === 0) return;
    
    let intersection = 0;
    jobWords.forEach(w => {
      if (resumeWords.has(w)) intersection++;
    });

    const sim = Math.min(98, Math.max(15, Math.round((intersection / jobWords.size) * 100)));
    setMatchScoreResult(sim);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-red-400" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-red-400 to-red-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-base">
            Real-world solutions with data-driven insights and predictive intelligence.
          </p>
        </div>

        {/* View All Projects CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveCategory('All')}
            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer border border-red-500"
          >
            <span>View All Projects</span>
            <span>↗</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 mb-10">
        {['All', 'ML', 'NLP', 'Analytics'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === cat
                ? 'bg-red-600 text-white font-bold shadow-sm border border-red-500'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{cat === 'All' ? 'ALL PROJECTS' : cat}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(p => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="group relative rounded-3xl bg-slate-950/90 border border-slate-800 hover:border-red-500/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Category Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-semibold">
                  {p.category}
                </span>
                <span className="text-slate-500 group-hover:text-red-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>

              {/* Title & Short Desc */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors font-sans">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {p.shortDesc}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.technologies.slice(0, 4).map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {p.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-slate-500 text-[11px] font-mono">
                    +{p.technologies.length - 4}
                  </span>
                )}
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Deep Dive & Demo</span>
              <ArrowRight className="w-4 h-4" />
            </div>

          </div>
        ))}
      </div>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-red-400 bg-red-950/60 border border-red-800 px-2.5 py-0.5 rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Sahil Dahale Project
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white font-sans">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold mb-1">
                  Problem Statement
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold mb-1">
                  Technical Approach
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.approach}
                </p>
              </div>
            </div>

            {/* Model Architecture */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">
                Model & Algorithms
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 font-mono">
                {selectedProject.modelDetails}
              </p>
            </div>

            {/* Live Simulator for Key Projects */}
            {selectedProject.visualType === 'resume' && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-red-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-red-400" /> Interactive TF-IDF Resume Matcher Demo
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Live Client Model</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Job Description Keywords:</label>
                    <input
                      type="text"
                      value={jobDescInput}
                      onChange={e => setJobDescInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Candidate Resume Text:</label>
                    <textarea
                      value={resumeTextInput}
                      onChange={e => setResumeTextInput(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={calculateResumeMatch}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Cosine Similarity Pipeline</span>
                  </button>

                  {matchScoreResult !== null && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-between font-mono">
                      <span className="text-red-300 font-semibold">Match Score Result:</span>
                      <span className="text-xl font-bold text-red-400">{matchScoreResult}% Match</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Results & Key Insights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">
                Project Results & Key Insights
              </h4>
              <ul className="space-y-2">
                {selectedProject.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer LinkedIn Connect */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href="https://www.linkedin.com/in/sahil-dahale-50aa42299/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer border border-red-500/30"
              >
                <Linkedin className="w-4 h-4 text-red-400" />
                <span>Discuss Project on LinkedIn</span>
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-colors cursor-pointer"
              >
                Close Project
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
