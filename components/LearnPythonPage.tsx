import React, { useState, useEffect, useCallback } from 'react';
import { loadPyodide } from 'pyodide';
import { User } from '../types';
import { PYTHON_CHALLENGES, PythonChallenge } from '../services/pythonChallengeService';
import Badge from './Badge';
import CoinIcon from './icons/CoinIcon';

interface LearnPythonPageProps {
    user: User;
    onUserUpdate: (user: User) => void;
}

const LearnPythonPage: React.FC<LearnPythonPageProps> = ({ user, onUserUpdate }) => {
    const [pyodide, setPyodide] = useState<any | null>(null);
    const [pyodideStatus, setPyodideStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [activeChallenge, setActiveChallenge] = useState<PythonChallenge | null>(null);
    const [userCode, setUserCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showRewardModal, setShowRewardModal] = useState<PythonChallenge | null>(null);

    const initPyodide = useCallback(async () => {
        setPyodideStatus('loading');
        setConsoleOutput([]); // Clear console on new attempt
        try {
            const pyodideInstance = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
            });
            setPyodide(pyodideInstance);
            setPyodideStatus('ready');
        } catch (error) {
            console.error("Failed to load Pyodide:", error);
            setPyodideStatus('error');
        }
    }, []);

    useEffect(() => {
        // On initial mount, load pyodide.
        // It won't re-run on its own because initPyodide is memoized.
        initPyodide();
    }, [initPyodide]);

    useEffect(() => {
        if (user && user.pythonChallengeProgress && pyodideStatus === 'ready') {
            // Fix for users who completed all levels
            const totalChallenges = PYTHON_CHALLENGES.length;
            let currentLevel = user.pythonChallengeProgress.currentLevel || 1;
            if (currentLevel > totalChallenges) {
                currentLevel = totalChallenges;
            }

            const challenge = PYTHON_CHALLENGES.find(c => c.level === currentLevel);
            
            if (challenge) {
                setActiveChallenge(challenge);
                const savedCode = user.pythonChallengeProgress.code?.[challenge.level];
                setUserCode(savedCode || challenge.initialCode);
            }
        }
    }, [user, pyodideStatus]);
    
    const handleSelectChallenge = (challenge: PythonChallenge) => {
        if (challenge.level > (user.pythonChallengeProgress.currentLevel || 1)) {
            return; // Don't allow skipping ahead
        }
        setActiveChallenge(challenge);
        const savedCode = user.pythonChallengeProgress.code?.[challenge.level];
        setUserCode(savedCode || challenge.initialCode);
        setConsoleOutput([]);
    };

    const runCode = async (codeToRun: string): Promise<{ output: string[], error: string | null }> => {
        if (!pyodide) {
            return { output: [], error: "Python interpreter is not ready." };
        }

        let capturedOutput: string[] = [];
        let errorOutput: string | null = null;
        
        pyodide.setStdout({ batched: (str: string) => capturedOutput.push(str) });
        pyodide.setStderr({ batched: (str: string) => errorOutput = (errorOutput || '') + str });

        try {
            await pyodide.runPythonAsync(codeToRun);
        } catch (e: any) {
            errorOutput = e.message;
        } finally {
             pyodide.setStdout({});
             pyodide.setStderr({});
        }
        
        return { output: capturedOutput, error: errorOutput };
    };

    const handleRun = async () => {
        setIsRunning(true);
        setConsoleOutput(['Running your code...']);
        const { output, error } = await runCode(userCode);
        if (error) {
            setConsoleOutput([`Error: ${error}`]);
        } else {
            setConsoleOutput(output.length > 0 ? output : ['Code executed without errors.']);
        }
        setIsRunning(false);
    };

    const handleSubmit = async () => {
        if (!activeChallenge) return;
        
        setIsRunning(true);
        setConsoleOutput(['Running tests...']);

        const results = [];
        let allTestsPassed = true;

        for (const testCase of activeChallenge.testCases) {
            const fullCode = `${userCode}\n${testCase.testCode || 'pass'}`;
            const { output, error } = await runCode(fullCode);

            const finalOutput = output.join('\n').trim();
            const passed = !error && finalOutput === testCase.expectedOutput;
            
            if (!passed) {
                allTestsPassed = false;
            }
            results.push({ ...testCase, passed, actualOutput: error ? `Error: ${error}` : finalOutput });
        }
        
        const resultOutput = results.map(r => 
            `Test: ${r.description} - ${r.passed ? 'PASSED ✅' : 'FAILED ❌'}\n` +
            (!r.passed ? `  Expected: "${r.expectedOutput}"\n  Got:      "${r.actualOutput}"\n` : '')
        );
        setConsoleOutput(resultOutput);

        if (allTestsPassed) {
             const earnedCoins = activeChallenge.coinReward || 0;
             const isBadgeChallenge = !!activeChallenge.badge;

             const updatedProgress = {
                ...user.pythonChallengeProgress,
                currentLevel: Math.max(user.pythonChallengeProgress.currentLevel, activeChallenge.level + 1),
                code: {
                    ...user.pythonChallengeProgress.code,
                    [activeChallenge.level]: userCode,
                }
             };

             const updatedUser = {
                ...user,
                pythonChallengeProgress: updatedProgress,
                coins: (user.coins || 0) + earnedCoins
             };
             onUserUpdate(updatedUser);

             if (isBadgeChallenge) {
                setShowRewardModal(activeChallenge);
             } else {
                let successMessage = '\nAll tests passed! Great job! 🎉';
                if (earnedCoins > 0) {
                    successMessage += `\nYou earned ${earnedCoins} coin(s)!`;
                }
                setConsoleOutput(prev => [...prev, successMessage]);
                 // Automatically move to next challenge
                 setTimeout(() => {
                    const nextChallenge = PYTHON_CHALLENGES.find(c => c.level === (activeChallenge.level + 1));
                    if (nextChallenge) {
                        handleSelectChallenge(nextChallenge);
                    } else {
                        setConsoleOutput(prev => [...prev, '\nCongratulations! You have completed all the challenges!']);
                    }
                 }, 2000);
             }
        }

        setIsRunning(false);
    };

    const handleCloseRewardModal = () => {
        const challengeThatWasShown = showRewardModal;
        setShowRewardModal(null);
        if (challengeThatWasShown) {
            const nextChallenge = PYTHON_CHALLENGES.find(c => c.level === (challengeThatWasShown.level + 1));
            if (nextChallenge) {
                handleSelectChallenge(nextChallenge);
            } else {
                // All challenges complete
                setActiveChallenge(null);
                setConsoleOutput(['Congratulations! You have completed all the challenges!']);
            }
        }
    }


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
    
    if (pyodideStatus === 'loading') {
        return (
            <div className="w-full h-full flex items-center justify-center text-center">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] animate-pulse">Loading Python Environment...</h2>
                    <p className="text-[var(--color-text-muted)]">This can take a moment, please wait.</p>
                </div>
            </div>
        );
    }

    if (pyodideStatus === 'error') {
        return (
            <div className="w-full h-full flex items-center justify-center animate-fade-in">
                <div className="w-full max-w-2xl bg-[var(--color-bg)] p-8 rounded-sm border-2 border-dashed border-[var(--color-error)] flex flex-col items-center gap-6 text-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>

                    <h2 className="text-3xl font-bold text-[var(--color-error)]">Could not load the Python interpreter</h2>
                    <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-lg">
                        The environment failed to load, which can happen for a few reasons:
                    </p>

                    <ul className="text-left text-[var(--color-text-muted)] list-disc list-inside space-y-1 bg-[var(--color-secondary)]/50 p-4 rounded-sm border border-[var(--color-border)]">
                        <li>A slow or unstable internet connection.</li>
                        <li>A network firewall (e.g., at a school or office) blocking the required files.</li>
                        <li>A temporary issue with the service that provides the Python environment.</li>
                    </ul>

                    <button onClick={initPyodide} className="btn-vintage font-bold py-3 px-8 rounded-sm text-xl mt-2">
                        Retry Loading
                    </button>

                    <div className="w-full border-t-2 border-dashed border-[var(--color-border)] pt-4 mt-2">
                        <h3 className="font-bold text-lg text-[var(--color-primary)]">What you can do:</h3>
                        <ul className="text-left text-[var(--color-text-muted)] list-disc list-inside mt-2 space-y-1">
                            <li>Make sure you're connected to the internet.</li>
                            <li>If you're on a restricted network, try switching to another (e.g., mobile data).</li>
                            <li>Wait a few minutes and try again.</li>
                        </ul>
                    </div>
                </div>
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
                    {showRewardModal.coinReward && showRewardModal.coinReward > 0 && (
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
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-4 h-[80vh]">
            {/* Levels Sidebar */}
            <div className="col-span-2 bg-[var(--color-secondary)]/50 p-2 rounded-sm border border-[var(--color-border)] overflow-y-auto">
                <h2 className="text-lg font-bold text-center mb-2 text-[var(--color-primary)]">Levels</h2>
                <div className="space-y-1">
                    {PYTHON_CHALLENGES.map(challenge => {
                        const isCompleted = challenge.level < (user.pythonChallengeProgress.currentLevel || 1);
                        const isActive = challenge.level === activeChallenge?.level;
                        const isLocked = challenge.level > (user.pythonChallengeProgress.currentLevel || 1);

                        return (
                            <button
                                key={challenge.level}
                                onClick={() => handleSelectChallenge(challenge)}
                                disabled={isLocked}
                                className={`w-full text-left p-2 rounded-sm text-sm transition-colors ${
                                    isActive ? 'bg-[var(--color-primary)] text-[var(--color-bg)] font-bold' :
                                    isCompleted ? 'bg-green-200/50 hover:bg-green-200/80' :
                                    isLocked ? 'text-[var(--color-text-muted)] opacity-60 cursor-not-allowed' :
                                    'hover:bg-[var(--color-secondary)]'
                                }`}
                            >
                                {challenge.level}. {challenge.title} {isCompleted ? '✓' : ''}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="col-span-6 flex flex-col gap-4 h-full">
                <div className="flex-1 flex flex-col bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)] overflow-y-auto">
                    {activeChallenge ? (
                        <>
                            <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                                {activeChallenge.level}. {activeChallenge.title}
                            </h1>
                            <p className="mt-2 text-[var(--color-text-muted)] whitespace-pre-wrap leading-relaxed">{activeChallenge.explanation}</p>
                            
                            {activeChallenge.example && (
                                <>
                                    <h3 className="text-lg font-bold mt-4 text-[var(--color-text)]">Example</h3>
                                    <pre className="mt-1 bg-[var(--color-secondary)]/50 p-3 rounded-sm text-sm font-mono text-[var(--color-text)] whitespace-pre-wrap overflow-x-auto">
                                        <code>
                                            {activeChallenge.example.replace(/```python\n|```/g, '').trim()}
                                        </code>
                                    </pre>
                                </>
                            )}

                            <h3 className="text-lg font-bold mt-4 text-[var(--color-text)]">Your Task</h3>
                            <p className="mt-1 text-[var(--color-text-muted)] whitespace-pre-wrap">{activeChallenge.task}</p>
                        </>
                    ) : <p>Select a challenge to begin.</p>}
                </div>
                <div className="flex-1 flex flex-col">
                     <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full flex-grow bg-[#282c34] text-[#abb2bf] p-4 rounded-t-sm font-mono text-sm border-t border-x border-[var(--color-border)] focus:outline-none"
                        placeholder="Write your Python code here..."
                        spellCheck="false"
                    />
                    <div className="bg-[var(--color-secondary)] p-2 rounded-b-sm border-b border-x border-[var(--color-border)] flex justify-end gap-2">
                         <button onClick={handleRun} disabled={isRunning} className="btn-vintage py-1 px-3 text-sm disabled:opacity-50">
                            {isRunning ? 'Running...' : 'Run Code'}
                         </button>
                         <button onClick={handleSubmit} disabled={isRunning} className="btn-vintage py-1 px-3 text-sm disabled:opacity-50 bg-green-700">
                            {isRunning ? 'Submitting...' : 'Submit'}
                         </button>
                    </div>
                </div>
            </div>

            {/* Console */}
            <div className="col-span-4 bg-[#1e1e1e] text-white p-4 rounded-sm border border-[var(--color-text)] flex flex-col h-full">
                <h3 className="text-lg font-bold mb-2 text-gray-400">Console</h3>
                <pre className="flex-1 whitespace-pre-wrap text-sm overflow-y-auto font-mono">
                    {consoleOutput.join('\n')}
                </pre>
            </div>
        </div>
    </>
    );
};

export default LearnPythonPage;