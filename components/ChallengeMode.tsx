import React, { useState, useEffect, useCallback, useContext } from 'react';
import { TASKS } from '../services/challengeService';
import { User, Task } from '../types';
import useTypingGame from '../hooks/useTypingGame';
import Results from './Results';
import Badge from './Badge';
import { updateUserAfterTest } from '../utils/statsUpdater';
import { playSound } from '../services/soundService';
import { SettingsContext } from '../contexts/SettingsContext';


const TypeAreaChallenge = ({ textToType, typedText }: { textToType: string, typedText: string }) => {
    return (
        <div className="relative text-xl md:text-2xl tracking-wider p-4 bg-[#F1EFE9] border-2 border-[#A9A391] rounded-sm select-none leading-loose break-all shadow-inner">
            <p className="text-gray-400 opacity-80">
                {textToType}
            </p>
            <div className="absolute top-0 left-0 p-4">
                <p>
                     {typedText.split('').map((char, index) => {
                        const isCorrect = char === textToType[index];
                        return <span key={index} className={isCorrect ? 'text-[#282828]' : 'text-[#9A3B3B] line-through bg-red-500/10'}>{textToType[index]}</span>;
                    })}
                    <span className="caret h-6"></span>
                </p>
            </div>
        </div>
    );
};


const ChallengeMode: React.FC<{ user: User; onUserUpdate: (user: User) => void; }> = ({ user, onUserUpdate }) => {
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [showBadge, setShowBadge] = useState<Task | null>(null);

    // FIX: Get sound settings and create a memoized sound player function.
    const { settings } = useContext(SettingsContext);
    const soundPlayer = useCallback((sound: 'keyPress' | 'error' | 'complete' | 'challenge') => {
        if (settings.soundEnabled) {
            playSound(sound);
        }
    }, [settings.soundEnabled]);

    const { status, typedText, textToType, wpm, handleKeyDown, stats, reset } = useTypingGame(activeTask?.text || '', 999, soundPlayer);

    const handleSelectTask = (task: Task) => {
        const isUnlocked = task.id === 1 || user.completedTasks.includes(task.id - 1);
        if (isUnlocked && !user.completedTasks.includes(task.id)) {
            setActiveTask(task);
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
            // FIX: Play a special sound for passing a challenge.
            soundPlayer('challenge');
        }
    }, [activeTask, stats, user, onUserUpdate, soundPlayer]);


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
                <div className="bg-gray-800/50 rounded-lg p-4">
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
                 <button onClick={() => setActiveTask(null)} className="self-start text-[#4A6B69] hover:underline">&larr; Back to Challenges</button>
                 <h2 className="text-3xl font-bold">Level {activeTask.level}: {activeTask.badge.name}</h2>
                {status !== 'finished' ? (
                     <>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-lg w-full bg-[#D3CFC2]/50 p-4 rounded-sm border-y border-dashed border-[#A9A391]">
                           <p>WPM Goal: <span className="font-bold text-[#4A6B69]">{activeTask.wpmGoal}</span></p>
                           <div className="border-l border-[#A9A391] h-6 hidden sm:block"></div>
                           <p>Accuracy Goal: <span className="font-bold text-[#4A6B69]">{activeTask.accuracyGoal}%</span></p>
                           <div className="border-l border-[#A9A391] h-6 hidden sm:block"></div>
                           <p>Current WPM: <span className="font-bold text-[#282828]">{wpm}</span></p>
                        </div>
                        <TypeAreaChallenge textToType={textToType} typedText={typedText} />
                        <p className="text-gray-500">Start typing to begin...</p>
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
            <h1 className="text-4xl font-bold text-[#4A6B69] text-center mb-8">100 Challenges</h1>
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
                            className={`aspect-square flex flex-col items-center justify-center p-2 rounded-sm text-center transition-all duration-300 border-2 border-[#282828]
                                ${isCompleted ? 'bg-green-300/80' : ''}
                                ${isNext ? 'bg-yellow-300/80 animate-pulse' : ''}
                                ${!isUnlocked ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-[#D3CFC2] hover:bg-[#A9A391] hover:scale-105'}
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