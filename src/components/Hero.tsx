import React, { useEffect, useRef } from 'react';
import ThreeDNameAnimation from './3DNameAnimation';
import {
  ArrowRight,
  Download,
  BarChart3,
  Brain,
  Lightbulb,
  Code2,
  Users,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenResume: () => void;
  onConnect: () => void;
}

export default function Hero({
  onExploreProjects,
  onOpenResume,
  onConnect,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = 1;

    const startVideo = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch {
        // Browsers may block autoplay with sound.
        // Start silently and enable sound after user interaction.
        video.muted = true;

        try {
          await video.play();
        } catch {
          // Ignore autoplay failure.
        }
      }
    };

    startVideo();

    const enableAudio = async () => {
      try {
        video.muted = false;
        video.volume = 1;

        await video.play();
      } catch {
        // Browser may still block audio.
      }

      window.removeEventListener('pointerdown', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };

    window.addEventListener('pointerdown', enableAudio);
    window.addEventListener('keydown', enableAudio);
    window.addEventListener('touchstart', enableAudio);

    return () => {
      window.removeEventListener('pointerdown', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-section relative min-h-[92vh] pt-28 pb-12 sm:pt-32 sm:pb-16 flex items-center overflow-hidden"
    >
      {/* Ambient red lighting */}
      <div
        className="hero-red-glow hero-red-glow-one"
        aria-hidden="true"
      />

      <div
        className="hero-red-glow hero-red-glow-two"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] items-center gap-8 lg:gap-2 xl:gap-6">

          {/* =========================
              LEFT SIDE
          ========================== */}
          <div className="hero-copy space-y-6 sm:space-y-7 text-center lg:text-left">

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/35 border border-red-800/45 text-red-300 text-xs font-mono tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>

              <span className="font-semibold">
                Data Analyst • Data Science • Generative AI
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem] font-extrabold text-white tracking-tight leading-[0.95] font-sans">
                Hi, I'm
              </h1>

              <div className="pt-1 hero-name-wrap">
                <ThreeDNameAnimation
                  firstName="SAHIL"
                  lastName="DAHALE"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              Aspiring Data Scientist & Data Analyst passionate about turning
              raw data into meaningful insights and building intelligent
              solutions that drive{' '}
              <span className="text-red-400 font-bold">
                real impact
              </span>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">

              <button
                onClick={onExploreProjects}
                className="group px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-[0_10px_35px_rgba(220,38,38,0.22)] active:scale-95 transition-all cursor-pointer border border-red-500/80"
              >
                <span>View My Work</span>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl bg-slate-950/65 border border-slate-700/80 hover:border-red-500/60 text-slate-200 font-semibold text-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:text-white"
              >
                <Download className="w-4 h-4 text-red-400" />

                <span>Download Resume</span>
              </button>

              <button
                onClick={onConnect}
                className="px-6 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800/90 hover:border-red-700/60 text-slate-300 font-semibold text-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer hover:text-white"
              >
                <span>Get in Touch</span>
              </button>

            </div>

            {/* Domain Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/55 border border-slate-800/80 text-slate-300 text-xs font-mono">
                <BarChart3 className="w-3.5 h-3.5 text-red-400" />
                <span>Data Analyst</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/55 border border-slate-800/80 text-slate-300 text-xs font-mono">
                <Lightbulb className="w-3.5 h-3.5 text-red-300" />
                <span>Problem Solver</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/55 border border-slate-800/80 text-slate-300 text-xs font-mono">
                <Brain className="w-3.5 h-3.5 text-red-400" />
                <span>Generative AI Enthusiast</span>
              </div>

            </div>
          </div>

          {/* =========================
              RIGHT SIDE VIDEO
          ========================== */}
          <div
            className="hero-video-stage"
            aria-label="Sahil Dahale portfolio hero video"
          >

            <div
              className="hero-video-aura"
              aria-hidden="true"
            />

            <div
              className="hero-video-blend hero-video-blend-left"
              aria-hidden="true"
            />

            <div
              className="hero-video-blend hero-video-blend-top"
              aria-hidden="true"
            />

            <div
              className="hero-video-blend hero-video-blend-bottom"
              aria-hidden="true"
            />

            <video
              ref={videoRef}
              className="hero-video"
              src="/hero-video.mp4"
              autoPlay
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />

          </div>
        </div>

        {/* =========================
            KEY STATS
        ========================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 lg:mt-5">

          {/* Students */}
          <div className="p-4 rounded-2xl bg-slate-950/65 border border-red-950/45 hover:border-red-800/60 transition-all shadow-sm group text-left">

            <div className="flex items-center gap-2 mb-1">

              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>

              <span className="text-2xl font-black text-red-400 font-mono">
                3000+
              </span>

            </div>

            <div className="text-[12px] font-bold text-slate-200">
              Students Represented
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              Campus President
            </div>

          </div>

          {/* CGPA */}
          <div className="p-4 rounded-2xl bg-slate-950/65 border border-red-950/45 hover:border-red-800/60 transition-all shadow-sm group text-left">

            <div className="flex items-center gap-2 mb-1">

              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>

              <span className="text-2xl font-black text-red-400 font-mono">
                8.0 / 10
              </span>

            </div>

            <div className="text-[12px] font-bold text-slate-200">
              CGPA
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              B.Tech AI & ML
            </div>

          </div>

          {/* Industry Roles */}
          <div className="p-4 rounded-2xl bg-slate-950/65 border border-red-950/45 hover:border-red-800/60 transition-all shadow-sm group text-left">

            <div className="flex items-center gap-2 mb-1">

              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>

              <span className="text-2xl font-black text-red-400 font-mono">
                5
              </span>

            </div>

            <div className="text-[12px] font-bold text-slate-200">
              Industry Roles
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              Internships Completed
            </div>

          </div>

          {/* Projects */}
          <div className="p-4 rounded-2xl bg-slate-950/65 border border-red-950/45 hover:border-red-800/60 transition-all shadow-sm group text-left">

            <div className="flex items-center gap-2 mb-1">

              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>

              <span className="text-2xl font-black text-red-400 font-mono">
                10+
              </span>

            </div>

            <div className="text-[12px] font-bold text-slate-200">
              Projects
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              Data • ML • AI • BI
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}