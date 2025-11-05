import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 210 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CAPS LOCK Logo"
    >
      {/* Icon: Detailed Old Typewriter */}
      <g transform="translate(2, 6) scale(0.95)">
        {/* Paper */}
        <path d="M14 8 H 36 C 36 8 38 8 38 10 V 22 C 38 22 38 24 36 24 H 14 C 14 24 12 24 12 22 V 10 C 12 8 14 8 14 8 Z" fill="#F1EFE9" stroke="#282828" strokeWidth="1.5" />
        <line x1="16" y1="12" x2="34" y2="12" stroke="#A9A391" strokeWidth="1.2" />
        <line x1="16" y1="16" x2="34" y2="16" stroke="#A9A391" strokeWidth="1.2" />
        <line x1="16" y1="20" x2="30" y2="20" stroke="#A9A391" strokeWidth="1.2" />
        
        {/* Platen (Roller) */}
        <rect x="10" y="2" width="30" height="6" rx="3" fill="#6B7280" stroke="#282828" strokeWidth="1.5" />
        <circle cx="8" cy="5" r="2" fill="#4B5563" stroke="#282828" strokeWidth="1.5" />
        <circle cx="42" cy="5" r="2" fill="#4B5563" stroke="#282828" strokeWidth="1.5" />
        
        {/* Typewriter Body */}
        <path d="M2 24 C 2 20, 6 20, 8 20 H 42 C 44 20, 48 20, 48 24 V 38 H 2 V 24 Z" fill="#4A6B69" stroke="#282828" strokeWidth="2" />
        
        {/* Keyboard area */}
        <path d="M5 38 C 10 32, 40 32, 45 38 V 42 H 5 V 38 Z" fill="#D3CFC2" stroke="#282828" strokeWidth="1.5" />
        
        {/* Keys */}
        <g>
          <rect x="8" y="34" width="4" height="4" rx="1" fill="#282828" />
          <rect x="14" y="34" width="4" height="4" rx="1" fill="#282828" />
          <rect x="20" y="34" width="4" height="4" rx="1" fill="#282828" />
          <rect x="26" y="34" width="4" height="4" rx="1" fill="#282828" />
          <rect x="32" y="34" width="4" height="4" rx="1" fill="#282828" />
          <rect x="38" y="34" width="4" height="4" rx="1" fill="#282828" />
        </g>
        
        {/* Spacebar */}
        <rect x="15" y="40" width="20" height="3" rx="1" fill="#A9A391" stroke="#282828" strokeWidth="1" />

        {/* Typebars */}
        <path d="M25 32 L 22 24 M25 32 L 28 24 M25 32 L 25 22" stroke="#A9A391" strokeWidth="1" />
      </g>
      
      {/* Text */}
      <text
        x="52"
        y="34"
        fontFamily="'Special Elite', monospace"
        fontSize="24"
        fontWeight="normal"
        fill="#282828"
      >
        CAPS LOCK
      </text>
    </svg>
  );
};

export default Logo;