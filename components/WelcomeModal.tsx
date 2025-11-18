import React from 'react';
import { LogoIcon } from './icons/Logo';

const WelcomeModal: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl text-center"
      >
        <div className="flex justify-center mb-4">
            <LogoIcon className="h-20 w-20" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
            Welcome to CAPS LOCK!
        </h2>
        <p className="text-[var(--color-text-muted)] mb-6 text-lg">
            Get ready to improve your typing skills.
        </p>
        <div className="bg-[var(--color-secondary)] p-2 border border-[var(--color-border)] rounded-sm">
             <img 
                src="https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/1S8L4X_8HAEk-Rj_j6C9-f2C7RkF-qXpE/keyboard_hand_position.gif" 
                alt="Diagram showing correct finger placement on a keyboard's home row." 
                className="w-full h-auto object-contain"
            />
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;