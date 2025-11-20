import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import CoinIcon from './icons/CoinIcon';

interface LeaderboardPageProps {
    currentUser: User | null;
    onBack?: () => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser, onBack }) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const sortedUsers = [...allUsers]
        .filter(u => !u.isGuest)
        .sort((a, b) => (b.bestWpm || 0) - (a.bestWpm || 0));

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8 relative">
            {onBack && (
                <button 
                    onClick={onBack}
                    className="self-start md:absolute md:left-0 md:top-2 text-[var(--color-primary)] hover:underline font-semibold flex items-center gap-1 mb-4 md:mb-0"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Login
                </button>
            )}
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">Leaderboard</h1>
            <div className="w-full bg-[var(--color-secondary)]/50 p-6 rounded-sm border-2 border-[var(--color-border)] space-y-4">
                {sortedUsers.length > 0 ? sortedUsers.map((user, index) => {
                    const isCurrentUser = currentUser && user.id === currentUser.id;
                    const rank = index + 1;
                    let rankColor = '';
                    if (rank === 1) rankColor = 'text-yellow-500';
                    else if (rank === 2) rankColor = 'text-gray-500';
                    else if (rank === 3) rankColor = 'text-yellow-700';

                    return (
                        <div key={user.id} className={`flex items-center justify-between p-4 rounded-sm transition-colors ${isCurrentUser ? 'bg-[var(--color-primary)]/30 border-2 border-[var(--color-primary)]' : 'bg-[var(--color-bg)] border border-transparent'}`}>
                            <div className="flex items-center gap-4 min-w-0">
                                <span className={`text-2xl font-bold w-10 flex-shrink-0 text-center ${rankColor}`}>{rank}</span>
                                <Avatar avatarKey={user.profilePic} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <span className="text-lg font-semibold text-[var(--color-text)] truncate">{user.username}</span>
                            </div>
                            <div className="flex items-center gap-6 ml-4">
                                <div className="hidden sm:flex items-center gap-2" title="Coins">
                                    <CoinIcon className="w-6 h-6" />
                                    <span className="text-xl font-bold text-[var(--color-text)] w-12 text-left">{user.coins || 0}</span>
                                </div>
                                <div className="text-right w-20 flex-shrink-0">
                                    <p className="text-2xl font-bold text-[var(--color-text)]">{user.bestWpm || 0}</p>
                                    <p className="text-sm text-[var(--color-text-muted)]">WPM</p>
                                </div>
                            </div>
                        </div>
                    );
                }) : <p className="text-center text-[var(--color-text-muted)]">No users on the leaderboard yet.</p>}
            </div>
        </div>
    );
};

export default LeaderboardPage;