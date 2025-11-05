import React from 'react';
import { TypingStats } from '../hooks/useTypingGame';

interface ResultsProps {
    stats: TypingStats;
    onRestart: () => void;
    challengeInfo?: {
        wpmGoal: number;
        accuracyGoal: number;
        passed: boolean;
    };
}

const Results: React.FC<ResultsProps> = ({ stats, onRestart, challengeInfo }) => {
    return (
        <div className="w-full max-w-2xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">
                {challengeInfo ? (challengeInfo.passed ? 'Challenge Passed!' : 'Try Again!') : 'Results'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)]">
                    <p className="text-lg text-[var(--color-text-muted)]">WPM</p>
                    <p className="text-5xl font-bold text-[var(--color-text)]">{stats.wpm}</p>
                    {challengeInfo && <p className="text-sm text-[var(--color-text-muted)]">Goal: {challengeInfo.wpmGoal}</p>}
                </div>
                <div className="bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)]">
                    <p className="text-lg text-[var(--color-text-muted)]">Accuracy</p>
                    <p className="text-5xl font-bold text-[var(--color-text)]">{stats.accuracy}%</p>
                    {challengeInfo && <p className="text-sm text-[var(--color-text-muted)]">Goal: {challengeInfo.accuracyGoal}%</p>}
                </div>
            </div>
            <button
                onClick={onRestart}
                className="w-full btn-vintage font-bold py-3 px-4 rounded-sm text-xl"
            >
                {challengeInfo ? (challengeInfo.passed ? 'Next Challenge' : 'Retry Challenge') : 'Try Again'}
            </button>
        </div>
    );
};

export default Results;
