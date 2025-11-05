import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { themes } from '../services/themeService';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setThemeById: (id: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes[0],
  setThemeById: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState(() => {
    try {
      const storedThemeId = localStorage.getItem('theme-id');
      return storedThemeId && themes.find(t => t.id === storedThemeId) ? storedThemeId : 'typewriter';
    } catch {
      return 'typewriter';
    }
  });

  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = document.documentElement;
    Object.entries(themeToApply.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
  }, []);

  useEffect(() => {
    const currentTheme = themes.find(t => t.id === themeId) || themes[0];
    applyTheme(currentTheme);
    localStorage.setItem('theme-id', themeId);
  }, [themeId, applyTheme]);

  const setThemeById = (id: string) => {
    const newTheme = themes.find(t => t.id === id);
    if (newTheme) {
      setThemeId(id);
    }
  };

  const theme = useMemo(() => themes.find(t => t.id === themeId) || themes[0], [themeId]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
};
