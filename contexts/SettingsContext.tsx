import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  soundEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  toggleSound: () => void;
}

const defaultSettings: Settings = {
  soundEnabled: true,
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  toggleSound: () => {},
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const storedSettings = localStorage.getItem('typing-settings');
      return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    } catch (error) {
      console.error("Could not parse settings from localStorage", error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem('typing-settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
};
