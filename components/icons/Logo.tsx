import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const TypewriterIcon: React.FC<{ colors: any }> = ({ colors }) => (
  <>
    {/* Paper */}
    <path d="M14 8 H 36 C 36 8 38 8 38 10 V 22 C 38 22 38 24 36 24 H 14 C 14 24 12 24 12 22 V 10 C 12 8 14 8 14 8 Z" fill={colors.bg} stroke={colors.text} strokeWidth="1.5" />
    <line x1="16" y1="12" x2="34" y2="12" stroke={colors.border} strokeWidth="1.2" />
    <line x1="16" y1="16" x2="34" y2="16" stroke={colors.border} strokeWidth="1.2" />
    <line x1="16" y1="20" x2="30" y2="20" stroke={colors.border} strokeWidth="1.2" />
    
    {/* Platen (Roller) */}
    <rect x="10" y="2" width="30" height="6" rx="3" fill={colors['text-muted']} stroke={colors.text} strokeWidth="1.5" />
    <circle cx="8" cy="5" r="2" fill={colors.secondary} stroke={colors.text} strokeWidth="1.5" />
    <circle cx="42" cy="5" r="2" fill={colors.secondary} stroke={colors.text} strokeWidth="1.5" />
    
    {/* Typewriter Body */}
    <path d="M2 24 C 2 20, 6 20, 8 20 H 42 C 44 20, 48 20, 48 24 V 38 H 2 V 24 Z" fill={colors.primary} stroke={colors.text} strokeWidth="2" />
    
    {/* Keyboard area */}
    <path d="M5 38 C 10 32, 40 32, 45 38 V 42 H 5 V 38 Z" fill={colors.secondary} stroke={colors.text} strokeWidth="1.5" />
    
    {/* Keys */}
    <g>
      <rect x="8" y="34" width="4" height="4" rx="1" fill={colors.text} />
      <rect x="14" y="34" width="4" height="4" rx="1" fill={colors.text} />
      <rect x="20" y="34" width="4" height="4" rx="1" fill={colors.text} />
      <rect x="26" y="34" width="4" height="4" rx="1" fill={colors.text} />
      <rect x="32" y="34" width="4" height="4" rx="1" fill={colors.text} />
      <rect x="38" y="34" width="4" height="4" rx="1" fill={colors.text} />
    </g>
    
    {/* Spacebar */}
    <rect x="15" y="40" width="20" height="3" rx="1" fill={colors.border} stroke={colors.text} strokeWidth="1" />

    {/* Typebars */}
    <path d="M25 32 L 22 24 M25 32 L 28 24 M25 32 L 25 22" stroke={colors.border} strokeWidth="1" />
  </>
);


const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const colors = theme.colors;
  
  return (
    <svg
      className={className}
      viewBox="0 0 210 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CAPS LOCK Logo"
    >
      {/* Icon: Detailed Old Typewriter */}
      <g transform="translate(2, 6) scale(0.95)">
        <TypewriterIcon colors={colors} />
      </g>
      
      {/* Text */}
      <text
        x="52"
        y="34"
        fontFamily="'Special Elite', monospace"
        fontSize="24"
        fontWeight="normal"
        fill={colors.text}
      >
        CAPS LOCK
      </text>
    </svg>
  );
};

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CAPS LOCK icon"
    >
      <g transform="translate(1, 2)">
        <TypewriterIcon colors={colors} />
      </g>
    </svg>
  );
};


export default Logo;