import React, { useState } from 'react';
import Logo from './icons/Logo';
import CreatorModal from './CreatorModal';

interface AboutPageProps {
  onOpenPrivacyModal: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onOpenPrivacyModal }) => {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-[var(--color-border)] flex flex-col gap-8 leading-relaxed">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-20 w-auto" />
        <p className="text-lg text-center text-[var(--color-text-muted)]">
          Welcome to CAPS LOCK, a typing application designed with a vintage typewriter aesthetic to make practicing your typing skills a uniquely enjoyable experience. Our goal is to help you improve your typing speed and accuracy through various engaging modes, all while tracking your progress and celebrating your achievements.
        </p>
      </div>

      <div className="w-full border-t-2 border-dashed border-[var(--color-border)] pt-6">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Features</h2>
        <ul className="space-y-4 list-disc list-inside text-[var(--color-text-muted)]">
          <li>
            <strong className="font-semibold text-[var(--color-text)]">Practice Mode:</strong> Hone your skills in a flexible environment. Choose your desired difficulty (Easy, Medium, Hard) and session duration (15s, 30s, 60s, 120s) to create the perfect practice session.
          </li>
          <li>
            <strong className="font-semibold text-[var(--color-text)]">100 Challenge Levels:</strong> Embark on a journey from a typing novice to a titan! Progress through 100 carefully crafted levels, each with unique goals. Unlock unique, animated badges as you complete milestones.
          </li>
          <li>
            <strong className="font-semibold text-[var(--color-text)]">Personalized Profile:</strong> Your profile is your typing hub. Track your best WPM, daily streak, and performance history with our analysis chart. Customize your avatar and view your collection of earned badges.
          </li>
        </ul>
      </div>
      
      <div className="w-full border-t-2 border-dashed border-[var(--color-border)] pt-6 text-center">
         <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">About the Creator</h2>
         <p className="text-lg text-[var(--color-text-muted)]">
            This application was designed and developed by amall.png. If you have any questions, feedback, or just want to connect, feel free to reach out!
         </p>
         <div className="flex justify-center items-center gap-6 mt-4 flex-wrap">
            <a href="mailto:amalazeesa@gmail.com" className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                Email
            </a>
            <button onClick={() => setIsCreatorModalOpen(true)} className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Creator Panel
            </button>
            <button onClick={onOpenPrivacyModal} className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              Privacy & Policy
            </button>
         </div>
      </div>
      {isCreatorModalOpen && <CreatorModal onClose={() => setIsCreatorModalOpen(false)} />}
    </div>
  );
};

export default AboutPage;