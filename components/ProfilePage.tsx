import React, { useState } from 'react';
import { User, Task } from '../types';
import { TASKS } from '../services/challengeService';
import { AvatarIcons, avatarOptions } from './icons/AvatarIcons';
import { BadgeIcons } from './icons/BadgeIcons';
import PerformanceAnalysis from './PerformanceAnalysis';

interface ProfilePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(user.profilePic);
  const [shareStatus, setShareStatus] = useState('');

  const showSave = selectedAvatar !== user.profilePic;

  const handleUpdateProfile = () => {
    onUserUpdate({ ...user, profilePic: selectedAvatar });
  };
  
  const CurrentAvatar = AvatarIcons[selectedAvatar] || AvatarIcons[avatarOptions[0]];


  const handleShare = async (task: Task) => {
    const badgeAsset = BadgeIcons[task.badge.icon];
    if (!badgeAsset) {
      setShareStatus('Error: Badge asset not found.');
      return;
    }

    const svgString = badgeAsset.svgString;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const file = new File([blob], `${task.badge.name.toLowerCase().replace(/ /g, '-')}.svg`, { type: 'image/svg+xml' });
    
    const shareData = {
      title: 'I earned a new badge on CAPS LOCK!',
      text: `I just unlocked the "${task.badge.name}" badge on CAPS LOCK!`,
      files: [file],
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus('Badge shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
        setShareStatus('');
      }
    } else {
      setShareStatus('Web Share API is not supported in your browser or cannot share this file.');
    }
    setTimeout(() => setShareStatus(''), 5000);
  };

  const completedBadges = TASKS.filter(task => user.completedTasks.includes(task.id));

  return (
    <div className="w-full max-w-4xl bg-[#D3CFC2]/50 p-8 rounded-sm border-2 border-[#A9A391] flex flex-col items-center gap-8">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="relative bg-white p-2 shadow-md border-2 border-[#A9A391]">
            <div className="w-40 h-40">
                <CurrentAvatar className="w-full h-full object-cover" />
            </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#282828]">{user.username}</h1>
          <p className="text-lg text-gray-600 mt-2">Best WPM: <span className="font-bold text-[#4A6B69]">{user.bestWpm || 0}</span></p>
          <p className="text-lg text-gray-600">Challenges Completed: {user.completedTasks.length} / {TASKS.length}</p>
        </div>
      </div>

      <PerformanceAnalysis user={user} />

      <div className="w-full border-t-2 border-dashed border-[#A9A391] pt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#4A6B69]">Customize Avatar</h2>
            {showSave && (
              <button
                onClick={handleUpdateProfile}
                className="btn-vintage font-bold py-2 px-6 rounded-sm"
              >
                Save
              </button>
            )}
        </div>
         <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {avatarOptions.map(avatarKey => {
                const AvatarComponent = AvatarIcons[avatarKey];
                return (
                    <button 
                        key={avatarKey}
                        onClick={() => setSelectedAvatar(avatarKey)}
                        className={`p-2 rounded-sm border-2 transition-all ${selectedAvatar === avatarKey ? 'border-[#4A6B69] bg-[#4A6B69]/20' : 'border-transparent hover:border-[#A9A391]'}`}
                    >
                        <AvatarComponent className="w-full h-full" />
                    </button>
                )
            })}
         </div>
      </div>
      
       <div className="w-full border-t-2 border-dashed border-[#A9A391] pt-6">
        <h2 className="text-2xl font-bold text-[#4A6B69] mb-4">Earned Badges</h2>
        {shareStatus && <p className="text-center text-sm text-gray-600 mb-4">{shareStatus}</p>}
        {completedBadges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {completedBadges.map(task => {
              const BadgeIcon = BadgeIcons[task.badge.icon]?.component;
              if (!BadgeIcon) return null;
              
              return (
                <div key={task.id} className="bg-[#F1EFE9] border border-[#A9A391] p-4 rounded-sm flex flex-col items-center justify-between text-center gap-2">
                  <BadgeIcon className="w-16 h-16" />
                  <p className="font-semibold text-[#282828]">{task.badge.name}</p>
                  <p className="text-sm text-gray-600">Level {task.level}</p>
                  <button onClick={() => handleShare(task)} className="text-sm bg-[#4A6B69]/80 text-white px-3 py-1 mt-2 rounded-sm hover:bg-[#4A6B69] transition-colors w-full flex items-center justify-center gap-1">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                     Share
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No badges earned yet. Complete some challenges!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;