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
        <div className="w-full max-w-2xl bg-[#D3CFC2]/50 p-8 rounded-sm border-2 border-dashed border-[#A9A391] flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold text-[#4A6B69]">
                {challengeInfo ? (challengeInfo.passed ? 'Challenge Passed!' : 'Try Again!') : 'Results'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="bg-[#F1EFE9] p-4 rounded-sm border border-[#A9A391]">
                    <p className="text-lg text-gray-600">WPM</p>
                    <p className="text-5xl font-bold text-[#282828]">{stats.wpm}</p>
                    {challengeInfo && <p className="text-sm text-gray-500">Goal: {challengeInfo.wpmGoal}</p>}
                </div>
                <div className="bg-[#F1EFE9] p-4 rounded-sm border border-[#A9A391]">
                    <p className="text-lg text-gray-600">Accuracy</p>
                    <p className="text-5xl font-bold text-[#282828]">{stats.accuracy}%</p>
                    {challengeInfo && <p className="text-sm text-gray-500">Goal: {challengeInfo.accuracyGoal}%</p>}
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