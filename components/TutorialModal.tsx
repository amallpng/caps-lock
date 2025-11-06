import React, { useState, KeyboardEvent } from 'react';
import CoinIcon from './icons/CoinIcon';

const PracticeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
);
const ChallengeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const ThemeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
);

const tutorialSteps = [
    {
        icon: <PracticeIcon />,
        title: 'Practice Mode',
        content: "Welcome to Practice Mode! Choose your difficulty and time, then start typing. It's a great place to warm up your fingers."
    },
    {
        icon: <ChallengeIcon />,
        title: '100 Challenges',
        content: "Ready for an adventure? Climb 100 levels, each with unique goals. Earn cool, animated badges for your profile as you progress!"
    },
    {
        icon: <ProfileIcon />,
        title: 'Your Profile',
        content: "Track your journey on your Profile page. See your best scores, daily streak, and a chart of your performance over time."
    },
    {
        icon: <CoinIcon className="h-12 w-12" />,
        title: 'Rewards & Coins',
        content: "Earn coins by completing challenges and sharing the app. Use them to claim real rewards from the 'Claim Rewards' section on your profile!"
    },
    {
        icon: <ThemeIcon />,
        title: 'Themes',
        content: "Customize your experience! Click the theme switcher in the footer to change the look and feel of the app anytime."
    },
];

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const currentStep = tutorialSteps[step];
    const isLastStep = step === tutorialSteps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onClose();
        } else {
            setStep(s => s + 1);
        }
    };
    const handlePrev = () => setStep(s => Math.max(s - 1, 0));
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Enter' && isLastStep) onClose();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl relative flex flex-col items-center text-center"
                onClick={e => e.stopPropagation()}
                onKeyDown={handleKeyDown}
                tabIndex={-1} // Make div focusable for keydown
            >
                <div className="text-[var(--color-primary)] mb-4">{currentStep.icon}</div>
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{currentStep.title}</h2>
                <p className="text-[var(--color-text-muted)] text-lg mb-8 h-24">{currentStep.content}</p>

                <div className="flex justify-center items-center gap-3 mb-8">
                    {tutorialSteps.map((_, index) => (
                        <div key={index} className={`w-3 h-3 rounded-full transition-colors ${step === index ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}></div>
                    ))}
                </div>

                <div className="w-full flex justify-between items-center">
                    <button 
                        onClick={handlePrev} 
                        disabled={step === 0}
                        className="bg-transparent text-[var(--color-text-muted)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-border)] hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        className="btn-vintage font-bold py-2 px-6 rounded-sm text-lg"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
