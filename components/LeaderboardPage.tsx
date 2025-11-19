import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import CoinIcon from './icons/CoinIcon';

interface LeaderboardPageProps {
    currentUser: User;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser }) => {
    if (currentUser.isGuest) {
        return (
            <div className="w-full max-w-xl bg-[var(--color-secondary)]/50 p-8 rounded-sm border-2 border-dashed border-[var(--color-border)] flex flex-col items-center gap-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Access Denied</h2>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                    The leaderboard is only available to registered users. Please log in or create an account to view your ranking and compete with others.
                </p>
            </div>
        );
    }

    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const sortedUsers = [...allUsers]
        .filter(u => !u.isGuest)
        .sort((a, b) => (b.bestWpm || 0) - (a.bestWpm || 0));

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">Leaderboard</h1>
            <div className="w-full bg-[var(--color-secondary)]/50 p-6 rounded-sm border-2 border-[var(--color-border)] space-y-4">
                {sortedUsers.length > 0 ? sortedUsers.map((user, index) => {
                    const isCurrentUser = user.id === currentUser.id;
                    const rank = index + 1;
                    let rankColor = '';
                    if (rank === 1) rankColor = 'text-yellow-500';
                    else if (rank === 2) rankColor = 'text-gray-500';
                    else if (rank === 3) rankColor = 'text-yellow-700';

                    return (
                        <div key={user.id} className={`flex items-center justify-between p-4 rounded-sm transition-colors ${isCurrentUser ? 'bg-[var(--color-primary)]/30 border-2 border-[var(--color-primary)]' : 'bg-[var(--color-bg)] border border-transparent'}`}>
                            {/* Left side: Rank, Avatar, Name */}
                            <div className="flex flex-1 items-center gap-4 min-w-0">
                                <span className={`text-2xl font-bold w-10 text-center ${rankColor}`}>{rank}</span>
                                <Avatar avatarKey={user.profilePic} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <span className="text-lg font-semibold text-[var(--color-text)] truncate" title={user.username}>{user.username}</span>
                            </div>

                            {/* Right side: Stats */}
                            <div className="flex flex-shrink-0 items-center gap-4 sm:gap-8 ml-4">
                                <div className="flex items-center gap-2">
                                    <CoinIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <div className="text-right">
                                        <p className="text-lg sm:text-xl font-bold text-[var(--color-text)]">{user.coins || 0}</p>
                                        <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">Coins</p>
                                    </div>
                                </div>
                                <div className="text-right w-16 sm:w-20">
                                    <p className="text-lg sm:text-xl font-bold text-[var(--color-text)]">{user.bestWpm || 0}</p>
                                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">WPM</p>
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