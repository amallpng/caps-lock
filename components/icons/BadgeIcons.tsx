import React from 'react';
import ReactDOMServer from 'react-dom/server';

type BadgeAsset = {
  component: React.FC<{className?: string}>;
  svgString: string;
};

const MasterCrown: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="master-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFF700" />
            <stop offset="100%" stopColor="#FFD700" />
        </radialGradient>
      </defs>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z" fill="url(#master-gradient)" />
      <path d="M5 16v2h14v-2H5z" fill="#FFA500"/>
    </svg>
);

const GrandMasterTrophy: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gmt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E4E2" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BFC1C2" />
        </linearGradient>
      </defs>
      <path d="M19 4H5C3.89 4 3 4.9 3 6V8C3 9.1 3.89 10 5 10H6V18C6 19.1 6.89 20 8 20H16C17.11 20 18 19.1 18 18V10H19C20.11 10 21 9.1 21 8V6C21 4.9 20.11 4 19 4Z" fill="url(#gmt-gradient)" stroke="#4A6B4A" strokeWidth="1" />
      <path d="M12 10V18" stroke="#4A6B4A" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 20H16V22H8V20Z" fill="#A9A391" stroke="#4A6B4A" strokeWidth="1" />
      <text x="12" y="16" fill="#1f3b1f" fontFamily="'Special Elite', monospace" fontWeight="bold" fontSize="5.5" textAnchor="middle">100</text>
    </svg>
);

// Generic Badge Generator
const LevelBadge: React.FC<{ level: number; className?: string }> = ({ level, className }) => {
    const tier = Math.floor((level - 1) / 10);
    const tierColors = [
        { main: '#CD7F32', stroke: '#8C5A23' }, // Bronze
        { main: '#C0C0C0', stroke: '#808080' }, // Silver
        { main: '#FFD700', stroke: '#B8860B' }, // Gold
        { main: '#a2d2ff', stroke: '#4a759a' }, // Sky
        { main: '#b2f7a7', stroke: '#4c8a42' }, // Jade
        { main: '#ffb3c1', stroke: '#a35061' }, // Rose
        { main: '#c77dff', stroke: '#703c99' }, // Amethyst
        { main: '#ff6b6b', stroke: '#993030' }, // Ruby
        { main: '#48cae4', stroke: '#1a6f81' }, // Sapphire
        { main: '#f0e68c', stroke: '#968f58' }, // Platinum/Champagne
    ];
    
    const { main, stroke } = tierColors[tier % tierColors.length];
    
    const shapePaths = [
        "M12 2 L22 12 L12 22 L2 12 Z", // 1. Diamond
        "M12 2 L22 7 L22 17 L12 22 L2 17 L2 7 Z", // 2. Hexagon
        "M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z", // 3. Star
        "M12 2 L22 9 L18 22 L6 22 L2 9 Z", // 4. Pentagon
        "M12 2 L20 4 L22 12 L20 20 L12 22 L4 20 L2 12 L4 4 Z", // 5. Octagon
        "M12 2 L22 6 V 14 C 22 18, 18 22, 12 22 C 6 22, 2 18, 2 14 V 6 Z", // 6. Shield
        "M3 3 H 21 V 21 H 3 Z", // 7. Square
        "M9 2 H 15 V 9 H 22 V 15 H 15 V 22 H 9 V 15 H 2 V 9 H 9 Z", // 8. Cross
        "M12 2 L22 22 L2 22 Z", // 9. Triangle
        "M2 8 L12 2 L22 8 L22 16 L12 22 L2 16 Z" // 10. Gem
    ];
    const shape = shapePaths[(level - 1) % shapePaths.length];

    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={shape} fill={main} stroke={stroke} strokeWidth="2" />
            <text x="12" y="13" fill={stroke} fontFamily="'Special Elite', monospace" fontWeight="bold" fontSize={level > 99 ? "7" : (level > 9 ? "8" : "9")} textAnchor="middle" dominantBaseline="middle">
                {level}
            </text>
        </svg>
    );
};


const icons: Record<string, React.FC<{className?: string}>> = {
  MasterCrown,
  GrandMasterTrophy,
};

// Programmatically generate badge components for levels 1-99
for (let i = 1; i <= 99; i++) {
    const LevelBadgeComponent: React.FC<{className?: string}> = ({ className }) => (
        <LevelBadge level={i} className={className} />
    );
    Object.defineProperty(LevelBadgeComponent, "name", { value: `LevelBadge${i}` });
    icons[`LevelBadge${i}`] = LevelBadgeComponent;
}


// Helper to create the final export object
const createBadgeAssets = <T extends Record<string, React.FC<{className?: string}>>>(iconComponents: T): Record<keyof T, BadgeAsset> => {
  const assets = {} as Record<keyof T, BadgeAsset>;
  for (const key in iconComponents) {
    const Component = iconComponents[key];
    assets[key] = {
      component: Component,
      // FIX: Using React.createElement with a cast to 'any' to satisfy stricter type checking
      // for the generic component being rendered to a static string.
      svgString: ReactDOMServer.renderToStaticMarkup(React.createElement(Component as any)),
    };
  }
  return assets;
};

export const BadgeIcons = createBadgeAssets(icons);