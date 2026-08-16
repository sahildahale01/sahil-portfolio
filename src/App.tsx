import React, { useState, useEffect, useRef } from 'react';
import { SceneId } from './types';
import CustomCursor from './components/CustomCursor';
import Background3DCanvas from './components/3D/Background3DCanvas';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import SkillsConstellation from './components/SkillsConstellation';
import ExperienceTimeline from './components/ExperienceTimeline';
import FeaturedProjects from './components/FeaturedProjects';
import DataInMotion from './components/DataInMotion';
import Leadership from './components/Leadership';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import AIChatbot from './components/AIChatbot';
import Footer from './components/Footer';

export default function App() {
  const [activeScene, setActiveScene] = useState<SceneId>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Scroll tracking & Active Scene detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      setScrollProgress(progress);

      // Section intersection detection
      const sections: { id: SceneId; el: HTMLElement | null }[] = [
        { id: 'hero', el: document.getElementById('hero') },
        { id: 'about', el: document.getElementById('about') },
        { id: 'skills', el: document.getElementById('skills') },
        { id: 'experience', el: document.getElementById('experience') },
        { id: 'projects', el: document.getElementById('projects') },
        { id: 'dataviz', el: document.getElementById('dataviz') },
        { id: 'leadership', el: document.getElementById('leadership') },
        { id: 'education', el: document.getElementById('education') },
        { id: 'contact', el: document.getElementById('contact') },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el) {
          const top = sec.el.offsetTop;
          if (scrollPos >= top) {
            setActiveScene(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient Space Synth Audio Generator (Web Audio API)
  const toggleAmbientAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 fundamental drone tone

        // Subtle slow lfo frequency modulation
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(15, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Audio synth error:', err);
      }
    } else {
      if (gainRef.current && audioContextRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1);
        setTimeout(() => {
          oscRef.current?.stop();
          audioContextRef.current?.close();
          setIsAudioPlaying(false);
        }, 1000);
      } else {
        setIsAudioPlaying(false);
      }
    }
  };

  const handleNavigate = (sceneId: SceneId) => {
    const targetEl = document.getElementById(sceneId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#0b0f19] text-slate-100 min-h-screen selection:bg-red-500 selection:text-slate-950 font-sans">
      
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Professional Solid Background System */}
      <Background3DCanvas activeScene={activeScene} scrollProgress={scrollProgress} />

      {/* Navigation Header */}
      <Navigation
        activeScene={activeScene}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAmbientAudio}
      />

      {/* Main Content Scroll Journey */}
      <main className="relative z-10">
        {/* Scene 01: Hero */}
        <Hero
          onExploreProjects={() => handleNavigate('projects')}
          onOpenResume={() => setIsResumeOpen(true)}
          onConnect={() => handleNavigate('contact')}
        />

        {/* Scene 02 & 03: About */}
        <About />

        {/* Scene 04: Skills Constellation */}
        <SkillsConstellation />

        {/* Scene 05: Experience Timeline */}
        <ExperienceTimeline />

        {/* Scene 06 & 07: Featured Projects */}
        <FeaturedProjects />

        {/* Dedicated Data Viz Section */}
        <DataInMotion />

        {/* Scene 08: Leadership */}
        <Leadership />

        {/* Education & Certifications */}
        <EducationCertifications />

        {/* Scene 09: Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Resume Viewer & PDF Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating Cloud-Connected Gemini AI Chatbot */}
      <AIChatbot />

    </div>
  );
}
