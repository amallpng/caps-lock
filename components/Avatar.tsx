import React from 'react';
import { FallbackAvatar } from './icons/AvatarIcons';
import { getCustomAvatars } from '../services/avatarService';

interface AvatarProps {
  avatarKey: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarKey, className }) => {
  const customAvatars = getCustomAvatars();
  const avatarData = customAvatars.find(a => a.id === avatarKey);
  
  // If it's a custom avatar, render it.
  if (avatarData?.type === 'base64' && avatarData.data) {
    return <img src={avatarData.data} alt="User Avatar" className={`object-cover ${className}`} />;
  }
  
  // Otherwise, render the single fallback avatar.
  // This handles new users, legacy users whose avatars were removed, and any invalid keys gracefully.
  return <FallbackAvatar className={className} />;
};

export default Avatar;
