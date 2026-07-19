import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  isDark: boolean;
  isLowStimulus: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleLowStimulus: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  isLowStimulus: false,
  themeMode: 'system',
  setThemeMode: () => {},
  toggleLowStimulus: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLowStimulus, setIsLowStimulus] = useState(false);

  const isDark = themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  useEffect(() => {
    const saved = storage.getString(STORAGE_KEYS.THEME_MODE) as ThemeMode | undefined;
    if (saved) setThemeModeState(saved);

    const lowStim = storage.getBoolean(STORAGE_KEYS.LOW_STIMULUS_MODE);
    if (lowStim !== undefined) setIsLowStimulus(lowStim);
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    storage.set(STORAGE_KEYS.THEME_MODE, mode);
  };

  const toggleLowStimulus = () => {
    const next = !isLowStimulus;
    setIsLowStimulus(next);
    storage.set(STORAGE_KEYS.LOW_STIMULUS_MODE, next ? 'true' : 'false');
  };

  return (
    <ThemeContext.Provider value={{ isDark, isLowStimulus, themeMode, setThemeMode, toggleLowStimulus }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
