import React from 'react';

// Individual Avatar Components
const AvatarOggy: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#E0F2FE" />
        <path d="M25 90 C 20 70, 20 50, 40 30 S 60 10, 75 30 S 80 70, 75 90 Z" fill="#60A5FA" />
        <circle cx="50" cy="55" r="30" fill="white" />
        <circle cx="42" cy="50" r="5" fill="black" />
        <circle cx="58" cy="50" r="5" fill="black" />
        <circle cx="50" cy="65" r="8" fill="#FFC0CB" />
        <circle cx="50" cy="65" r="4" fill="#E11D48" />
        <path d="M30 25 Q 25 15, 40 20" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 25 Q 75 15, 60 20" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
);

const AvatarBen10: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#F3F4F6" />
        <path d="M20 95 V 40 C 20 20, 30 15, 50 15 C 70 15, 80 20, 80 40 V 95 Z" fill="#4B5563" />
        <rect x="20" y="50" width="60" height="45" fill="#1F2937" />
        <circle cx="50" cy="72" r="20" fill="#34D399" />
        <path d="M50 58 L 40 75 H 60 L 50 58 Z M 50 86 L 40 69 H 60 L 50 86 Z" fill="black" />
        <path d="M35 30 C 40 20, 60 20, 65 30 S 60 50, 50 50 S 30 40, 35 30" fill="#A16207" />
    </svg>
);

const AvatarMrBean: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FEF3C7" />
        <rect x="35" y="70" width="30" height="25" fill="#9A3412" />
        <rect x="35" y="70" width="30" height="10" fill="#DC2626" />
        <path d="M30 70 C 25 50, 30 30, 50 20 C 70 30, 75 50, 70 70 Z" fill="#FDE68A" />
        <path d="M40 30 C 35 20, 65 20, 60 30 S 55 50, 50 50 S 45 40, 40 30" fill="#1F2937" />
        <circle cx="45" cy="55" r="4" fill="black" />
        <circle cx="55" cy="55" r="4" fill="black" />
        <path d="M40 65 Q 50 70, 60 65" stroke="black" fill="none" strokeWidth="2" />
        <path d="M40 45 C 45 40, 55 40, 60 45" fill="none" stroke="black" strokeWidth="3" />
    </svg>
);

const AvatarTom: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#D1D5DB" />
        <circle cx="50" cy="60" r="35" fill="#6B7280" />
        <path d="M30 40 Q 20 20, 50 30 Q 80 20, 70 40" fill="#6B7280" />
        <path d="M40 55 C 45 45, 55 45, 60 55 C 55 65, 45 65, 40 55" fill="#F3F4F6" />
        <circle cx="48" cy="55" r="5" fill="#22C55E" />
        <circle cx="48" cy="55" r="2" fill="black" />
        <path d="M40 75 Q 50 85, 60 75" fill="none" stroke="#F3F4F6" strokeWidth="3" />
        <circle cx="50" cy="70" r="3" fill="black" />
    </svg>
);

const AvatarJerry: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FEF9C3" />
        <circle cx="50" cy="65" r="30" fill="#A16207" />
        <circle cx="30" cy="35" r="15" fill="#A16207" />
        <circle cx="70" cy="35" r="15" fill="#A16207" />
        <circle cx="30" cy="35" r="10" fill="#FECACA" />
        <circle cx="70" cy="35" r="10" fill="#FECACA" />
        <circle cx="50" cy="60" r="15" fill="#FDE68A" />
        <circle cx="45" cy="55" r="3" fill="black" />
        <circle cx="55" cy="55" r="3" fill="black" />
        <path d="M45 70 Q 50 75, 55 70" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="50" cy="65" r="2" fill="black" />
    </svg>
);

const AvatarDoraemon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FCA5A5" />
        <circle cx="50" cy="50" r="40" fill="#3B82F6" />
        <circle cx="50" cy="55" r="30" fill="white" />
        <circle cx="45" cy="40" r="7" fill="white" />
        <circle cx="55" cy="40" r="7" fill="white" />
        <circle cx="45" cy="40" r="3" fill="black" />
        <circle cx="55" cy="40" r="3" fill="black" />
        <circle cx="50" cy="50" r="5" fill="#EF4444" />
        <path d="M50 55 V 75" stroke="black" strokeWidth="2" />
        <path d="M30 60 H 70" stroke="black" strokeWidth="2" />
        <path d="M30 65 H 70" stroke="black" strokeWidth="2" />
        <path d="M30 70 H 70" stroke="black" strokeWidth="2" />
        <rect x="40" y="75" width="20" height="5" rx="2" fill="#FEF08A" />
    </svg>
);

const AvatarSpongeBob: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#60A5FA" />
        <rect x="15" y="25" width="70" height="70" fill="#FEF08A" />
        <rect x="15" y="80" width="70" height="15" fill="#A16207" />
        <circle cx="35" cy="45" r="10" fill="white" stroke="black" strokeWidth="2" />
        <circle cx="65" cy="45" r="10" fill="white" stroke="black" strokeWidth="2" />
        <circle cx="35" cy="45" r="5" fill="#3B82F6" />
        <circle cx="65" cy="45" r="5" fill="#3B82F6" />
        <path d="M40 70 Q 50 80, 60 70" stroke="black" strokeWidth="2" fill="none" />
        <rect x="42" y="60" width="8" height="10" fill="white" />
        <rect x="50" y="60" width="8" height="10" fill="white" />
    </svg>
);

const AvatarPatrickStar: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#A7F3D0" />
        <path d="M50 10 L 60 40 L 90 45 L 65 65 L 75 95 L 50 80 L 25 95 L 35 65 L 10 45 L 40 40 Z" fill="#F472B6" />
        <circle cx="45" cy="50" r="5" fill="black" />
        <circle cx="55" cy="50" r="5" fill="black" />
        <path d="M40 65 Q 50 75, 60 65" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 35 C 45 30, 55 30, 60 35" fill="none" stroke="black" strokeWidth="3" />
        <path d="M65 30 C 70 25, 75 35, 70 40" fill="none" stroke="black" strokeWidth="3" />
    </svg>
);

const AvatarDora: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FBCFE8" />
        <rect x="30" y="70" width="40" height="25" fill="#F472B6" />
        <path d="M25 70 C 20 50, 25 30, 50 15 C 75 30, 80 50, 75 70 Z" fill="#FDBA74" />
        <path d="M30 20 C 20 10, 80 10, 70 20 S 80 50, 50 50 S 20 50, 30 20" fill="#373024" />
        <circle cx="43" cy="55" r="6" fill="black" />
        <circle cx="57" cy="55" r="6" fill="black" />
        <path d="M45 70 Q 50 75, 55 70" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const AvatarBlossom: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#F3F4F6" />
        <circle cx="50" cy="55" r="40" fill="#F472B6" />
        <path d="M20 55 C 20 30, 80 30, 80 55" fill="#FB923C" />
        <rect x="20" y="50" width="60" height="10" fill="black" />
        <circle cx="35" cy="55" r="15" fill="white" />
        <circle cx="65" cy="55" r="15" fill="white" />
        <circle cx="35" cy="55" r="8" fill="#F472B6" />
        <circle cx="65" cy="55" r="8" fill="#F472B6" />
        <path d="M45 75 Q 50 80, 55 75" fill="none" stroke="black" strokeWidth="2" />
        <path d="M50 10 L 40 25 H 60 Z" fill="#EF4444" />
        <circle cx="50" cy="28" r="5" fill="#EF4444" />
    </svg>
);

const AvatarBubbles: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#F3F4F6" />
        <circle cx="50" cy="55" r="40" fill="#60A5FA" />
        <path d="M25 40 Q 20 20, 40 30" fill="#FEF08A" />
        <path d="M75 40 Q 80 20, 60 30" fill="#FEF08A" />
        <rect x="20" y="50" width="60" height="10" fill="black" />
        <circle cx="35" cy="55" r="15" fill="white" />
        <circle cx="65" cy="55" r="15" fill="white" />
        <circle cx="35" cy="55" r="8" fill="#60A5FA" />
        <circle cx="65" cy="55" r="8" fill="#60A5FA" />
        <path d="M45 75 Q 50 80, 55 75" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const AvatarButtercup: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#F3F4F6" />
        <circle cx="50" cy="55" r="40" fill="#34D399" />
        <path d="M30 45 L 50 30 L 70 45 L 60 55 H 40 Z" fill="black" />
        <rect x="20" y="50" width="60" height="10" fill="black" />
        <circle cx="35" cy="55" r="15" fill="white" />
        <circle cx="65" cy="55" r="15" fill="white" />
        <circle cx="35" cy="55" r="8" fill="#34D399" />
        <circle cx="65" cy="55" r="8" fill="#34D399" />
        <path d="M45 75 Q 50 70, 55 75" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const AvatarShinchan: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FEE2E2" />
        <rect x="30" y="70" width="40" height="25" fill="#EF4444" />
        <path d="M25 70 C 20 50, 30 20, 50 20 C 70 20, 80 50, 75 70 Z" fill="#FDE68A" />
        <path d="M30 25 C 20 15, 80 15, 70 25 S 80 50, 50 50 S 20 50, 30 25" fill="#1F2937" />
        <circle cx="40" cy="55" r="8" fill="white" />
        <circle cx="60" cy="55" r="8" fill="white" />
        <circle cx="40" cy="55" r="4" fill="black" />
        <circle cx="60" cy="55" r="4" fill="black" />
        <path d="M40 70 Q 50 65, 60 70" fill="none" stroke="black" strokeWidth="3" />
        <path d="M30 40 C 40 35, 60 35, 70 40" stroke="black" strokeWidth="5" fill="none" />
    </svg>
);

const AvatarPikachu: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#4ADE80" />
        <path d="M20 80 C 10 50, 20 20, 50 15 C 80 20, 90 50, 80 80 Z" fill="#FBBF24" />
        <path d="M20 25 L 10 10 L 25 20 Z" fill="#1F2937" />
        <path d="M80 25 L 90 10 L 75 20 Z" fill="#1F2937" />
        <circle cx="40" cy="50" r="6" fill="black" />
        <circle cx="60" cy="50" r="6" fill="black" />
        <path d="M45 60 Q 50 65, 55 60" stroke="black" strokeWidth="2" fill="none" />
        <path d="M50 55 Q 52 58, 48 60" stroke="black" strokeWidth="2" fill="none" />
        <circle cx="30" cy="65" r="10" fill="#EF4444" />
        <circle cx="70" cy="65" r="10" fill="#EF4444" />
    </svg>
);

const AvatarScoobyDoo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#A7F3D0" />
        <path d="M25 90 V 40 C 25 20, 40 10, 50 10 C 60 10, 75 20, 75 40 V 60 L 65 90 Z" fill="#A16207" />
        <path d="M40 50 C 30 40, 70 40, 60 50 V 70 H 40 Z" fill="#FDE68A" />
        <circle cx="45" cy="45" r="5" fill="black" />
        <circle cx="55" cy="45" r="5" fill="black" />
        <circle cx="50" cy="60" r="4" fill="black" />
        <path d="M45 65 Q 50 70, 55 65" fill="none" stroke="black" strokeWidth="2" />
        <path d="M30 20 Q 20 10, 40 20" stroke="black" strokeWidth="3" fill="none" />
        <path d="M70 20 Q 80 10, 60 20" stroke="black" strokeWidth="3" fill="none" />
        <rect x="45" y="85" width="10" height="10" fill="#3B82F6" />
    </svg>
);

const AvatarJohnnyBravo: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#BFDBFE" />
        <rect x="30" y="60" width="40" height="35" fill="black" />
        <path d="M30 60 C 25 40, 35 25, 50 25 C 65 25, 75 40, 70 60 Z" fill="#FDE68A" />
        <path d="M30 30 C 40 10, 60 10, 70 30 S 60 50, 50 50 S 20 50, 30 30" fill="#FBBF24" />
        <rect x="35" y="50" width="30" height="8" fill="black" />
        <path d="M45 75 Q 50 80, 55 75" fill="none" stroke="white" strokeWidth="2" />
    </svg>
);

const AvatarDexter: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#E0E7FF" />
        <rect x="25" y="60" width="50" height="35" fill="white" />
        <path d="M30 60 C 20 40, 40 20, 50 20 C 60 20, 80 40, 70 60 Z" fill="#FDE68A" />
        <path d="M40 20 C 30 10, 70 10, 60 20 S 70 40, 50 40 S 30 40, 40 20" fill="#FB923C" />
        <circle cx="45" cy="50" r="15" fill="white" />
        <circle cx="55" cy="50" r="15" fill="white" />
        <circle cx="48" cy="50" r="4" fill="black" />
        <circle cx="52" cy="50" r="4" fill="black" />
        <path d="M45 70 Q 50 65, 55 70" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const AvatarDeeDee: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#FCE7F3" />
        <rect x="30" y="70" width="40" height="25" fill="#F472B6" />
        <path d="M30 70 C 25 50, 35 30, 50 30 C 65 30, 75 50, 70 70 Z" fill="#FDE68A" />
        <path d="M20 40 Q 25 10, 40 30" fill="#FBBF24" />
        <path d="M80 40 Q 75 10, 60 30" fill="#FBBF24" />
        <circle cx="40" cy="55" r="12" fill="white" />
        <circle cx="60" cy="55" r="12" fill="white" />
        <circle cx="40" cy="55" r="6" fill="#3B82F6" />
        <circle cx="60" cy="55" r="6" fill="#3B82F6" />
        <path d="M45 75 Q 50 85, 55 75" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const AvatarCourage: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#DDD6FE" />
        <path d="M20 80 C 10 50, 30 20, 50 20 C 70 20, 90 50, 80 80 Z" fill="#F5D0FE" />
        <path d="M30 30 Q 20 10, 40 25" fill="#F5D0FE" />
        <path d="M70 30 Q 80 10, 60 25" fill="#F5D0FE" />
        <circle cx="40" cy="50" r="10" fill="white" />
        <circle cx="60" cy="50" r="10" fill="white" />
        <circle cx="40" cy="50" r="5" fill="black" />
        <circle cx="60" cy="50" r="5" fill="black" />
        <path d="M40 70 Q 50 60, 60 70" fill="none" stroke="black" strokeWidth="3" />
        <circle cx="50" cy="60" r="5" fill="black" />
        <circle cx="50" cy="40" r="3" fill="black" />
    </svg>
);

const AvatarKimPossible: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#374151" />
        <rect x="25" y="65" width="50" height="30" fill="#4B5563" />
        <path d="M30 65 C 25 45, 35 25, 50 25 C 65 25, 75 45, 70 65 Z" fill="#FDE68A" />
        <path d="M25 30 C 30 10, 70 10, 75 30 S 70 55, 50 55 S 20 50, 25 30" fill="#FB923C" />
        <circle cx="45" cy="50" r="6" fill="#166534" />
        <circle cx="55" cy="50" r="6" fill="#166534" />
        <path d="M45 60 Q 50 65, 55 60" fill="none" stroke="black" strokeWidth="2" />
        <path d="M40 40 L 60 40" stroke="black" strokeWidth="3" fill="none" />
    </svg>
);

// Export map
export const AvatarIcons: Record<string, React.FC<{className?: string}>> = {
    Oggy: AvatarOggy,
    Ben10: AvatarBen10,
    MrBean: AvatarMrBean,
    Tom: AvatarTom,
    Jerry: AvatarJerry,
    Doraemon: AvatarDoraemon,
    SpongeBob: AvatarSpongeBob,
    PatrickStar: AvatarPatrickStar,
    Dora: AvatarDora,
    Blossom: AvatarBlossom,
    Bubbles: AvatarBubbles,
    Buttercup: AvatarButtercup,
    Shinchan: AvatarShinchan,
    Pikachu: AvatarPikachu,
    ScoobyDoo: AvatarScoobyDoo,
    JohnnyBravo: AvatarJohnnyBravo,
    Dexter: AvatarDexter,
    DeeDee: AvatarDeeDee,
    Courage: AvatarCourage,
    KimPossible: AvatarKimPossible,
};

// Export array of keys for easy mapping
export const avatarOptions = Object.keys(AvatarIcons);