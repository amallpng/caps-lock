import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="12" rx="1" fill="var(--color-bg)" stroke="var(--color-text)" strokeWidth="1"/>
    <path d="M2 13 Q4 11, 12 11 Q20 11, 22 13 L23 20 L1 20 Z" fill="var(--color-primary)" stroke="var(--color-text)" strokeWidth="1"/>
    <path d="M4 19 C8 17, 16 17, 20 19 L19 22 L5 22 Z" fill="var(--color-secondary)" stroke="var(--color-text)" strokeWidth="1"/>
  </svg>
);


const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
        <LogoIcon className="h-full w-auto" />
         <span
            style={{ fontFamily: "'Special Elite', monospace", fontSize: '150%', fontWeight: 'normal', color: 'var(--color-text)' }}
            className="hidden sm:inline"
        >
            Typewriter
        </span>
    </div>
  );
};

export default Logo;