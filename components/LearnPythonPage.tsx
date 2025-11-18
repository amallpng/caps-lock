import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User } from '../types';
import { PYTHON_CHALLENGES, PythonChallenge } from '../services/pythonChallengeService';
import Badge from './Badge';
import CoinIcon from './icons/CoinIcon';
import type { PyodideInterface } from 'pyodide';

// Dynamically import pyodide
const loadPyodideModule = () => import('pyodide');

type PyodideLoadingState = 'loading' | 'ready' | 'error';

const LearnPythonPage: React.FC<{ user: User; onUserUpdate: (user: User) => void; }> = ({ user, onUserUpdate }) => {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [pyodideLoadingState, setPyodideLoadingState] = useState<PyodideLoadingState>('loading');
    
    const [activeChallenge, setActiveChallenge] = useState<PythonChallenge | null>(null);
    const [userCode, setUserCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string>('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
    const [showRewardModal, setShowRewardModal] = useState<PythonChallenge | null>(null);

    const initializePyodide = useCallback(async () => {
        setPyodideLoadingState('loading');
        try {
            const { loadPyodide } = await loadPyodideModule();
            const pyodideInstance = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
            });
            setPyodide(pyodideInstance);
            setPyodideLoadingState('ready');
        } catch (error) {
            console.error("Failed to load Pyodide:", error);
            setPyodideLoadingState('error');
        }
    }, []);

    useEffect(() => {
        initializePyodide();
    }, [initializePyodide]);
    
    useEffect(() => {
        const currentLevel = user.pythonChallengeProgress?.currentLevel || 1;
        const challenge = PYTHON_CHALLENGES.find(c => c.level === currentLevel) || PYTHON_CHALLENGES[PYTHON_CHALLENGES.length - 1];
        setActiveChallenge(challenge);
        const savedCode = user.pythonChallengeProgress?.code?.[challenge.level];
        setUserCode(savedCode || challenge.initialCode || '');
    }, [user.pythonChallengeProgress?.currentLevel]);
    
    const handleCodeChange = (newCode: string) => {
        setUserCode(newCode);
        if (activeChallenge) {
            const updatedProgress = {
                ...user.pythonChallengeProgress,
                code: {
                    ...user.pythonChallengeProgress.code,
                    [activeChallenge.level]: newCode
                }
            };
            onUserUpdate({ ...user, pythonChallengeProgress: updatedProgress });
        }
    };
    
    const runCode = async (isSubmission: boolean) => {
        if (!pyodide || isExecuting || !activeChallenge) return;

        setIsExecuting(true);
        setConsoleOutput('');
        setFeedback(null);

        try {
            // Redirect stdout and stderr
            pyodide.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
                sys.stderr = io.StringIO()
            `);
            await pyodide.runPythonAsync(userCode);
            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            const stderr = pyodide.runPython("sys.stderr.getvalue()");
            
            const output = (stdout || '') + (stderr || '');
            setConsoleOutput(output);

            if (isSubmission) {
                const isCorrect = output.trim() === activeChallenge.expectedOutput.trim();
                if (isCorrect) {
                    handleCorrectSubmission(activeChallenge);
                } else {
                    setFeedback({ type: 'incorrect', message: `❌ Incorrect. We expected:\n${activeChallenge.expectedOutput}` });
                }
            }
        } catch (e: any) {
            setConsoleOutput(e.toString());
        } finally {
            setIsExecuting(false);
        }
    };

    const advanceToNextLevel = (completedLevel: number) => {
        const nextLevel = completedLevel + 1;
        if (nextLevel > PYTHON_CHALLENGES.length) {
            setActiveChallenge(null); // All challenges complete
            return;
        }
        const updatedProgress = {
            ...user.pythonChallengeProgress,
            currentLevel: nextLevel,
        };
        onUserUpdate({ ...user, pythonChallengeProgress: updatedProgress });
    };

    const handleCorrectSubmission = (challenge: PythonChallenge) => {
        setFeedback({ type: 'correct', message: '✅ Correct!' });
        
        const earnedCoins = challenge.coinReward || 0;
        const updatedUser = {
            ...user,
            coins: (user.coins || 0) + earnedCoins,
        };
        // Update user progress immediately, even if showing a modal
        const isAlreadyCompleted = user.pythonChallengeProgress.currentLevel > challenge.level;
        if (!isAlreadyCompleted) {
            const updatedProgress = {
                ...user.pythonChallengeProgress,
                currentLevel: Math.min(PYTHON_CHALLENGES.length + 1, challenge.level + 1),
            };
            updatedUser.pythonChallengeProgress = updatedProgress;
        }

        onUserUpdate(updatedUser);

        if (challenge.badge) {
            setShowRewardModal(challenge);
        } else {
            setTimeout(() => {
                advanceToNextLevel(challenge.level);
            }, 1500);
        }
    };

    const handleCloseRewardModal = () => {
        const lastChallengeLevel = showRewardModal!.level;
        setShowRewardModal(null);
        advanceToNextLevel(lastChallengeLevel);
    };

    if (user.isGuest || !user.isChallengeParticipant) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Access Denied</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">This Python course is a special feature for registered participants. Please sign up if you wish to access it.</p>
            </div>
        );
    }

    if (pyodideLoadingState === 'loading') {
        return (
            <div className="w-full flex flex-col items-center justify-center p-8 text-center">
                <svg className="animate-spin h-12 w-12 text-[var(--color-primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <h2 className="text-2xl font-bold text-[var(--color-primary)]">Initializing Python Environment...</h2>
                <p className="text-[var(--color-text-muted)]">This may take a moment.</p>
            </div>
        );
    }
    
    if (pyodideLoadingState === 'error') {
        return (
            <div className="w-full max-w-xl bg-red-500/10 p-8 rounded-sm border-2 border-dashed border-red-500/50 flex flex-col items-center gap-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[var(--color-error)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <h2 className="text-3xl font-bold text-[var(--color-error)]">Environment Failed to Load</h2>
                <p className="text-lg text-red-800/80 leading-relaxed">We couldn't initialize the interactive Python environment. This can happen due to network issues or a firewall blocking resources. Please check your connection and try again.</p>
                <button onClick={initializePyodide} className="btn-vintage bg-[var(--color-error)] font-bold py-3 px-6 rounded-sm text-lg">Retry</button>
            </div>
        );
    }


    return (
        <>
        {showRewardModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl text-center">
                    <h2 className="text-3xl font-bold text-yellow-600">Challenge Complete!</h2>
                    {showRewardModal.badge && <><p className="text-lg text-[var(--color-text-muted)]">You've unlocked a new badge!</p><div className="my-4 inline-block"><Badge task={showRewardModal as any} isPulsing={true} /></div></>}
                    {showRewardModal.coinReward > 0 && <div className="text-2xl font-bold text-yellow-600 animate-fade-in flex items-center justify-center gap-2"><CoinIcon className="h-8 w-8" />+ {showRewardModal.coinReward} Coins!</div>}
                    <button onClick={handleCloseRewardModal} className="mt-8 w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg">Continue</button>
                </div>
            </div>
        )}
        <div className="w-full h-[80vh] flex flex-col md:flex-row gap-4">
            {/* Left Pane: Instructions */}
            <div className="w-full md:w-1/2 lg:w-2/5 bg-[var(--color-secondary)]/30 p-4 rounded-sm border border-[var(--color-border)] flex flex-col gap-4">
                {activeChallenge ? (
                    <div className="flex-1 flex flex-col overflow-y-auto pr-2">
                        <h1 className="text-2xl font-bold text-[var(--color-primary)]">{activeChallenge.level}. {activeChallenge.title}</h1>
                        <p className="mt-2 text-[var(--color-text-muted)] whitespace-pre-wrap leading-relaxed">{activeChallenge.explanation}</p>
                        <h3 className="text-xl font-bold mt-4 text-[var(--color-text)]">Your Task</h3>
                        <p className="mt-1 text-[var(--color-text-muted)] whitespace-pre-wrap">{activeChallenge.task}</p>
                        {activeChallenge.expectedOutput && (
                            <>
                                <h3 className="text-xl font-bold mt-4 text-[var(--color-text)]">Expected Output</h3>
                                <pre className="mt-1 bg-gray-800 text-white p-3 rounded-sm text-sm font-mono whitespace-pre-wrap overflow-x-auto"><code>{activeChallenge.expectedOutput}</code></pre>
                            </>
                        )}
                    </div>
                ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                         <h1 className="text-3xl font-bold text-green-600">Congratulations!</h1>
                         <p className="text-lg mt-2 text-[var(--color-text-muted)]">You have completed all the Python challenges. You are a true Python Hero!</p>
                     </div>
                )}
            </div>

            {/* Right Pane: Editor and Console */}
            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-4">
                <div className="flex-1 flex flex-col">
                    <label htmlFor="code-editor" className="sr-only">Code Editor</label>
                    <textarea
                        id="code-editor"
                        value={userCode}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        className="w-full flex-1 bg-[var(--color-bg)] text-[var(--color-text)] p-4 rounded-t-sm border-2 border-b-0 border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-mono text-base resize-none leading-relaxed"
                        placeholder="Write your Python code here..."
                        spellCheck="false"
                        disabled={isExecuting || !activeChallenge}
                    />
                     {feedback && (
                        <div className={`p-2 text-center font-bold border-x-2 border-[var(--color-border)] whitespace-pre-wrap ${feedback.type === 'correct' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                           {feedback.message}
                        </div>
                     )}
                    <pre className={`w-full h-32 bg-gray-800 text-white font-mono text-sm p-4 overflow-y-auto border-x-2 border-[var(--color-border)] ${!feedback ? 'rounded-b-sm border-b-2' : ''}`}>
                        <code>{consoleOutput || '// Console output will appear here'}</code>
                    </pre>
                   
                </div>
                 <div className="flex gap-4">
                    <button
                        onClick={() => runCode(false)}
                        disabled={isExecuting || !activeChallenge}
                        className="flex-1 bg-transparent text-[var(--color-text-muted)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-border)] hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Run Code
                    </button>
                    <button
                        onClick={() => runCode(true)}
                        disabled={isExecuting || !activeChallenge}
                        className="flex-1 btn-vintage bg-green-700 font-bold py-2 px-4 rounded-sm disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default LearnPythonPage;
