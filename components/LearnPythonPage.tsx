import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { PYTHON_CHALLENGES, PythonChallenge } from '../services/pythonChallengeService';
import Badge from './Badge';
import CoinIcon from './icons/CoinIcon';

// This is a simplified icon for the loading screen.
const PythonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 15.5C15 15.5 15 18.5 12 18.5C9 18.5 9 15.5 9 15.5C9 15.5 6 15.5 6 12.5C6 9.5 9 9.5 9 9.5M15 15.5C15 15.5 18 15.5 18 12.5C18 9.5 15 9.5 15 9.5M9 9.5C9 9.5 9 6.5 12 6.5C15 6.5 15 9.5 15 9.5" stroke="#4A6B69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="6" r="1.5" fill="#FFD43B"/>
        <circle cx="12" cy="19" r="1.5" fill="#387EB8"/>
    </svg>
);


interface LearnPythonPageProps {
    user: User;
    onUserUpdate: (user: User) => void;
}

const LearnPythonPage: React.FC<LearnPythonPageProps> = ({ user, onUserUpdate }) => {
    const [pyodide, setPyodide] = useState<any>(null);
    const [pyodideState, setPyodideState] = useState<'loading' | 'ready' | 'error'>('loading');

    const [activeChallenge, setActiveChallenge] = useState<PythonChallenge | null>(null);
    const [code, setCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string>('Welcome to the Python console! Click "Run Code" to see your output here.');
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    
    const [showRewardModal, setShowRewardModal] = useState<PythonChallenge | null>(null);
    
    const consoleEndRef = useRef<HTMLDivElement>(null);

    // Scroll console to bottom on new output
    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [consoleOutput]);


    const loadPyodideEnv = async () => {
        try {
            setPyodideState('loading');
            const { loadPyodide } = await import('pyodide');
            const pyodideInstance = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
            });
            // Redirect stdout to a variable we can access
            pyodideInstance.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);
            setPyodide(pyodideInstance);
            setPyodideState('ready');
        } catch (err) {
            console.error("Failed to load Pyodide environment", err);
            setPyodideState('error');
        }
    };

    // Load pyodide on mount
    useEffect(() => {
        loadPyodideEnv();
    }, []);

    // Set initial challenge
    useEffect(() => {
        if (pyodideState === 'ready' && user?.pythonChallengeProgress) {
            const currentLevel = user.pythonChallengeProgress.currentLevel || 1;
            const challenge = PYTHON_CHALLENGES.find(c => c.level === currentLevel) || PYTHON_CHALLENGES[0];
            setActiveChallenge(challenge);
            setCode(user.pythonChallengeProgress.code[challenge.level] || challenge.initialCode);
        }
    }, [pyodideState, user]);

    const handleSelectChallenge = (challenge: PythonChallenge) => {
        if (challenge.level > (user.pythonChallengeProgress.currentLevel || 1)) return;
        setActiveChallenge(challenge);
        setCode(user.pythonChallengeProgress.code[challenge.level] || challenge.initialCode);
        setConsoleOutput(`Switched to Challenge ${challenge.level}: ${challenge.title}`);
        setSubmissionStatus('idle');
    };

    const runCode = async (codeToRun: string): Promise<{ stdout: string; error: string | null }> => {
        if (!pyodide) return { stdout: '', error: 'Python environment not ready.' };
        try {
            pyodide.runPython("sys.stdout = io.StringIO()"); // Clear previous output
            await pyodide.runPythonAsync(codeToRun);
            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            return { stdout, error: null };
        } catch (err: any) {
            return { stdout: '', error: err.message };
        }
    };
    
    const handleRunClick = async () => {
        setSubmissionStatus('idle');
        const result = await runCode(code);
        if (result.error) {
            setConsoleOutput(`❌ Error:\n${result.error}`);
        } else {
            setConsoleOutput(`> ${result.stdout}`);
        }
    };

    const handleSubmission = async () => {
        if (!activeChallenge) return;
        const result = await runCode(code);
        
        if (result.error) {
            setConsoleOutput(`❌ Error on submission:\n${result.error}`);
            setSubmissionStatus('incorrect');
            return;
        }

        const normalizedStdout = result.stdout.trim().replace(/\r\n/g, '\n');
        const normalizedExpectedOutput = activeChallenge.expectedOutput.trim().replace(/\r\n/g, '\n');

        if (normalizedStdout === normalizedExpectedOutput) {
            setConsoleOutput(`> ${result.stdout}\n✅ Correct! Well done.`);
            setSubmissionStatus('correct');
            handleCorrectSubmission();
        } else {
            setConsoleOutput(`> ${result.stdout}\n❌ Incorrect. The output did not match the expected result.\n\nExpected:\n${normalizedExpectedOutput}`);
            setSubmissionStatus('incorrect');
        }
    };
    
    const handleCorrectSubmission = () => {
        if (!activeChallenge) return;

        const earnedCoins = activeChallenge.coinReward || 0;
        const isBadgeChallenge = !!activeChallenge.badge;
        const nextLevel = activeChallenge.level + 1;

        const updatedProgress = {
            ...user.pythonChallengeProgress,
            currentLevel: Math.min(PYTHON_CHALLENGES.length + 1, Math.max(user.pythonChallengeProgress.currentLevel, nextLevel)),
            code: { ...user.pythonChallengeProgress.code, [activeChallenge.level]: code }
        };

        const updatedUser = {
            ...user,
            pythonChallengeProgress: updatedProgress,
            coins: (user.coins || 0) + earnedCoins
        };
        onUserUpdate(updatedUser);

        setTimeout(() => {
            if (isBadgeChallenge) {
                setShowRewardModal(activeChallenge);
            } else {
                const nextChallenge = PYTHON_CHALLENGES.find(c => c.level === nextLevel);
                if (nextChallenge) {
                    handleSelectChallenge(nextChallenge);
                } else {
                    setActiveChallenge(null);
                    setConsoleOutput('🎉 Congratulations! You have completed all Python challenges!');
                }
            }
        }, 1500); // Wait 1.5s before moving on
    };
    
    const handleCloseRewardModal = () => {
        const lastChallenge = showRewardModal;
        setShowRewardModal(null);
        if (lastChallenge) {
            const nextChallenge = PYTHON_CHALLENGES.find(c => c.level === (lastChallenge.level + 1));
            if (nextChallenge) {
                handleSelectChallenge(nextChallenge);
            } else {
                 setActiveChallenge(null);
                 setConsoleOutput('🎉 Congratulations! You have completed all Python challenges!');
            }
        }
    };
    
    if (user.isGuest || !user.isChallengeParticipant) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Access Denied</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    This Python course is a special feature for registered participants. Please sign up if you wish to access it.
                </p>
            </div>
        );
    }
    
    if (pyodideState === 'loading') {
        return (
             <div className="w-full max-w-xl flex flex-col items-center gap-6 text-center p-8">
                <PythonIcon className="h-24 w-24 animate-pulse" />
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Preparing Environment...</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    The Python interpreter is loading. This might take a moment, especially on the first visit.
                </p>
            </div>
        );
    }
    
    if (pyodideState === 'error') {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-error)] flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-[var(--color-error)]">Environment Error</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    The Python interpreter failed to load. This is usually caused by a network issue. Please check your internet connection and try again.
                </p>
                <button onClick={loadPyodideEnv} className="btn-vintage font-bold py-3 px-6 rounded-sm text-xl">
                    Retry Loading
                </button>
            </div>
        );
    }


    return (
        <>
        {showRewardModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
                 <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl text-center">
                    <h2 className="text-3xl font-bold text-yellow-600">Challenge Complete!</h2>
                    {showRewardModal.badge && (
                        <>
                            <p className="text-lg text-[var(--color-text-muted)]">You've unlocked a new badge!</p>
                            <div className="my-4 inline-block">
                                <Badge task={showRewardModal as any} isPulsing={true} />
                            </div>
                        </>
                    )}
                    {showRewardModal.coinReward > 0 && (
                        <div className="text-2xl font-bold text-yellow-600 animate-fade-in flex items-center justify-center gap-2">
                            <CoinIcon className="h-8 w-8" />
                            + {showRewardModal.coinReward} Coins!
                        </div>
                    )}
                    <button onClick={handleCloseRewardModal} className="mt-8 w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg">
                        Continue
                    </button>
                </div>
            </div>
        )}
        <div className="w-full max-w-full mx-auto flex flex-col lg:flex-row gap-4 h-[80vh]">
            {/* Left Panel: Instructions & Levels */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="bg-[var(--color-secondary)]/30 p-4 rounded-sm border border-[var(--color-border)]">
                    <h2 className="text-lg font-bold text-center mb-2 text-[var(--color-primary)]">Levels</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {PYTHON_CHALLENGES.map(challenge => {
                            const isCompleted = challenge.level < (user.pythonChallengeProgress.currentLevel || 1);
                            const isActive = challenge.level === activeChallenge?.level;
                            const isLocked = challenge.level > (user.pythonChallengeProgress.currentLevel || 1);
                            return (
                                <button
                                    key={challenge.level}
                                    onClick={() => handleSelectChallenge(challenge)}
                                    disabled={isLocked}
                                    className={`aspect-square flex items-center justify-center p-2 rounded-sm text-lg font-bold transition-colors border-2 ${
                                        isActive ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-text)] scale-110' :
                                        isCompleted ? 'bg-green-300/80 text-green-900 border-green-800/50 hover:bg-green-300' :
                                        isLocked ? 'bg-gray-400 opacity-50 cursor-not-allowed border-gray-600' :
                                        'bg-[var(--color-bg)] border-[var(--color-border)] hover:bg-[var(--color-secondary)]'
                                    }`}
                                >
                                    {challenge.level}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)] overflow-y-auto">
                    {activeChallenge ? (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                                {activeChallenge.level}. {activeChallenge.title}
                            </h1>
                            <p className="text-[var(--color-text-muted)] whitespace-pre-wrap leading-relaxed">{activeChallenge.explanation}</p>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--color-text)]">Your Task</h3>
                                <p className="mt-1 text-[var(--color-text-muted)] whitespace-pre-wrap">{activeChallenge.task}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h1 className="text-2xl font-bold text-yellow-600">All Challenges Completed!</h1>
                            <p className="mt-2 text-[var(--color-text-muted)]">You are a true Python Hero!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Editor & Console */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4 h-full">
                <div className="flex-1 flex flex-col bg-[var(--color-bg)] rounded-sm border-2 border-[var(--color-border)] overflow-hidden">
                    <h2 className="text-lg font-bold p-2 bg-[var(--color-secondary)]/50 border-b-2 border-[var(--color-border)] text-[var(--color-primary)]">Code Editor</h2>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full flex-1 p-4 bg-[#282c34] text-white font-mono text-base resize-none focus:outline-none"
                        placeholder="Write your Python code here..."
                        spellCheck="false"
                        disabled={!activeChallenge}
                    />
                </div>
                 <div className="flex items-center gap-4">
                    <button onClick={handleRunClick} disabled={!activeChallenge} className="flex-1 btn-vintage py-2 px-4 rounded-sm text-lg font-bold disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">Run Code</button>
                    <button onClick={handleSubmission} disabled={!activeChallenge || submissionStatus === 'correct'} className="flex-1 btn-vintage bg-green-700 py-2 px-4 rounded-sm text-lg font-bold disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">Submit Answer</button>
                </div>
                <div className="h-48 flex flex-col bg-gray-800 rounded-sm border-2 border-[var(--color-border)] overflow-hidden">
                     <h2 className="text-lg font-bold p-2 bg-gray-700 border-b-2 border-[var(--color-border)] text-gray-300">Console</h2>
                     <pre className="flex-1 p-4 text-white text-sm font-mono whitespace-pre-wrap overflow-y-auto">
                        <code className={
                            submissionStatus === 'correct' ? 'text-green-400' :
                            submissionStatus === 'incorrect' ? 'text-red-400' : ''
                        }>
                            {consoleOutput}
                        </code>
                        <div ref={consoleEndRef} />
                     </pre>
                </div>
            </div>
        </div>
        </>
    );
};

export default LearnPythonPage;
