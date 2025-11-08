import React, { useState, useEffect, useCallback, useContext } from 'react';
import { TASKS } from '../services/challengeService';
import { User, Task } from '../types';
import useTypingGame from '../hooks/useTypingGame';
import Results from './Results';
import Badge from './Badge';
import { updateUserAfterTest } from '../utils/statsUpdater';
import { SettingsContext } from '../contexts/SettingsContext';
import { playSound } from '../services/soundService';

type CharStyle = {
  transform: string;
  opacity: number;
};

const TypeAreaChallenge = ({ textToType, typedText, charStyles }: { textToType: string, typedText: string, charStyles: CharStyle[] }) => {
    const fullTextChars = textToType.split('').map((char, index) => {
        const style = charStyles[index] || {};
        let className = '';

        if (index < typedText.length) {
            // This character has been typed
            const isCorrect = typedText[index] === char;
            className = isCorrect 
                ? 'text-[var(--color-text)]' 
                : 'text-[var(--color-error)] underline bg-[var(--color-error)]/20';
        } else if (index === typedText.length) {
            // This is the current character to be typed (the caret position)
            className = 'caret-char';
        } else {
            // This is upcoming text
            className = 'text-[var(--color-text-muted)] opacity-80';
        }
        
        return (
            <span key={index} style={style} className={`inline-block ${className}`}>
                {char}
            </span>
        );
    });

    return (
        <div className="relative text-xl md:text-2xl tracking-wider p-4 bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-sm select-none leading-loose break-words shadow-inner">
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {fullTextChars}
            </p>
        </div>
    );
};


const ChallengeMode: React.FC<{ user: User; onUserUpdate: (user: User) => void; }> = ({ user, onUserUpdate }) => {
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [charStyles, setCharStyles] = useState<CharStyle[]>([]);
    const [showBadge, setShowBadge] = useState<Task | null>(null);
    const [lastEarnedCoins, setLastEarnedCoins] = useState(0);
    const { settings } = useContext(SettingsContext);

    if (user.isGuest) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Access Denied</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    The 100 Challenges mode is only available to registered users. Progress is not saved for guests. Please log in or create an account to start your journey.
                </p>
            </div>
        );
    }

    const { status, typedText, textToType, wpm, handleKeyDown, stats, reset } = useTypingGame(activeTask?.text || '', 999);
    
    const totalChallenges = TASKS.length;
    const completedChallenges = user.completedTasks.length;
    const progressPercentage = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;


    const handleSelectTask = (task: Task) => {
        const isUnlocked = task.id === 1 || user.completedTasks.includes(task.id - 1);
        if (isUnlocked && !user.completedTasks.includes(task.id)) {
            setActiveTask(task);
            
            const styles = task.text.split('').map(() => ({
                transform: `rotate(${(Math.random() - 0.5) * 2.5}deg) translateY(${(Math.random() - 0.5) * 2}px)`,
                opacity: Math.random() * 0.15 + 0.85,
            }));
            setCharStyles(styles);
            
            reset();
        }
    };
    
    const handleChallengeFinish = useCallback(() => {
        if (!activeTask) return;
        const passed = stats.wpm >= activeTask.wpmGoal && stats.accuracy >= activeTask.accuracyGoal;
        if (passed && !user.completedTasks.includes(activeTask.id)) {
            if (settings.soundEnabled) {
                playSound('challenge');
            }
            const performanceUpdates = updateUserAfterTest(user, stats);
            
            const earnedCoins = activeTask.coinReward;
            setLastEarnedCoins(earnedCoins);

            const updatedUser = { 
                ...user,
                ...performanceUpdates,
                coins: (user.coins || 0) + earnedCoins,
                completedTasks: [...user.completedTasks, activeTask.id].sort((a, b) => a - b)
             };
            onUserUpdate(updatedUser);
            setShowBadge(activeTask);
        }
    }, [activeTask, stats, user, onUserUpdate, settings]);


    useEffect(() => {
        if (status === 'finished') {
            handleChallengeFinish();
        }
    }, [status, handleChallengeFinish]);


    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!activeTask || status === 'finished') return;
            if (e.key === 'Tab' || e.key === 'Enter') return;
            if (e.key.match(/^[a-zA-Z0-9 `~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/) || e.key === ' ' || e.key === 'Backspace') {
                 e.preventDefault();
                 handleKeyDown(e.key);
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleKeyDown, activeTask, status]);

    const handleRestart = () => {
        setShowBadge(null);
        if (activeTask) {
            const passed = stats.wpm >= activeTask.wpmGoal && stats.accuracy >= activeTask.accuracyGoal;
            if (passed) {
                const nextTask = TASKS.find(t => t.id === activeTask.id + 1);
                if (nextTask) {
                    handleSelectTask(nextTask);
                } else {
                    setActiveTask(null);
                }
            } else {
                 reset();
            }
        } else {
             setActiveTask(null);
        }
    };

    if (showBadge) {
        return (
            <div className="w-full max-w-2xl flex flex-col items-center gap-6 text-center">
                <h2 className="text-4xl font-bold text-yellow-600">Badge Unlocked!</h2>
                <div className="bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] rounded-lg p-4">
                  <Badge task={showBadge} isPulsing={true} />
                </div>
                 <Results
                    stats={stats}
                    onRestart={handleRestart}
                    coinsEarned={lastEarnedCoins}
                    challengeInfo={{
                        wpmGoal: showBadge.wpmGoal,
                        accuracyGoal: showBadge.accuracyGoal,
                        passed: true,
                        isLastChallenge: showBadge.id === TASKS.length,
                    }}
                />
            </div>
        );
    }
    
    if (activeTask) {
        return (
            <div className="w-full max-w-4xl flex flex-col items-center gap-6">
                 <button onClick={() => setActiveTask(null)} className="self-start text-[var(--color-primary)] hover:underline">&larr; Back to Challenges</button>
                 
                 <div
                    role="progressbar"
                    aria-valuenow={completedChallenges}
                    aria-valuemin={0}
                    aria-valuemax={totalChallenges}
                    aria-label={`Challenge progress: ${completedChallenges} of ${totalChallenges} completed`}
                    className="relative w-full h-8 bg-[var(--color-secondary)] rounded-sm border-2 border-[var(--color-text)] overflow-hidden shadow-inner"
                >
                    <div 
                        className="absolute top-0 left-0 h-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-bold text-lg text-[var(--color-bg)]" style={{ textShadow: '1px 1px 1px var(--color-text)'}}>
                            Level {completedChallenges} / {totalChallenges}
                        </span>
                    </div>
                </div>

                 <h2 className="text-3xl font-bold">Level {activeTask.level}: {activeTask.badge.name}</h2>
                {status !== 'finished' ? (
                     <>
                        <TypeAreaChallenge textToType={textToType} typedText={typedText} charStyles={charStyles} />
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-lg w-full bg-[var(--color-secondary)]/50 p-4 rounded-sm border-y border-dashed border-[var(--color-border)]">
                           <p>WPM Goal: <span className="font-bold text-[var(--color-primary)]">{activeTask.wpmGoal}</span></p>
                           <div className="border-l border-[var(--color-border)] h-6 hidden sm:block"></div>
                           <p>Accuracy Goal: <span className="font-bold text-[var(--color-primary)]">{activeTask.accuracyGoal}%</span></p>
                           <div className="border-l border-[var(--color-border)] h-6 hidden sm:block"></div>
                           <p>Current WPM: <span className="font-bold text-[var(--color-text)]">{wpm}</span></p>
                        </div>
                        <p className="text-[var(--color-text-muted)]">Start typing to begin...</p>
                    </>
                ) : (
                    <Results
                        stats={stats}
                        onRestart={handleRestart}
                        coinsEarned={lastEarnedCoins}
                        challengeInfo={{
                            wpmGoal: activeTask.wpmGoal,
                            accuracyGoal: activeTask.accuracyGoal,
                            passed: stats.wpm >= activeTask.wpmGoal && stats.accuracy >= activeTask.accuracyGoal,
                            isLastChallenge: activeTask.id === TASKS.length,
                        }}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl">
            <h1 className="text-4xl font-bold text-[var(--color-primary)] text-center mb-4">100 Challenges</h1>
            
            <div className="mb-8">
                <div
                    role="progressbar"
                    aria-valuenow={completedChallenges}
                    aria-valuemin={0}
                    aria-valuemax={totalChallenges}
                    aria-label={`Challenge progress: ${completedChallenges} of ${totalChallenges} completed`}
                    className="relative w-full h-8 bg-[var(--color-secondary)] rounded-sm border-2 border-[var(--color-text)] overflow-hidden shadow-inner"
                >
                    <div 
                        className="absolute top-0 left-0 h-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-bold text-lg text-[var(--color-bg)]" style={{ textShadow: '1px 1px 1px var(--color-text)'}}>
                            Level {completedChallenges} / {totalChallenges}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {TASKS.map(task => {
                    const isCompleted = user.completedTasks.includes(task.id);
                    const isUnlocked = task.id === 1 || user.completedTasks.includes(task.id - 1);
                    const isNext = !isCompleted && isUnlocked;

                    return (
                        <button
                            key={task.id}
                            onClick={() => handleSelectTask(task)}
                            disabled={!isUnlocked}
                            className={`aspect-square flex flex-col items-center justify-center p-2 rounded-sm text-center transition-all duration-300 border-2 border-[var(--color-text)]
                                ${isCompleted ? 'bg-green-300/80 text-green-900' : ''}
                                ${isNext ? 'bg-yellow-300/80 animate-pulse text-yellow-900' : ''}
                                ${!isUnlocked ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-[var(--color-secondary)] hover:bg-[var(--color-border)] hover:scale-105'}
                            `}
                        >
                            <span className="text-xl font-bold">{task.level}</span>
                            {isCompleted && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                             {!isUnlocked && (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 mt-1" viewBox="0 0 20 20" fill="currentColor"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ChallengeMode;
