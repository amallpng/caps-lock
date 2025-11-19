import React, { useState, useEffect, useCallback } from 'react';
import { User, Task } from '../types';
import { PYTHON_CHALLENGES, PythonChallenge } from '../services/pythonChallengeService';
import Badge from './Badge';
import CoinIcon from './icons/CoinIcon';

const LearnPythonPage: React.FC<{ user: User; onUserUpdate: (user: User) => void; }> = ({ user, onUserUpdate }) => {
    const [activeChallenge, setActiveChallenge] = useState<PythonChallenge | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
    const [showRewardModal, setShowRewardModal] = useState<PythonChallenge | null>(null);
    const [coinNotification, setCoinNotification] = useState<{ amount: number; key: number } | null>(null);

    // Daily attempt lock state
    const [isDailyLocked, setIsDailyLocked] = useState(false);
    const [dailyTimeLeft, setDailyTimeLeft] = useState('');
    
    // 5-day course expiration state
    const [isCourseExpired, setIsCourseExpired] = useState(false);
    const [courseTimeLeft, setCourseTimeLeft] = useState('');
    
    const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);

    // Set course start date on first visit
    useEffect(() => {
        if (user && user.pythonChallengeProgress && !user.pythonChallengeProgress.pythonCourseStartDate && !user.isGuest) {
            onUserUpdate({
                ...user,
                pythonChallengeProgress: {
                    ...user.pythonChallengeProgress,
                    pythonCourseStartDate: Date.now()
                }
            });
        }
    }, [user, onUserUpdate]);
    
    // Countdown timer for 5-day course limit
    useEffect(() => {
        if (!user.pythonChallengeProgress?.pythonCourseStartDate) return;

        const startDate = user.pythonChallengeProgress.pythonCourseStartDate;
        const endDate = startDate + 5 * 24 * 60 * 60 * 1000;

        const interval = setInterval(() => {
            const now = Date.now();
            const remaining = endDate - now;

            if (remaining <= 0) {
                setIsCourseExpired(true);
                setCourseTimeLeft('00:00:00:00');
                clearInterval(interval);
            } else {
                const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                
                setCourseTimeLeft(
                    `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
                setIsCourseExpired(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [user.pythonChallengeProgress?.pythonCourseStartDate]);

    const checkDailyLockStatus = useCallback(() => {
        const now = Date.now();
        const lastAttempt = user.pythonChallengeProgress?.lastAttemptTimestamp || 0;
        let attempts = user.pythonChallengeProgress?.attemptsToday || 0;
        
        if (now - lastAttempt > 24 * 60 * 60 * 1000) {
            if (attempts > 0) {
                attempts = 0;
                onUserUpdate({ ...user, pythonChallengeProgress: { ...user.pythonChallengeProgress, attemptsToday: 0 }});
            }
        }

        if (attempts >= 2) {
            setIsDailyLocked(true);
            const remaining = lastAttempt + (24 * 60 * 60 * 1000) - now;
            setDailyTimeLeft(new Date(remaining).toISOString().substr(11, 8));
        } else {
            setIsDailyLocked(false);
        }
    }, [user, onUserUpdate]);


    useEffect(() => {
        checkDailyLockStatus();
        const interval = setInterval(checkDailyLockStatus, 1000);
        return () => clearInterval(interval);
    }, [checkDailyLockStatus]);
    

    const loadChallenge = useCallback((level: number) => {
        const challenge = PYTHON_CHALLENGES.find(c => c.level === level) || null;
        setActiveChallenge(challenge);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setFeedback(null);
    }, []);

    useEffect(() => {
        const currentLevel = user.pythonChallengeProgress?.currentLevel || 1;
        loadChallenge(currentLevel);
    }, [user.pythonChallengeProgress?.currentLevel, loadChallenge]);
    
    const handleSubmit = () => {
        if (selectedAnswer === null || !activeChallenge) return;

        setIsAnswered(true);
        const correct = selectedAnswer === activeChallenge.correctAnswerIndex;

        if (correct) {
            const earnedCoins = activeChallenge.coinReward || 0;
            let feedbackMessage = '✅ Correct!';
            
            if (earnedCoins > 0) {
                setCoinNotification({ amount: earnedCoins, key: Date.now() });
                setTimeout(() => setCoinNotification(null), 2500);

                if (!activeChallenge.badge) {
                     feedbackMessage += ` You got ${earnedCoins} coin${earnedCoins > 1 ? 's' : ''}!`;
                }
            }
            setFeedback({ type: 'correct', message: feedbackMessage });

            onUserUpdate({ ...user, coins: (user.coins || 0) + earnedCoins });
            
            if (activeChallenge.badge) {
                setShowRewardModal(activeChallenge);
            }
        } else {
            const newAttempts = (user.pythonChallengeProgress?.attemptsToday || 0) + 1;
            onUserUpdate({
                ...user,
                pythonChallengeProgress: {
                    ...user.pythonChallengeProgress,
                    attemptsToday: newAttempts,
                    lastAttemptTimestamp: Date.now(),
                }
            });

            if (newAttempts >= 2) {
                setFeedback({ type: 'incorrect', message: '❌ Incorrect. Out of daily attempts. The quiz is now locked for 24 hours.' });
                setIsDailyLocked(true);
            } else {
                setFeedback({ type: 'incorrect', message: `❌ Incorrect. You have ${2 - newAttempts} daily attempt(s) left.` });
            }
        }
    };
    
    const handleNext = () => {
        if (!activeChallenge) return;
        
        const nextLevel = activeChallenge.level + 1;
        const updatedProgress = {
            ...user.pythonChallengeProgress,
            currentLevel: Math.min(PYTHON_CHALLENGES.length + 1, nextLevel),
        };
        onUserUpdate({ ...user, pythonChallengeProgress: updatedProgress });
    };

    const handleCloseRewardModal = () => {
        setShowRewardModal(null);
        handleNext();
    };

    if (user.isGuest || !user.isChallengeParticipant) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Access Denied</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">This Python course is a special feature for registered participants. Please sign up if you wish to access it.</p>
            </div>
        );
    }
    
    if (isCourseExpired) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Course Expired</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    Your 5-day access to the Python course has ended. We hope you enjoyed the journey!
                </p>
            </div>
        )
    }

    if (isDailyLocked) {
        return (
             <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Quiz Locked</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    You've used all your daily attempts. Please come back tomorrow to continue learning!
                </p>
                <div className="text-4xl font-bold text-[var(--color-text)] p-4 bg-[var(--color-bg)] rounded-sm border border-[var(--color-border)]">
                    {dailyTimeLeft}
                </div>
            </div>
        )
    }

    const renderActionButton = () => {
        if (!isAnswered) {
            return (
                <button onClick={handleSubmit} disabled={selectedAnswer === null} className="w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    Submit Answer
                </button>
            );
        }
        return (
            <button onClick={handleNext} className="w-full btn-vintage bg-green-700 font-bold py-3 px-4 rounded-sm text-lg">
                Next Question
            </button>
        );
    };
    
    const getOptionClass = (index: number) => {
        if (!isAnswered) {
            return selectedAnswer === index 
                ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]' 
                : 'bg-[var(--color-bg)] hover:bg-[var(--color-secondary)]';
        }
        
        if (index === activeChallenge?.correctAnswerIndex) {
            return 'bg-green-300 border-green-500 text-green-900';
        }
        if (index === selectedAnswer) {
            return 'bg-red-300 border-red-500 text-red-900';
        }

        return 'bg-gray-200 border-gray-400 text-gray-500 opacity-70';
    };
    
    const totalChallenges = PYTHON_CHALLENGES.length;
    const currentLevel = user.pythonChallengeProgress?.currentLevel || 1;
    const completedChallenges = Math.max(0, currentLevel - 1);
    const progressPercentage = (completedChallenges / totalChallenges) * 100;
    const displayLevel = Math.min(currentLevel, totalChallenges);

    return (
        <>
        {isLearnModalOpen && activeChallenge && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsLearnModalOpen(false)}>
                <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setIsLearnModalOpen(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--color-secondary)]" aria-label="Close">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{activeChallenge.title}</h2>
                    <p className="text-[var(--color-text-muted)] text-base leading-relaxed whitespace-pre-wrap">{activeChallenge.explanation}</p>
                    {activeChallenge.example && (
                        <>
                            <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4 mb-2">Example:</h3>
                            <pre className="bg-gray-800 text-white p-4 rounded-sm text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                                <code>{activeChallenge.example}</code>
                            </pre>
                        </>
                    )}
                </div>
            </div>
        )}
        {showRewardModal && (
             <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl text-center">
                    <h2 className="text-3xl font-bold text-yellow-600">Challenge Complete!</h2>
                    {showRewardModal.badge && <><p className="text-lg text-[var(--color-text-muted)]">You've unlocked a new badge!</p><div className="my-4 inline-block"><Badge task={showRewardModal as unknown as Task} isPulsing={true} /></div></>}
                    {showRewardModal.coinReward > 0 && <div className="text-2xl font-bold text-yellow-600 animate-fade-in flex items-center justify-center gap-2"><CoinIcon className="h-8 w-8" />+ {showRewardModal.coinReward} Coins!</div>}
                    <button onClick={handleCloseRewardModal} className="mt-8 w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg">Continue</button>
                </div>
            </div>
        )}
        <div className="w-full max-w-3xl flex flex-col gap-6">
            <div className="w-full bg-[var(--color-bg)] p-4 border-2 border-dashed border-[var(--color-border)] rounded-sm">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-[var(--color-primary)]">Your Progress</h2>
                    <span className="font-semibold text-[var(--color-text-muted)]">
                        Challenge {displayLevel} / {totalChallenges}
                    </span>
                </div>
                <div
                    role="progressbar"
                    aria-valuenow={completedChallenges}
                    aria-valuemin={0}
                    aria-valuemax={totalChallenges}
                    className="relative w-full h-6 bg-[var(--color-secondary)] rounded-sm border-2 border-[var(--color-text)] overflow-hidden shadow-inner"
                >
                    <div 
                        className="absolute top-0 left-0 h-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-bold text-sm text-[var(--color-bg)]" style={{ textShadow: '1px 1px 1px var(--color-text)'}}>
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch">
                {user.pythonChallengeProgress?.pythonCourseStartDate && (
                    <div className="flex-1 text-center p-2 bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] rounded-sm flex flex-col justify-center">
                        <p className="text-base text-[var(--color-text-muted)]">Course ends in:</p>
                        <p className="text-2xl font-bold text-[var(--color-primary)] tracking-widest">{courseTimeLeft || '...'}</p>
                    </div>
                )}
                <div className="flex-1 text-center p-2 bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] rounded-sm flex flex-col justify-center">
                    <p className="text-base text-[var(--color-text-muted)]">Incorrect Attempts Left Today:</p>
                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                        {Math.max(0, 2 - (user.pythonChallengeProgress?.attemptsToday || 0))} / 2
                    </p>
                </div>
            </div>

            {activeChallenge ? (
                <>
                    <div className="text-center p-4 bg-[var(--color-secondary)]/30 rounded-sm border-y-2 border-dashed border-[var(--color-border)]">
                        <h1 className="text-3xl font-bold text-[var(--color-primary)]">{activeChallenge.level}. {activeChallenge.title}</h1>
                        <p className="mt-2 text-[var(--color-text-muted)] text-lg leading-relaxed">{activeChallenge.question}</p>
                    </div>
                     {activeChallenge.codeSnippet && (
                        <pre className="bg-gray-800 text-white p-4 rounded-sm text-base font-mono whitespace-pre-wrap overflow-x-auto">
                            <code>{activeChallenge.codeSnippet}</code>
                        </pre>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeChallenge.options.map((option, index) => (
                             <button
                                key={index}
                                onClick={() => setSelectedAnswer(index)}
                                disabled={isAnswered}
                                className={`p-4 text-left font-mono text-base rounded-sm border-2 transition-all duration-300 ${getOptionClass(index)}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="h-10 relative">
                        {coinNotification && (
                            <div
                                key={coinNotification.key}
                                className="absolute bottom-0 left-1/2 flex items-center gap-1 font-bold text-yellow-600 animate-coin-float text-lg"
                            >
                                <CoinIcon className="w-6 h-6" />
                                <span>+{coinNotification.amount} Coin{coinNotification.amount > 1 ? 's' : ''}!</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <button onClick={() => setIsLearnModalOpen(true)} className="flex items-center gap-2 text-[var(--color-primary)] hover:underline font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            Learn
                        </button>
                         <div className="w-1/2">
                            {renderActionButton()}
                        </div>
                    </div>
                    {feedback && (
                        <div className={`p-3 text-center font-bold rounded-sm ${feedback.type === 'correct' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {feedback.message}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-[var(--color-secondary)]/30 rounded-sm border-2 border-dashed border-[var(--color-border)]">
                    <h1 className="text-3xl font-bold text-green-600">Congratulations!</h1>
                    <p className="text-lg mt-2 text-[var(--color-text-muted)]">You have completed all the Python challenges. You are a true Python Hero!</p>
                </div>
            )}
        </div>
        </>
    );
};

export default LearnPythonPage;