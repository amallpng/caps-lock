import React from 'react';

// A single, generic fallback avatar to be used for new users or when an avatar is not found.
export const FallbackAvatar: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="var(--color-secondary)" stroke="var(--color-border)" strokeWidth="1.5" />
        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="var(--color-text-muted)" />
        <path d="M18 19C18 16.2386 15.3137 14 12 14C8.68629 14 6 16.2386 6 19H18Z" fill="var(--color-text-muted)" />
    </svg>
);

export const FALLBACK_AVATAR_ID = 'fallback_avatar';

// All default pixel art avatar components have been removed. 
// This map now only contains the fallback, for rendering when a custom avatar isn't found.
export const avatarComponents: { [key: string]: React.FC<{ className?: string }> } = {
    [FALLBACK_AVATAR_ID]: FallbackAvatar,
};

// This is now only used to assign a profile picture to new users. It will always be the fallback.
export const avatarOptions = [FALLBACK_AVATAR_ID];
