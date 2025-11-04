import React from 'react';
import ReactDOMServer from 'react-dom/server';

type BadgeAsset = {
  component: React.FC<{className?: string}>;
  svgString: string;
};

const BronzeStar: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bronze-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CD7F32" />
        <stop offset="100%" stopColor="#A0522D" />
      </linearGradient>
    </defs>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="url(#bronze-gradient)" />
  </svg>
);

const SilverShield: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#A9A9A9" />
      </linearGradient>
    </defs>
    <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="url(#silver-gradient)" />
  </svg>
);

const GoldMedal: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="url(#gold-gradient)" />
    <path d="M12 12.6l-2.47 1.28.47-2.75-2-1.95 2.76-.4L12 6.5l1.24 2.28 2.76.4-2 1.95.47 2.75L12 12.6z" fill="#FFF"/>
  </svg>
);

const PlatinumTrophy: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="platinum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5E4E2" />
        <stop offset="100%" stopColor="#BFC1C2" />
      </linearGradient>
    </defs>
    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" fill="url(#platinum-gradient)" />
  </svg>
);

const DiamondGem: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="diamond-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B9F2FF" />
        <stop offset="100%" stopColor="#73C2FB" />
      </linearGradient>
    </defs>
    <path d="M12 2L2 8l10 14L22 8l-10-6z" fill="url(#diamond-gradient)" />
  </svg>
);

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

const icons = {
  BronzeStar,
  SilverShield,
  GoldMedal,
  PlatinumTrophy,
  DiamondGem,
  MasterCrown,
};

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