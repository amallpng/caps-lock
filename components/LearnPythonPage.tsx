import React, { useState, useEffect, useRef } from 'react';
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
    const [isPyodideLoading, setIsPyodideLoading] = useState(true);
    const [activeChallenge, setActiveChallenge] = useState<PythonChallenge | null>(null);
    const [userCode, setUserCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showRewardModal, setShowRewardModal] = useState<PythonChallenge | null>(null);

    useEffect(() => {
        const initPyodide = async () => {
            try {
                const pyodideInstance = await loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
                });
                setPyodide(pyodideInstance);
            } catch (error) {
                console.error("Failed to load Pyodide:", error);
                setConsoleOutput(["Error: Could not load the Python interpreter."]);
            } finally {
                setIsPyodideLoading(false);
            }
        };
        initPyodide();
    }, []);

    useEffect(() => {
        if (user && user.pythonChallengeProgress) {
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
    }, [user]);
    
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
    
    if (isPyodideLoading) {
        return <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--color-primary)]">Loading Python Environment...</h2>
            <p>This may take a moment.</p>
        </div>;
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
