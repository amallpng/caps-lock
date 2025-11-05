import React, { useState } from 'react';
import { User } from '../types';
import { TASKS } from '../services/challengeService';
import Badge from './Badge';
import PerformanceAnalysis from './PerformanceAnalysis';
import { avatarComponents, avatarOptions } from './icons/AvatarIcons';
import Avatar from './Avatar';

interface ProfilePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);

  const completedBadges = TASKS.filter(task => user.completedTasks.includes(task.id));

  const handleUsernameChange = () => {
    if (newUsername.trim() && newUsername.trim() !== user.username) {
      onUserUpdate({ ...user, username: newUsername.trim() });
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (avatarKey: string) => {
    onUserUpdate({ ...user, profilePic: avatarKey });
  };
  
  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-8">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-[var(--color-secondary)]/50 rounded-sm border-2 border-[var(--color-border)]">
        <div className="relative group">
          <Avatar avatarKey={user.profilePic} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[var(--color-primary)]" />
           <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white font-bold text-lg">Change</span>
           </div>
           {/* Simple avatar picker on hover */}
           <div className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-wrap justify-center items-center gap-2 p-4 bg-black/70">
              {avatarOptions.map(key => {
                  const IconComponent = avatarComponents[key];
                  return (
                      <button key={key} onClick={() => handleAvatarChange(key)} className="w-12 h-12 bg-white rounded-full p-1 hover:scale-110 transition-transform">
                          <IconComponent />
                      </button>
                  )
              })}
           </div>
        </div>
        <div className="text-center md:text-left">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="bg-[var(--color-bg)] text-3xl font-bold text-[var(--color-text)] p-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <button onClick={handleUsernameChange} className="btn-vintage py-2 px-3 text-sm">Save</button>
              <button onClick={() => setIsEditing(false)} className="text-[var(--color-text-muted)] hover:underline text-sm">Cancel</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-[var(--color-text)]">{user.username}</h1>
              <button onClick={() => setIsEditing(true)} aria-label="Edit username" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
              </button>
            </div>
          )}
          <p className="text-lg text-[var(--color-text-muted)] mt-2">Best WPM: <span className="font-bold text-[var(--color-primary)]">{user.bestWpm}</span></p>
        </div>
      </div>
      
      <PerformanceAnalysis user={user} />

      <div className="w-full">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">Earned Badges ({completedBadges.length}/{TASKS.length})</h2>
        {completedBadges.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-[var(--color-secondary)]/50 p-6 rounded-sm border-2 border-dashed border-[var(--color-border)]">
            {completedBadges.map(task => (
                <div key={task.id} className="flex flex-col items-center p-2 rounded-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-center">
                    <Badge task={task} />
                </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] py-8">No badges earned yet. Go to Challenge Mode to start collecting them!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
