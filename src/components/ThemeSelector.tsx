import React, { useState } from 'react';
import { useTheme, ThemePreset } from '../context/ThemeContext';
import { Sun, Moon, Palette, Check, Sparkles, Sliders } from 'lucide-react';

export default function ThemeSelector() {
  const { mode, themePreset, setMode, setThemePreset, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const presets: { id: ThemePreset; name: string; bg: string; border: string; desc: string }[] = [
    { id: 'sapphire', name: 'Executive Cobalt & Navy', bg: 'from-red-600 to-red-500', border: 'border-red-500', desc: 'Solid Authoritative Corporate BI & Analytics' },
    { id: 'obsidian', name: 'Titanium Slate Minimal', bg: 'from-slate-500 to-slate-800', border: 'border-slate-500', desc: 'Clean Monochromatic Engineering' },
    { id: 'emerald', name: 'Emerald FinTech & Data', bg: 'from-red-600 to-teal-500', border: 'border-red-500', desc: 'Quantitative Algorithmic Analytics' },
    { id: 'cyan', name: 'Deep Steel & Cyan', bg: 'from-red-500 to-red-600', border: 'border-red-400', desc: 'Modern Cloud AI & Data Systems' },
    { id: 'amber', name: 'Executive Gold & Slate', bg: 'from-amber-500 to-amber-700', border: 'border-amber-500', desc: 'High-Contrast Executive Warmth' },
    { id: 'ruby', name: 'Crimson Accent', bg: 'from-rose-600 to-red-700', border: 'border-rose-500', desc: 'Bold Dynamic Focus' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm">
        {/* Light / Dark Quick Toggle Button */}
        <button
          onClick={toggleMode}
          className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer text-xs font-mono"
          title={`Switch to ${mode === 'dark' ? 'Light Theme' : 'Dark Theme'}`}
        >
          {mode === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-red-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* Theme Palette Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer text-xs font-mono"
          title="Customize Color Theme Palette"
        >
          <Palette className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="hidden md:inline">Themes</span>
        </button>
      </div>

      {/* Popover Dropdown for Theme Presets */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-red-500" /> Color Appearance
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Close
              </button>
            </div>

            {/* Light vs Dark Switcher Segmented Control */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Base Mode
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setMode('dark')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mode === 'dark'
                      ? 'bg-slate-800 text-white shadow-sm font-bold border border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-red-400" /> Dark
                </button>
                <button
                  onClick={() => setMode('light')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mode === 'light'
                      ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                </button>
              </div>
            </div>

            {/* Accent Color Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Professional Palette
              </span>
              <div className="space-y-1">
                {presets.map((p) => {
                  const isSelected = themePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setThemePreset(p.id);
                        setIsOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-red-50/50 dark:bg-slate-900 border-red-500/50 shadow-sm'
                          : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full bg-gradient-to-tr ${p.bg} shrink-0`} />
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block leading-tight">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                            {p.desc}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
