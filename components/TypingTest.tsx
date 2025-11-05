import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import useTypingGame from '../hooks/useTypingGame';
import { getText } from '../services/textService';
import { Difficulty, User } from '../types';
import Results from './Results';
import { updateUserAfterTest } from '../utils/statsUpdater';


const TypeArea = ({ textToType, typedText }: { textToType: string, typedText: string }) => {
    return (
        <div className="relative text-2xl md:text-3xl tracking-wider p-6 bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-sm select-none leading-loose break-all shadow-inner">
             <p className="text-[var(--color-text-muted)] opacity-75">
                {textToType}
            </p>
            <div className="absolute top-0 left-0 p-6">
                <p>
                    {typedText.split('').map((char, index) => {
                        const isCorrect = char === textToType[index];
                        return <span key={index} className={isCorrect ? 'text-[var(--color-text)]' : 'text-[var(--color-error)] line-through bg-[var(--color-error)]/10'}>{textToType[index]}</span>;
                    })}
                    <span className="caret -mb-1 h-7"></span>
                </p>
            </div>
        </div>
    );
};

interface TypingTestProps {
    user: User;
    onUserUpdate: (user: User) => void;
}

const TypingTest: React.FC<TypingTestProps> = ({ user, onUserUpdate }) => {
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
    const [timeOption, setTimeOption] = useState(60);
    const [text, setText] = useState(() => getText(difficulty));
    
    const { status, typedText, textToType, timeLeft, wpm, handleKeyDown, stats, reset } = useTypingGame(text, timeOption);
    const prevStatusRef = useRef(status);

    useEffect(() => {
        if (status === 'finished' && prevStatusRef.current !== 'finished') {
             if (stats.wpm > 0) {
                const updatedStats = updateUserAfterTest(user, stats);
                onUserUpdate({ ...user, ...updatedStats });
            }
        }
        prevStatusRef.current = status;
    }, [status, stats, user, onUserUpdate]);


    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab' || e.key === 'Enter') { 
                return;
            }
            if (e.key.match(/^[a-zA-Z0-9 `~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/) || e.key === ' ' || e.key === 'Backspace') {
                 e.preventDefault();
                 handleKeyDown(e.key);
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleKeyDown, status, typedText, textToType]);

    const generateNewText = useCallback(() => {
        setText(getText(difficulty));
        reset();
    }, [difficulty, reset]);
    
    useEffect(() => {
        generateNewText();
    }, [difficulty, timeOption, generateNewText]);


    const difficultyOptions: { value: Difficulty, label: string }[] = [
        { value: Difficulty.Easy, label: 'Easy' },
        { value: Difficulty.Medium, label: 'Medium' },
        { value: Difficulty.Hard, label: 'Hard' },
    ];

    const timeOptions = [15, 30, 60, 120];

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">Practice Mode</h1>
            
            {status !== 'finished' ? (
                <>
                    <div className="flex flex-wrap justify-center gap-4 text-lg border-y-2 border-dotted border-[var(--color-border)] py-4">
                        <div className="flex items-center gap-2 p-2">
                            <span className="font-semibold text-[var(--color-text-muted)]">Difficulty:</span>
                            {difficultyOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setDifficulty(opt.value)}
                                    className={`px-3 py-1 transition-colors ${difficulty === opt.value ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 p-2">
                            <span className="font-semibold text-[var(--color-text-muted)]">Time:</span>
                             {timeOptions.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setTimeOption(time)}
                                    className={`px-3 py-1 transition-colors ${timeOption === time ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                                >
                                    {time}s
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full">
                         <div className="flex justify-between items-center mb-4 text-2xl font-bold text-[var(--color-text-muted)]">
                            <div className="flex items-center gap-6 p-3 bg-[var(--color-secondary)]/50 rounded-sm border border-[var(--color-border)]">
                                <div>
                                    Time: <span className="text-[var(--color-text)] w-12 inline-block text-center">{status === 'started' ? timeLeft : timeOption}</span>
                                </div>
                                <div className="border-l border-[var(--color-border)] h-8"></div>
                                <div>
                                    WPM: <span className="text-[var(--color-text)] w-12 inline-block text-center">{wpm}</span>
                                </div>
                            </div>
                            <button onClick={generateNewText} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-2 rounded-full hover:bg-[var(--color-secondary)]/50" aria-label="New test">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5m-5 2a9 9 0 0012.55 7.22M20 4v5h-5m5-2a9 9 0 00-12.55-7.22" transform="rotate(120 12 12)"/></svg>
                            </button>
                        </div>
                        <TypeArea textToType={textToType} typedText={typedText} />
                    </div>

                    <p className="text-[var(--color-text-muted)] text-lg">Start typing to begin the test...</p>
                </>
            ) : (
                <Results stats={stats} onRestart={generateNewText} />
            )}
        </div>
    );
};

export default TypingTest;
