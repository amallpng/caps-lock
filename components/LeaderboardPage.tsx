import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { AvatarIcons, avatarOptions } from './icons/AvatarIcons';

interface LeaderboardPageProps {
  currentUser: User;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const allUsersData: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const sortedUsers = allUsersData
      .filter(u => u.bestWpm && u.bestWpm > 0)
      .sort((a, b) => (b.bestWpm || 0) - (a.bestWpm || 0))
      .map(({ password, ...user }) => user); // Strip password for safety
    setUsers(sortedUsers);
  }, []);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-[#4A6B69]">Leaderboard</h1>
      <div className="w-full bg-[#D3CFC2]/50 p-4 rounded-sm border-2 border-[#A9A391]">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-center text-left font-bold text-gray-600 px-4 py-2 border-b-2 border-dashed border-[#A9A391]">
            <div className="w-16 text-center">Rank</div>
            <div className="flex-grow">Player</div>
            <div className="w-24 text-right">Best WPM</div>
          </div>
          {/* Body */}
          {users.length > 0 ? (
            users.map((user, index) => {
              const AvatarComponent = AvatarIcons[user.profilePic] || AvatarIcons[avatarOptions[0]];
              const isCurrentUser = user.id === currentUser.id;
              return (
                <div
                  key={user.id}
                  className={`flex items-center text-left rounded-sm p-3 transition-colors ${isCurrentUser ? 'bg-[#4A6B69]/20 border-l-4 border-[#4A6B69]' : 'bg-[#F1EFE9]/50'}`}
                >
                  <div className="w-16 text-center font-bold text-2xl text-[#282828]">{index + 1}</div>
                  <div className="flex-grow flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#A9A391] bg-white flex-shrink-0">
                        <AvatarComponent className="w-full h-full object-cover" />
                    </div>
                    <span className="font-semibold truncate">{user.username}</span>
                  </div>
                  <div className="w-24 text-right font-bold text-2xl text-[#4A6B69]">{user.bestWpm}</div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 p-8">No one has set a score yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
