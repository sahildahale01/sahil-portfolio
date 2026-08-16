import React, { useState, useEffect } from 'react';
import { SceneId } from '../types';
import ThemeSelector from './ThemeSelector';
import { 
  FileText, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  Code, 
  User, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Mail,
  Activity
} from 'lucide-react';

interface NavigationProps {
  activeScene: SceneId;
  onNavigate: (sceneId: SceneId) => void;
  onOpenResume: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export default function Navigation({
  activeScene,
  onNavigate,
  onOpenResume,
  isAudioPlaying,
  onToggleAudio
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: SceneId; label: string; icon: React.ReactNode }[] = [
    { id: 'hero', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'dataviz', label: 'Data Lab', icon: <Activity className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Award className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: SceneId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 shadow-md'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Badge */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-3 cursor-pointer focus:outline-none"
            aria-label="Sahil Dahale Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-red-400 font-extrabold text-lg group-hover:border-red-500 group-hover:scale-105 transition-all shadow-sm">
              <span className="tracking-tight text-red-500 group-hover:text-red-400 font-black">SD</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-black text-slate-100 tracking-wider text-sm group-hover:text-red-400 transition-colors">
                SAHIL DAHALE
              </span>
              <span className="block text-[10px] font-mono text-slate-400 font-bold">
                DATA ANALYST • AI ENGINEER
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md shadow-inner">
            {navItems.map(item => {
              const isActive = activeScene === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white bg-red-600 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Theme Selector (Light/Dark + Accent Presets) */}
            <ThemeSelector />

            {/* Audio Synth Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl border transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
                isAudioPlaying
                  ? 'border-red-500/60 bg-red-500/20 text-red-300 shadow-sm'
                  : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isAudioPlaying ? 'Mute ambient audio' : 'Enable ambient audio'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden xl:inline text-[11px]">{isAudioPlaying ? 'AUDIO ON' : 'AUDIO'}</span>
            </button>

            {/* Hire Me / Resume CTA */}
            <button
              onClick={onOpenResume}
              className="px-4.5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 hover:shadow-md active:scale-95 transition-all cursor-pointer border border-red-500"
            >
              <span>Hire Me</span>
              <span className="text-xs">↗</span>
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-slate-950/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-2">
            <p className="text-xs font-mono text-red-400 mb-4 tracking-wider uppercase">Navigation Menu</p>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeScene === item.id
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume PDF</span>
            </button>
            <p className="text-center text-xs text-slate-500 font-mono">Sahil Dahale • Nashik, India</p>
          </div>
        </div>
      )}
    </>
  );
}
