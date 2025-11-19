import React from 'react';

// Common base component for all avatars
const AvatarBase: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <g>{children}</g>
    </svg>
);

// Helper to create pixel art paths
const P = (props: {c: string, d: string}) => <path fill={props.c} d={props.d} />;

// 1. Boy, brown hair, blue shirt
const Avatar1: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
      <P c="#ffc999" d="M8,9h8v7H8z" />
      <P c="#6a4f3a" d="M8,7h8v2H8z" />
      <P c="#fff" d="M10,11h2v2h-2z M14,11h2v2h-2z"/>
      <P c="#222" d="M11,12h1v1h-1z M15,12h1v1h-1z"/>
      <P c="#4a90e2" d="M8,16h8v2H8z M9,18h6v1H9z" />
      <P c="#222" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 2. Girl, blonde hair, pink dress
const Avatar2: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z" />
        <P c="#ffd343" d="M7,7h10v3H7z M7,10h1v4H7z M16,10h1v4h-1z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#5481e2" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#ff80a4" d="M7,16h10v2H7z M8,18h8v1H8z"/>
        <P c="#ff5c8a" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 3. Boy, glasses, green shirt
const Avatar3: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M8,9h8v7H8z" />
        <P c="#333" d="M8,7h8v2H8z M9,9h1v1H9z M14,9h1v1h-1z"/>
        <P c="#222" d="M9,11h3v2H9z M14,11h3v2h-3z M12,11h2v1h-2z"/>
        <P c="#34a853" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#222" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 4. Girl, red hair, yellow shirt
const Avatar4: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z"/>
        <P c="#e54335" d="M8,7h8v3H8z M7,8h1v3H7z M16,8h1v3h-1z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#fbbc05" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#e54335" d="M10,15h4v1h-4z"/>
    </AvatarBase>
);

// 5. Boy, spiky hair, purple shirt
const Avatar5: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M8,9h8v7H8z" />
        <P c="#d94a38" d="M8,7h1v1H8z M10,7h1v1h-1z M12,7h1v1h-1z M14,7h1v1h-1z M16,7h1v1h-1z M9,8h1v1H9z M11,8h1v1h-1z M13,8h1v1h-1z M15,8h1v1h-1z" />
        <P c="#fff" d="M10,12h2v1h-2z M14,12h2v1h-2z"/>
        <P c="#222" d="M11,12h1v1h-1z M15,12h1v1h-1z"/>
        <P c="#8e44ad" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#222" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 6. Girl, long brown hair, cyan dress
const Avatar6: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M9,9h6v7H9z"/>
        <P c="#8a6e5a" d="M8,7h8v8H8z M16,9h1v7h-1z M7,9h1v7H7z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#16a085" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#d35400" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 7. Boy, cap, orange shirt
const Avatar7: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M8,10h8v6H8z"/>
        <P c="#e54335" d="M7,8h10v2H7z"/>
        <P c="#333" d="M8,10h8v1H8z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#f39c12" d="M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);

// 8. Girl, hair buns, red shirt
const Avatar8: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z"/>
        <P c="#333" d="M8,8h2v2H8z M14,8h2v2h-2z M10,7h4v1h-4z"/>
        <P c="#fff" d="M10,12h2v1h-2z M14,12h2v1h-2z"/>
        <P c="#222" d="M11,12h1v1h-1z M15,12h1v1h-1z"/>
        <P c="#c0392b" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#222" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 9. Boy, dark skin, afro
const Avatar9: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#9a6a42" d="M8,9h8v7H8z"/>
        <P c="#222" d="M7,8h10v3H7z M8,7h8v1H8z M11,15h2v1h-2z"/>
        <P c="#fff" d="M10,12h2v1h-2z M14,12h2v1h-2z"/>
        <P c="#2980b9" d="M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);

// 10. Girl, dark skin, braids
const Avatar10: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#654321" d="M8,9h8v7H8z"/>
        <P c="#222" d="M7,7h2v8H7z M15,7h2v8h-2z M9,7h6v2H9z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#f1c40f" d="M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);

// 11. Boy, light brown hair, hoodie
const Avatar11: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M9,10h6v6H9z"/>
        <P c="#a17d5b" d="M8,7h8v3H8z"/>
        <P c="#bdc3c7" d="M8,10h8v7H8z M7,11h1v5H7z M16,11h1v5h-1z"/>
        <P c="#95a5a6" d="M8,17h8v1H8z M9,18h6v1H9z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
    </AvatarBase>
);

// 12. Girl, pink hair
const Avatar12: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z"/>
        <P c="#ff7bac" d="M7,7h10v3H7z M8,10h8v1H8z"/>
        <P c="#fff" d="M10,11h2v2h-2z M14,11h2v2h-2z"/>
        <P c="#2c3e50" d="M11,12h1v1h-1z M15,12h1v1h-1z"/>
        <P c="#ecf0f1" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#222" d="M10,15h4v1h-4z"/>
    </AvatarBase>
);

// 13. Boy, ginger hair, freckles
const Avatar13: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M8,9h8v7H8z" />
        <P c="#e67e22" d="M8,7h8v2H8z M9,9h1v1H9z M14,9h1v1h-1z"/>
        <P c="#d35400" d="M9,14h1v1H9z M14,14h1v1h-1z"/>
        <P c="#fff" d="M10,11h2v2h-2z M14,11h2v2h-2z"/>
        <P c="#222" d="M11,12h1v1h-1z M15,12h1v1h-1z"/>
        <P c="#27ae60" d="M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);

// 14. Girl, blue hair
const Avatar14: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z"/>
        <P c="#3498db" d="M7,7h10v4H7z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z"/>
        <P c="#9b59b6" d="M8,16h8v2H8z M9,18h6v1H9z"/>
        <P c="#222" d="M11,15h2v1h-2z"/>
    </AvatarBase>
);

// 15. Boy, headphones
const Avatar15: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffc999" d="M8,9h8v7H8z"/>
        <P c="#6a4f3a" d="M8,7h8v2H8z"/>
        <P c="#333" d="M6,10h2v4H6z M16,10h2v4h-2z"/>
        <P c="#555" d="M8,10h8v1H8z"/>
        <P c="#fff" d="M10,12h2v2h-2z M14,12h2v2h-2z"/>
        <P c="#222" d="M11,13h1v1h-1z M15,13h1v1h-1z M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);

// 16. Girl, glasses, short hair
const Avatar16: React.FC<{ className?: string }> = ({ className }) => (
    <AvatarBase className={className}>
        <P c="#ffdda6" d="M8,9h8v7H8z"/>
        <P c="#8a6e5a" d="M7,7h10v4H7z"/>
        <P c="#222" d="M9,11h3v2H9z M14,11h3v2h-3z M12,11h2v1h-2z"/>
        <P c="#222" d="M11,15h2v1h-2z"/>
        <P c="#1abc9c" d="M8,16h8v2H8z M9,18h6v1H9z"/>
    </AvatarBase>
);


export const avatarComponents: { [key: string]: React.FC<{ className?: string }> } = {
  avatar1: Avatar1,
  avatar2: Avatar2,
  avatar3: Avatar3,
  avatar4: Avatar4,
  avatar5: Avatar5,
  avatar6: Avatar6,
  avatar7: Avatar7,
  avatar8: Avatar8,
  avatar9: Avatar9,
  avatar10: Avatar10,
  avatar11: Avatar11,
  avatar12: Avatar12,
  avatar13: Avatar13,
  avatar14: Avatar14,
  avatar15: Avatar15,
  avatar16: Avatar16,
};

export const avatarOptions = Object.keys(avatarComponents);