import React from 'react';
import { Task } from '../types';
import { BadgeIcons } from './icons/BadgeIcons';

const Badge: React.FC<{ task: Task }> = ({ task }) => {
  const BadgeIcon = BadgeIcons[task.badge.icon]?.component;
  if (!BadgeIcon) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 badge-animation">
      <div className="w-32 h-32">
        <BadgeIcon className="w-full h-full" />
      </div>
      <p className="text-xl font-semibold text-[var(--color-bg)]">{task.badge.name}</p>
    </div>
  );
};

export default Badge;
