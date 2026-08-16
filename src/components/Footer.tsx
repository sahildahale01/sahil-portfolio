import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SceneId } from '../types';
import { Heart, MapPin, Clock, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sceneId: SceneId) => void;
  onOpenResume: () => void;
}

export default function Footer({ onNavigate, onOpenResume }: FooterProps) {
  const [nashikTime, setNashikTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setNashikTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Sahil Branding */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-lg text-white font-mono tracking-wider">SAHIL DAHALE</span>
              <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono">
                DATA SCIENTIST & ANALYST
              </span>
            </div>
            <p className="text-slate-400 max-w-md font-sans">
              Turning data into decisions. Machine learning pipelines, predictive modeling, and business intelligence.
            </p>
          </div>

          {/* Nashik Local Time & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Nashik, India</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2 text-red-400 font-mono">
              <Clock className="w-4 h-4 text-red-400" />
              <span>IST: {nashikTime || '09:45 PM'}</span>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 transition-all cursor-pointer shadow-sm"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Bottom Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Sahil Dahale. Professional Portfolio.</p>
          
          <div className="flex items-center gap-4">
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">
              LinkedIn Profile
            </a>
            <button onClick={onOpenResume} className="hover:text-red-400 transition-colors cursor-pointer">
              Resume CV
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
