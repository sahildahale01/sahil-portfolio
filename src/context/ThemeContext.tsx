import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';
export type ThemePreset = 'cyan' | 'emerald' | 'sapphire' | 'amber' | 'violet' | 'ruby' | 'obsidian';

interface ThemeContextType {
  mode: ThemeMode;
  themePreset: ThemePreset;
  setMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('sahil_theme_mode');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [themePreset, setThemePresetState] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem('sahil_theme_preset') as ThemePreset;
    return ['sapphire', 'obsidian', 'emerald', 'cyan', 'amber', 'ruby', 'violet'].includes(saved) ? saved : 'ruby';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      document.body.style.backgroundColor = '#0b0f19';
      document.body.style.color = '#f8fafc';
    }
    localStorage.setItem('sahil_theme_mode', mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme-preset', themePreset);
    localStorage.setItem('sahil_theme_preset', themePreset);
  }, [themePreset]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const setThemePreset = (preset: ThemePreset) => {
    setThemePresetState(preset);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ mode, themePreset, setMode, setThemePreset, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

