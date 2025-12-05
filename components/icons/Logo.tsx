import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Paper */}
    <path d="M18 8H46V28H18V8Z" fill="var(--color-bg)" stroke="var(--color-text)" strokeWidth="2" />
    <path d="M22 14H42" stroke="var(--color-text)" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M22 18H38" stroke="var(--color-text)" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M22 22H42" stroke="var(--color-text)" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />

    {/* Platen (roller) */}
    <path d="M12 26H52C53.1046 26 54 26.8954 54 28V28C54 29.1046 53.1046 30 52 30H12C10.8954 30 10 29.1046 10 28V28C10 26.8954 10.8954 26 12 26Z" fill="var(--color-text-muted)" />
    
    {/* Typewriter Body */}
    <path d="M8 32H56V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48V32Z" fill="var(--color-primary)" />
    
    {/* Keyboard top part */}
    <path d="M12 34C12 32.8954 12.8954 32 14 32H50C51.1046 32 52 32.8954 52 34V36H12V34Z" fill="var(--color-text)" fillOpacity="0.2"/>
    
    {/* Keys */}
    <circle cx="18" cy="40" r="2" fill="var(--color-secondary)" />
    <circle cx="26" cy="40" r="2" fill="var(--color-secondary)" />
    <circle cx="34" cy="40" r="2" fill="var(--color-secondary)" />
    <circle cx="42" cy="40" r="2" fill="var(--color-secondary)" />
    <circle cx="50" cy="40" r="2" fill="var(--color-secondary)" />
    
    <circle cx="22" cy="46" r="2" fill="var(--color-secondary)" />
    <circle cx="30" cy="46" r="2" fill="var(--color-secondary)" />
    <circle cx="38" cy="46" r="2" fill="var(--color-secondary)" />
    <circle cx="46" cy="46" r="2" fill="var(--color-secondary)" />
    
    {/* Spacebar */}
    <rect x="24" y="50" width="20" height="4" rx="2" fill="var(--color-secondary)" />
  </svg>
);


const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const isST = theme.id === 'stranger-things';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
        <LogoIcon className="h-full w-auto" />
        <div className="flex flex-col">
             {isST && (
                <span 
                    style={{ fontFamily: "'Special Elite', monospace", color: 'var(--color-primary)' }}
                    className="text-xs font-bold tracking-widest leading-none stranger-things-glow"
                >
                    STRANGER THINGS x
                </span>
             )}
             <span
                style={{ 
                    fontFamily: "'Special Elite', monospace", 
                    fontSize: isST ? '120%' : '150%', 
                    fontWeight: 'normal', 
                    color: 'var(--color-text)',
                    marginTop: isST ? '-2px' : '0'
                }}
                className={`hidden sm:inline ${isST ? 'stranger-things-glow' : ''}`}
            >
                CAPS LOCK
            </span>
        </div>
    </div>
  );
};

export default Logo;