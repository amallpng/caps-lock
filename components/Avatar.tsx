import React from 'react';
import { avatarComponents } from './icons/AvatarIcons';

interface AvatarProps {
  avatarKey: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarKey, className }) => {
  const AvatarComponent = avatarComponents[avatarKey] || Object.values(avatarComponents)[0]; // Fallback to the first avatar
  
  if (!AvatarComponent) {
    // A simple fallback div if no avatars are defined at all
    return <div className={`w-16 h-16 rounded-full bg-gray-400 ${className}`}></div>;
  }
  
  return <AvatarComponent className={className} />;
};

export default Avatar;
