import React from 'react';

const CoinIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D Edge/Shadow layer */}
      <circle cx="12" cy="13.5" r="10" fill="#B8860B"/>
      {/* Main coin face */}
      <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Inner ring for detail */}
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="#B8860B" strokeOpacity="0.5" strokeWidth="1"/>
      {/* Shine/Glare */}
      <path d="M8 8.5 A 5 5 0 0 1 11.5 6.5" stroke="white" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
);

export default CoinIcon;