import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  Code, 
  BarChart2, 
  Brain, 
  Sparkles, 
  PieChart, 
  Database,
  CheckCircle2,
  Cpu,
  Layers,
  Flame,
  Binary
} from 'lucide-react';

export default function SkillsConstellation() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    description: string;
    categoryTitle: string;
  } | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Code: <Code className="w-4 h-4 text-red-400" />,
    BarChart2: <BarChart2 className="w-4 h-4 text-red-400" />,
    Brain: <Brain className="w-4 h-4 text-red-400" />,
    Sparkles: <Sparkles className="w-4 h-4 text-red-400" />,
    PieChart: <PieChart className="w-4 h-4 text-red-400" />,
    Database: <Database className="w-4 h-4 text-red-400" />,
  };

  const filteredCategories = activeCategoryId === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.id === activeCategoryId);

  // Key ecosystem branches for interactive central orb
  const leftBranchSkills = ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn'];
  const rightBranchSkills = ['Machine Learning', 'Deep Learning', 'Power BI', 'Tableau', 'Data Viz'];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-red-400" />
          <span>Skills Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          DATA SCIENCE & <span className="bg-gradient-to-r from-red-400 to-red-400 bg-clip-text text-transparent">ANALYTICS ARSENAL</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Explore my interactive skill ecosystem spanning Python, SQL, machine learning algorithms, and enterprise business intelligence.
        </p>
      </div>

      {/* Central Interactive Orb Ecosystem Showcase */}
      <div className="mb-16 p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-md relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 via-red-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Branch */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-red-400" />
              <span>Core Programming & Data</span>
            </p>
            <div className="flex flex-col gap-2.5">
              {leftBranchSkills.map(skill => (
                <div
                  key={skill}
                  onClick={() =>
                    setSelectedSkill({
                      name: skill,
                      level: 90,
                      description: `Core proficiency in ${skill} applied to real-world datasets, statistical modeling, and data pipelines.`,
                      categoryTitle: 'Core Stack',
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/60 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-mono flex items-center justify-between transition-all cursor-pointer group shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                    <span className="font-semibold">{skill}</span>
                  </span>
                  <span className="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Central Core Orb - Solid and Static */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center">
              {/* Static Outer Border Ring */}
              <div className="w-40 h-40 rounded-full border border-red-500/20 bg-red-500/5" />
              
              {/* Core Disk */}
              <div className="absolute w-32 h-32 rounded-full bg-slate-900 border border-red-500/40 flex flex-col items-center justify-center p-3 text-center shadow-lg hover:border-red-400 transition-all cursor-pointer">
                <Brain className="w-7 h-7 text-red-400 mb-1" />
                <span className="text-[10px] font-black text-white leading-tight font-sans uppercase tracking-tighter">
                  DATA SCIENCE & ANALYTICS
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-4 text-center">
              Central Neural Hub • Interconnected Stack
            </span>
          </div>

          {/* Right Branch */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3 flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-red-400" />
              <span>Machine Learning & BI</span>
            </p>
            <div className="flex flex-col gap-2.5">
              {rightBranchSkills.map(skill => (
                <div
                  key={skill}
                  onClick={() =>
                    setSelectedSkill({
                      name: skill,
                      level: 88,
                      description: `Hands-on expertise in ${skill} for algorithmic prediction, interactive business intelligence, and insight discovery.`,
                      categoryTitle: 'AI & Analytics',
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/60 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-mono flex items-center justify-between transition-all cursor-pointer group shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                    <span className="font-semibold">{skill}</span>
                  </span>
                  <span className="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect →
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategoryId('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeCategoryId === 'all'
              ? 'bg-red-600 text-white font-bold shadow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>ALL DOMAINS</span>
        </button>

        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeCategoryId === cat.id
                ? 'bg-red-600 text-white font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {iconMap[cat.iconName]}
            <span>{cat.title.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Constellation Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            className="group relative rounded-3xl bg-slate-950/90 border border-slate-800 hover:border-red-500/50 p-6 backdrop-blur-xl transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    {iconMap[cat.iconName]}
                  </div>
                  <h3 className="font-bold text-white text-base font-sans">{cat.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded-full">
                  {cat.skills.length} SKILLS
                </span>
              </div>

              {/* Skill Nodes */}
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map(s => (
                  <button
                    key={s.name}
                    onClick={() =>
                      setSelectedSkill({
                        name: s.name,
                        level: s.level,
                        description: s.description,
                        categoryTitle: cat.title,
                      })
                    }
                    className="group/node relative px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-400/60 hover:bg-slate-850 text-slate-300 hover:text-red-200 text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover/node:scale-125 transition-transform" />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Subtle bottom tag */}
            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Domain Verified</span>
              <span className="text-red-400 font-bold">Sahil Dahale Stack</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Skill Popup Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">
                  {selectedSkill.categoryTitle}
                </span>
                <h4 className="text-xl font-bold text-white font-sans">{selectedSkill.name}</h4>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-white text-sm font-mono p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Proficiency Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Proficiency Mastery</span>
                <span className="text-red-400 font-bold">{selectedSkill.level}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {selectedSkill.description}
            </p>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-colors cursor-pointer"
              >
                Close Node
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
