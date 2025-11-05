import React from 'react';
import Logo from './icons/Logo';

const AboutPage: React.FC = () => {
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
            <strong className="font-semibold text-[var(--color-text)]">100 Challenge Levels:</strong> Embark on a journey from a typing novice to a titan! Progress through 100 carefully crafted levels, each with specific WPM and accuracy goals. Unlock unique, animated badges as you complete milestones.
          </li>
          <li>
            <strong className="font-semibold text-[var(--color-text)]">Personalized Profile:</strong> Your profile is your typing hub. Track your best WPM, daily streak, and performance history with our analysis chart. Customize your avatar and view your collection of earned badges.
          </li>
          <li>
            <strong className="font-semibold text-[var(--color-text)]">Competitive Leaderboard:</strong> See how you stack up against other typists! The leaderboard ranks all users by their best WPM, with special honors for the top three.
          </li>
        </ul>
      </div>
      
      <div className="w-full border-t-2 border-dashed border-[var(--color-border)] pt-6 text-center">
         <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">About the Creator</h2>
         <p className="text-lg text-[var(--color-text-muted)]">
            This application was designed and developed by amall.png. If you have any questions, feedback, or just want to connect, feel free to reach out!
         </p>
         <div className="flex justify-center items-center gap-6 mt-4">
            <a href="mailto:amalazeesa@gmail.com" className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                Email
            </a>
            <a href="https://www.instagram.com/amall.png_/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44s-3.115.01-4.24.06c-2.45.11-3.66 1.32-3.77 3.77-.05 1.12-.06 2.9-.06 4.47s.01 3.35.06 4.47c.11 2.45 1.32 3.66 3.77 3.77 1.12.05 4.24.06 4.24.06s3.115-.01 4.24-.06c2.45-.11 3.66-1.32 3.77-3.77.05-1.12.06-2.9.06-4.47s-.01-3.35-.06-4.47c-.11-2.45-1.32-3.66-3.77-3.77-1.12-.05-4.24-.06-4.24-.06zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm0 7.81a3.06 3.06 0 110-6.12 3.06 3.06 0 010 6.12zM17.63 6.04a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"></path></svg>
                Instagram
            </a>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;