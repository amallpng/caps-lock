import React from 'react';

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const LearnPythonPage: React.FC = () => {
  return (
    <div className="w-full max-w-2xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
        <CheckmarkIcon />
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