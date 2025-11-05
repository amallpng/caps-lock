import React, { useState } from 'react';
import { User } from '../types';
import { TASKS } from '../services/challengeService';
import Badge from './Badge';
import PerformanceAnalysis from './PerformanceAnalysis';
import { avatarComponents, avatarOptions } from './icons/AvatarIcons';
import Avatar from './Avatar';
import Certificate from './Certificate';

interface ProfilePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const completedBadges = TASKS.filter(task => user.completedTasks.includes(task.id));
  const isCertificateUnlocked = user.completedTasks.length >= TASKS.length;
  const certificateImageUrl = "https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/1S-WUN1oT6Sg2Jk4sN635a-p0Y_o_J-V-/caps_lock_certificate.jpg";


  const handleUsernameChange = () => {
    if (user.isGuest) return;
    if (newUsername.trim() && newUsername.trim() !== user.username) {
      onUserUpdate({ ...user, username: newUsername.trim() });
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (avatarKey: string) => {
    if (user.isGuest) return;
    onUserUpdate({ ...user, profilePic: avatarKey });
  };
  
  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-8">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-[var(--color-secondary)]/50 rounded-sm border-2 border-[var(--color-border)]">
        <div className="relative group">
          <Avatar avatarKey={user.profilePic} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[var(--color-primary)]" />
          {!user.isGuest && (
            <>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white font-bold text-lg">Change</span>
              </div>
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
            </>
          )}
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
              {!user.isGuest && (
                <button onClick={() => setIsEditing(true)} aria-label="Edit username" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                </button>
              )}
            </div>
          )}
          <p className="text-lg text-[var(--color-text-muted)] mt-2">Best WPM: <span className="font-bold text-[var(--color-primary)]">{user.bestWpm}</span></p>
          {user.isGuest && <p className="text-sm text-[var(--color-text-muted)] mt-2">Login to customize your profile.</p>}
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

      <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">Grand Achievement</h2>
          <div className="flex justify-center">
              <button
                  onClick={() => setIsCertificateModalOpen(true)}
                  className="relative w-full max-w-sm bg-[var(--color-bg)] p-2 rounded-sm border-2 border-[var(--color-border)] overflow-hidden group transition-transform hover:scale-105"
              >
                  <img 
                    src={certificateImageUrl} 
                    alt="Certificate preview" 
                    className={`w-full h-auto transition-all duration-300 ${!isCertificateUnlocked ? 'blur-md' : ''}`} 
                  />
                  {!isCertificateUnlocked && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <p className="font-bold text-xl mt-2">Locked</p>
                          <p className="text-sm text-center">Complete all 100 challenges to unlock.</p>
                      </div>
                  )}
                  {isCertificateUnlocked && (
                     <div className="absolute inset-0 bg-[var(--color-primary)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-[var(--color-bg)] font-bold text-2xl">View Certificate</p>
                     </div>
                  )}
              </button>
          </div>
      </div>

      {isCertificateModalOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsCertificateModalOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="relative bg-[var(--color-bg)] p-2 sm:p-4 rounded-sm border-4 border-[var(--color-border)] shadow-2xl w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="absolute -top-5 -right-5 bg-[var(--color-error)] text-white rounded-full p-2 z-10 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:ring-[var(--color-error)]"
                aria-label="Close certificate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {isCertificateUnlocked ? (
                  <Certificate />
              ) : (
                  <div className="text-center p-8">
                      <h3 className="text-2xl font-bold text-[var(--color-primary)]">Certificate is Locked</h3>
                      <p className="text-lg mt-4 text-[var(--color-text-muted)]">You must complete all 100 challenges in Challenge Mode to view your Certificate of Achievement.</p>
                  </div>
              )}
            </div>
          </div>
      )}
    </div>
  );
};

export default ProfilePage;