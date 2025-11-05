import React, { useState, useEffect, useCallback } from 'react';
import { TASKS } from '../services/challengeService';
import { User, Task } from '../types';
import useTypingGame from '../hooks/useTypingGame';
import Results from './Results';
import Badge from './Badge';
import { updateUserAfterTest } from '../utils/statsUpdater';
import Certificate from './Certificate';

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
    const [showCompletionCertificate, setShowCompletionCertificate] = useState(false);


    const { status, typedText, textToType, wpm, handleKeyDown, stats, reset } = useTypingGame(activeTask?.text || '', 999);

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
            const performanceUpdates = updateUserAfterTest(user, stats);
            const updatedUser = { 
                ...user,
                ...performanceUpdates,
                completedTasks: [...user.completedTasks, activeTask.id].sort((a, b) => a - b)
             };
            onUserUpdate(updatedUser);
            setShowBadge(activeTask);
        }
    }, [activeTask, stats, user, onUserUpdate]);


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
    }, [handleKeyDown, activeTask, status, typedText, textToType]);

    const handleRestart = () => {
        setShowBadge(null);
        if (activeTask) {
            const passed = stats.wpm >= activeTask.wpmGoal && stats.accuracy >= activeTask.accuracyGoal;
            if (passed) {
                if (activeTask.id === TASKS.length) {
                    setShowCompletionCertificate(true);
                    return;
                }
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

    if (showCompletionCertificate) {
        return (
            <div className="w-full max-w-4xl flex flex-col items-center gap-6 text-center animate-fade-in">
                <h1 className="text-4xl font-bold text-yellow-600">CHALLENGE COMPLETE!</h1>
                <p className="text-xl text-[var(--color-text-muted)]">
                    You have conquered all 100 challenges. As a testament to your dedication and skill, you have been awarded the Certificate of Achievement.
                </p>
                <Certificate />
                <button
                    onClick={() => {
                        setShowCompletionCertificate(false);
                        setActiveTask(null);
                    }}
                    className="mt-4 btn-vintage font-bold py-3 px-6 rounded-sm text-xl"
                >
                    Return to Challenge Map
                </button>
            </div>
        );
    }

    if (showBadge) {
        return (
            <div className="w-full max-w-2xl flex flex-col items-center gap-6 text-center">
                <h2 className="text-4xl font-bold text-yellow-600">Badge Unlocked!</h2>
                <div className="bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] rounded-lg p-4">
                  <Badge task={showBadge} />
                </div>
                 <Results
                    stats={stats}
                    onRestart={handleRestart}
                    challengeInfo={{
                        wpmGoal: showBadge.wpmGoal,
                        accuracyGoal: showBadge.accuracyGoal,
                        passed: true,
                    }}
                />
            </div>
        );
    }
    
    if (activeTask) {
        return (
            <div className="w-full max-w-4xl flex flex-col items-center gap-6">
                 <button onClick={() => setActiveTask(null)} className="self-start text-[var(--color-primary)] hover:underline">&larr; Back to Challenges</button>
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
                        challengeInfo={{
                            wpmGoal: activeTask.wpmGoal,
                            accuracyGoal: activeTask.accuracyGoal,
                            passed: stats.wpm >= activeTask.wpmGoal && stats.accuracy >= activeTask.accuracyGoal,
                        }}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl">
            <h1 className="text-4xl font-bold text-[var(--color-primary)] text-center mb-8">100 Challenges</h1>
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