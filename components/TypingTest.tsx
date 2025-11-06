import React, { useState, useEffect, useCallback, useRef } from 'react';
import useTypingGame from '../hooks/useTypingGame';
import { generateText } from '../services/textService';
import { Difficulty, User } from '../types';
import Results from './Results';
import { updateUserAfterTest } from '../utils/statsUpdater';
import CustomTimeModal from './CustomTimeModal';

type CharStyle = {
  transform: string;
  opacity: number;
};

const TypeArea = ({ textToType, typedText, charStyles }: { textToType: string, typedText: string, charStyles: CharStyle[] }) => {
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
            className = 'text-[var(--color-text-muted)] opacity-75';
        }
        
        return (
            <span key={index} style={style} className={`inline-block ${className}`}>
                {char}
            </span>
        );
    });

    return (
        <div className="text-2xl md:text-3xl tracking-wider p-6 bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-sm select-none leading-loose break-words shadow-inner">
             <p style={{ whiteSpace: 'pre-wrap' }}>
                {fullTextChars}
            </p>
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
    const [isCustomTimeModalOpen, setIsCustomTimeModalOpen] = useState(false);
    const [text, setText] = useState(() => generateText(difficulty, timeOption));
    const [charStyles, setCharStyles] = useState<CharStyle[]>([]);
    
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
            // Do not interfere if user is typing in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
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
    }, [handleKeyDown, status]);

    const generateNewText = useCallback(() => {
        const newText = generateText(difficulty, timeOption);
        setText(newText);
        
        const styles = newText.split('').map(() => ({
            transform: `rotate(${(Math.random() - 0.5) * 2.5}deg) translateY(${(Math.random() - 0.5) * 2}px)`,
            opacity: Math.random() * 0.15 + 0.85,
        }));
        setCharStyles(styles);

        reset();
    }, [difficulty, timeOption, reset]);
    
    useEffect(() => {
        generateNewText();
    }, [difficulty, timeOption, generateNewText]);

    const difficultyOptions: { value: Difficulty, label: string }[] = [
        { value: Difficulty.Easy, label: 'Easy' },
        { value: Difficulty.Medium, label: 'Medium' },
        { value: Difficulty.Hard, label: 'Hard' },
    ];

    const presetTimeOptions = [15, 30, 60, 120];
    const isCustomTime = !presetTimeOptions.includes(timeOption);

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
                             {presetTimeOptions.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setTimeOption(time)}
                                    className={`px-3 py-1 transition-colors ${!isCustomTime && timeOption === time ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                                >
                                    {time}s
                                </button>
                            ))}
                            <button
                                onClick={() => setIsCustomTimeModalOpen(true)}
                                className={`px-3 py-1 transition-colors ${isCustomTime ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}
                            >
                                {isCustomTime ? `${timeOption}s` : 'Custom'}
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <TypeArea textToType={textToType} typedText={typedText} charStyles={charStyles} />
                        <div className="flex justify-between items-center mt-4 text-2xl font-bold text-[var(--color-text-muted)]">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 4 23 10 17 10" />
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className="text-[var(--color-text-muted)] text-lg">Start typing to begin the test...</p>
                </>
            ) : (
                <Results stats={stats} onRestart={generateNewText} />
            )}

            {isCustomTimeModalOpen && (
                <CustomTimeModal
                    initialTime={isCustomTime ? timeOption : 45}
                    onClose={() => setIsCustomTimeModalOpen(false)}
                    onSave={(newTime) => {
                        setTimeOption(newTime);
                        setIsCustomTimeModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default TypingTest;