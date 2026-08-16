import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface NameAnimationProps {
  firstName?: string;
  lastName?: string;
  subtitle?: string;
}

export default function ThreeDNameAnimation({
  firstName = "SAHIL",
  lastName = "DAHALE",
}: NameAnimationProps) {
  const [replayKey, setReplayKey] = useState(0);

  const firstLetters = firstName.split('');
  const lastLetters = lastName.split('');

  const triggerReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  // 3D Letter Animation Variants with high-impact spring reveal
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariant = {
    hidden: {
      opacity: 0,
      y: -70,
      z: 200,
      rotateX: -90,
      scale: 2.2,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 18,
        mass: 0.6,
      },
    },
  };

  return (
    <div className="relative group inline-block select-none my-1" key={replayKey}>
      {/* High-Contrast Corporate Backlight Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 via-red-500/10 to-indigo-600/10 blur-xl rounded-full opacity-60 pointer-events-none" />

      {/* 3D Perspective Wrapper */}
      <div className="perspective-1000 relative z-10">
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-sans leading-none py-1"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* First Name (SAHIL) - Crisp High-Contrast Platinum White */}
          <div className="flex items-center gap-1 sm:gap-1.5" style={{ transformStyle: 'preserve-3d' }}>
            {firstLetters.map((char, index) => (
              <motion.span
                key={`first-${index}`}
                variants={letterVariant}
                whileHover={{
                  scale: 1.25,
                  rotateY: 360,
                  z: 50,
                  textShadow: '0 0 25px rgba(59,130,246,0.8)',
                  transition: { duration: 0.45 },
                }}
                className="inline-block bg-gradient-to-b from-white via-slate-100 to-slate-300 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent font-black cursor-pointer drop-shadow-sm"
                style={{
                  transformStyle: 'preserve-3d',
                  display: 'inline-block',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Last Name (DAHALE) - Solid Royal Cobalt & Sapphire Gradient */}
          <div className="flex items-center gap-1 sm:gap-1.5" style={{ transformStyle: 'preserve-3d' }}>
            {lastLetters.map((char, index) => (
              <motion.span
                key={`last-${index}`}
                variants={letterVariant}
                whileHover={{
                  scale: 1.25,
                  rotateX: 360,
                  z: 50,
                  textShadow: '0 0 30px rgba(37,99,235,0.9)',
                  transition: { duration: 0.5 },
                }}
                className="inline-block bg-gradient-to-r from-red-500 via-red-400 to-indigo-500 bg-clip-text text-transparent font-black cursor-pointer drop-shadow-[0_4px_16px_rgba(37,99,235,0.4)]"
                style={{
                  transformStyle: 'preserve-3d',
                  display: 'inline-block',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Replay Trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-1.5 ml-2"
          >
            <motion.button
              onClick={triggerReplay}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              title="Replay Name Reveal"
              className="p-2 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-red-500 hover:bg-slate-800 transition-all cursor-pointer shadow-md backdrop-blur-md flex items-center justify-center group/btn"
            >
              <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover/btn:-rotate-90 text-red-400" />
            </motion.button>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-red-400" /> Reveal
            </span>
          </motion.div>
        </motion.div>

        {/* Solid Corporate Underline Accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
          className="h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-indigo-500 rounded-full shadow-[0_2px_12px_rgba(37,99,235,0.4)] origin-left mt-1"
        />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

