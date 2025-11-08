import React from 'react';
import { Task } from '../types';
import { BadgeIcons } from './icons/BadgeIcons';

interface BadgeProps {
  task: Task;
  isPulsing?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ task, isPulsing = false }) => {
  const BadgeIcon = BadgeIcons[task.badge.icon]?.component;
  if (!BadgeIcon) return null;

  const animationClasses = ['badge-animation'];
  if (isPulsing) {
    animationClasses.push('badge-pulse');
  }

  return (
    <div className={`flex flex-col items-center gap-4 p-4 ${animationClasses.join(' ')}`}>
      <div className="w-32 h-32">
        <BadgeIcon className="w-full h-full" />
      </div>
      <p className="text-xl font-semibold text-[var(--color-text)]">{task.badge.name}</p>
    </div>
  );
};

export default Badge;