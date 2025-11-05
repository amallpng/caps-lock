import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';

interface LeaderboardPageProps {
    currentUser: User;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser }) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const sortedUsers = [...allUsers].sort((a, b) => (b.bestWpm || 0) - (a.bestWpm || 0));

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold text-[#4A6B69]">Leaderboard</h1>
            <div className="w-full bg-[#D3CFC2]/50 p-6 rounded-sm border-2 border-[#A9A391] space-y-4">
                {sortedUsers.length > 0 ? sortedUsers.map((user, index) => {
                    const isCurrentUser = user.id === currentUser.id;
                    const rank = index + 1;
                    let rankColor = '';
                    if (rank === 1) rankColor = 'text-yellow-500';
                    else if (rank === 2) rankColor = 'text-gray-500';
                    else if (rank === 3) rankColor = 'text-yellow-700';

                    return (
                        <div key={user.id} className={`flex items-center justify-between p-4 rounded-sm transition-colors ${isCurrentUser ? 'bg-[#4A6B69]/30 border-2 border-[#4A6B69]' : 'bg-[#F1EFE9] border border-transparent'}`}>
                            <div className="flex items-center gap-4">
                                <span className={`text-2xl font-bold w-10 text-center ${rankColor}`}>{rank}</span>
                                <Avatar avatarKey={user.profilePic} className="w-12 h-12 rounded-full" />
                                <span className="text-lg font-semibold text-[#282828]">{user.username}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#282828]">{user.bestWpm || 0}</p>
                                <p className="text-sm text-gray-500">WPM</p>
                            </div>
                        </div>
                    );
                }) : <p className="text-center text-gray-500">No users on the leaderboard yet.</p>}
            </div>
        </div>
    );
};

export default LeaderboardPage;
