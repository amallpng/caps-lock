import React from 'react';

const Avatar1: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFDDC1" stroke="#282828" strokeWidth="3"/>
    <circle cx="35" cy="40" r="5" fill="#282828" />
    <circle cx="65" cy="40" r="5" fill="#282828" />
    <path d="M 30 65 Q 50 80 70 65" stroke="#282828" strokeWidth="3" fill="none" />
  </svg>
);

const Avatar2: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#C1FFD7" stroke="#282828" strokeWidth="3"/>
    <rect x="30" y="35" width="10" height="15" fill="#282828" />
    <rect x="60" y="35" width="10" height="15" fill="#282828" />
    <rect x="30" y="65" width="40" height="5" fill="#282828" />
  </svg>
);

const Avatar3: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#D7C1FF" stroke="#282828" strokeWidth="3"/>
        <path d="M 35 35 L 40 45 L 30 45 Z" fill="#282828" />
        <path d="M 65 35 L 70 45 L 60 45 Z" fill="#282828" />
        <path d="M 40 70 C 45 60, 55 60, 60 70" stroke="#282828" strokeWidth="3" fill="none" />
    </svg>
);

const Avatar4: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#FFC1C1" stroke="#282828" strokeWidth="3"/>
        <line x1="30" y1="40" x2="40" y2="40" stroke="#282828" strokeWidth="3" />
        <line x1="60" y1="40" x2="70" y2="40" stroke="#282828" strokeWidth="3" />
        <path d="M 30 65 A 20 20, 0, 0, 0, 70 65" stroke="#282828" strokeWidth="3" fill="none" />
    </svg>
);

export const avatarComponents: { [key: string]: React.FC<{ className?: string }> } = {
  'Avatar1': Avatar1,
  'Avatar2': Avatar2,
  'Avatar3': Avatar3,
  'Avatar4': Avatar4,
};

export const avatarOptions = Object.keys(avatarComponents);
