import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { themes } from '../services/themeService';

const ThemeSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setThemeById } = useContext(ThemeContext);
    const switcherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleThemeChange = (id: string) => {
        setThemeById(id);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={switcherRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-sm hover:bg-[var(--color-secondary)] transition-colors"
                aria-label="Change theme"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM16 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM9 15a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 6.332a6 6 0 018.336 8.336 6 6 0 01-8.336-8.336z" clipRule="evenodd" /></svg>
                <span className="hidden sm:inline">{theme.name}</span>
            </button>
            {isOpen && (
                <div className="absolute bottom-full mb-2 w-48 bg-[var(--color-secondary)] border-2 border-[var(--color-border)] rounded-sm shadow-lg p-2 space-y-1 z-50">
                    {themes.map(t => (
                        <button 
                            key={t.id}
                            onClick={() => handleThemeChange(t.id)}
                            className="w-full flex items-center justify-between text-left p-2 rounded-sm hover:bg-[var(--color-bg)] transition-colors"
                        >
                            <span className="text-[var(--color-text)]">{t.name}</span>
                            <div className="flex -space-x-1">
                                <span className="w-4 h-4 rounded-full border border-gray-400" style={{ backgroundColor: t.colors.bg }}></span>
                                <span className="w-4 h-4 rounded-full border border-gray-400" style={{ backgroundColor: t.colors.text }}></span>
                                <span className="w-4 h-4 rounded-full border border-gray-400" style={{ backgroundColor: t.colors.primary }}></span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;
