import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 210 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CAPS LOCK Logo"
    >
      {/* Icon: Old Typewriter - Stylized */}
      <g transform="translate(0, 5) scale(0.9)">
        {/* Paper */}
        <rect x="15" y="4" width="20" height="22" rx="1" fill="#F1EFE9" stroke="#282828" strokeWidth="1.5" />
        <line x1="18" y1="8" x2="32" y2="8" stroke="#A9A391" strokeWidth="1.2" />
        <line x1="18" y1="12" x2="32" y2="12" stroke="#A9A391" strokeWidth="1.2" />
        <line x1="18" y1="16" x2="28" y2="16" stroke="#A9A391" strokeWidth="1.2" />

        {/* Typewriter Body */}
        <path d="M5 25 Q10 20, 25 20 Q40 20, 45 25 L48 38 L2 38 Z" fill="#4A6B69" stroke="#282828" strokeWidth="2" strokeLinejoin="round" />
        {/* Keyboard area shape */}
        <path d="M8 37 C 15 32, 35 32, 42 37 L40 42 L10 42 Z" fill="#D3CFC2" stroke="#282828" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Keys */}
        <circle cx="15" cy="39.5" r="1.2" fill="#282828" />
        <circle cx="20" cy="39.5" r="1.2" fill="#282828" />
        <circle cx="25" cy="39.5" r="1.2" fill="#282828" />
        <circle cx="30" cy="39.5" r="1.2" fill="#282828" />
        <circle cx="35" cy="39.5" r="1.2" fill="#282828" />
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