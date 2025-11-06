import React from 'react';

const RetroConfirmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.1" />
        <path d="M8 12.5l3 3 5-5" stroke="currentColor" strokeWidth="3" />
    </svg>
);


const LearnPythonPage: React.FC = () => {
  return (
    <div className="w-full max-w-2xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
        <RetroConfirmIcon />
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            You're All Set!
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            You have successfully signed up for our 'Learn Python' course. We will inform you of the course start date and provide all necessary details through your registered email.
        </p>
        <p className="font-semibold text-[var(--color-text)]">
            Get ready to code!
        </p>
    </div>
  );
};

export default LearnPythonPage;