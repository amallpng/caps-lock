import React, { useState, useEffect } from 'react';
import { User, PrizeClaim } from '../types';
import { TASKS } from '../services/challengeService';
import Badge from './Badge';
import PerformanceAnalysis from './PerformanceAnalysis';
import { avatarComponents, avatarOptions } from './icons/AvatarIcons';
import Avatar from './Avatar';
import Certificate from './Certificate';
import CoinIcon from './icons/CoinIcon';

interface ProfilePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const rewards = [
    { name: 'Shopping Coupon', coins: 50, amount: 2 },
    { name: '₹10 Prize', coins: 250, amount: 10 },
    { name: '₹25 Prize', coins: 600, amount: 25 },
    { name: '₹50 Prize', coins: 1200, amount: 50 },
    { name: '₹100 Prize', coins: 2000, amount: 100 },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  
  const [claimState, setClaimState] = useState<{
    modalOpen: boolean;
    reward: { name: string; coins: number; amount: number; } | null;
    confirmationOpen: boolean;
  }>({ modalOpen: false, reward: null, confirmationOpen: false });
  const [upiId, setUpiId] = useState('');
  const [lastClaimedReward, setLastClaimedReward] = useState<(typeof rewards)[0] | null>(null);

  useEffect(() => {
    const scrollToId = sessionStorage.getItem('scrollTo');
    if (scrollToId) {
        const element = document.getElementById(scrollToId);
        if (element) {
            // A small timeout to ensure the page has settled before scrolling
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('animate-highlight');
                setTimeout(() => {
                    element.classList.remove('animate-highlight');
                }, 2000); // must match animation duration
            }, 100);
        }
        sessionStorage.removeItem('scrollTo');
    }
  }, []);

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
  
  const handleClaimClick = (reward: typeof rewards[0]) => {
    if (user.coins >= reward.coins) {
        setClaimState({ modalOpen: true, reward: reward, confirmationOpen: false });
    }
  };

  const handleConfirmClaim = () => {
    const { reward } = claimState;
    if (!reward || !upiId.trim()) {
        const alertMessage = reward.name === 'Shopping Coupon' 
            ? "Please enter a valid Email ID or Mobile Number."
            : "Please enter a valid UPI ID or Phone Number.";
        alert(alertMessage);
        return;
    }

    // Save the prize claim to localStorage
    const newClaim: PrizeClaim = {
        id: `claim-${Date.now()}`,
        userId: user.id,
        username: user.username,
        upiId: upiId.trim(),
        prizeName: reward.name,
        prizeAmount: reward.amount,
        date: new Date().toISOString(),
    };
    const existingClaims: PrizeClaim[] = JSON.parse(localStorage.getItem('prizeClaims') || '[]');
    localStorage.setItem('prizeClaims', JSON.stringify([...existingClaims, newClaim]));

    // Update user's coins
    const updatedCoins = user.coins - reward.coins;
    onUserUpdate({ ...user, coins: updatedCoins });
    
    setLastClaimedReward(reward);
    setClaimState({ modalOpen: false, reward: null, confirmationOpen: true });
    setUpiId('');
  };

  const handleShare = async () => {
    if (user.hasClaimedShareReward || user.isGuest) return;

    const shareData = {
        title: 'CAPS LOCK - Test Your Typing Speed',
        text: 'I\'m practicing my typing on CAPS LOCK. Come and see if you can beat my score!',
        url: 'https://www.capslocks.in/'
    };
    
    const awardCoins = () => {
        // Double check to prevent awarding coins multiple times
        if (!user.hasClaimedShareReward) { 
            onUserUpdate({
                ...user,
                coins: (user.coins || 0) + 5,
                hasClaimedShareReward: true,
            });
            alert('Success! 5 coins have been added to your account.');
        }
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            // If share dialog is opened and closed without error, we assume success.
            awardCoins();
        } else {
            // Fallback for desktop/unsupported browsers
            await navigator.clipboard.writeText(shareData.url);
            alert('Link copied to clipboard! Share it with your friends.');
            awardCoins();
        }
    } catch (error) {
        // Don't award coins if user cancels share. This is not an error we need to show.
        if (error instanceof Error && error.name === 'AbortError') {
             console.log('Share cancelled by user.');
        } else {
             console.error('Sharing failed:', error);
             alert('Could not complete share action.');
        }
    }
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

      <div id="rewards-section" className="w-full scroll-mt-24 p-6 bg-[var(--color-secondary)]/50 rounded-sm border-2 border-transparent">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">Claim Rewards</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)] flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-[var(--color-text)]">Share & Earn</h3>
                <div className="flex items-center gap-2 my-3">
                    <CoinIcon className="h-8 w-8" />
                    <span className="text-3xl font-bold text-green-600">+5</span>
                </div>
                <button
                    onClick={handleShare}
                    disabled={!!user.hasClaimedShareReward || !!user.isGuest}
                    className="w-full btn-vintage font-bold py-2 px-4 rounded-sm disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {user.hasClaimedShareReward ? 'Claimed' : (user.isGuest ? 'Login to Share' : 'Share')}
                </button>
            </div>
            {rewards.map(reward => (
                <div key={reward.name} className="bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)] flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-[var(--color-text)]">{reward.name}</h3>
                    <div className="flex items-center gap-2 my-3">
                        <CoinIcon className="h-8 w-8" />
                        <span className="text-3xl font-bold text-[var(--color-primary)]">{reward.coins}</span>
                    </div>
                    <button
                        onClick={() => handleClaimClick(reward)}
                        disabled={user.coins < reward.coins || !!user.isGuest}
                        className="w-full btn-vintage font-bold py-2 px-4 rounded-sm disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    >
                        {user.isGuest ? 'Login to Claim' : 'Claim'}
                    </button>
                </div>
            ))}
        </div>
      </div>

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
              <Certificate isUnlocked={isCertificateUnlocked} />
            </div>
          </div>
      )}

      {claimState.modalOpen && claimState.reward && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl relative">
                <button onClick={() => setClaimState({ ...claimState, modalOpen: false })} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--color-secondary)]" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2 text-center">Claim {claimState.reward.name}</h2>
                <p className="text-[var(--color-text-muted)] text-center mb-6">This will cost {claimState.reward.coins} coins.
                    {claimState.reward.name !== 'Shopping Coupon' && ` Your remaining balance will be ${user.coins - claimState.reward.coins}.`}
                </p>
                <div>
                    <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="claim-contact">
                        {claimState.reward.name === 'Shopping Coupon' ? 'Email ID or Mobile Number' : 'UPI ID or UPI Phone Number'}
                    </label>
                    <input id="claim-contact" type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} required 
                           placeholder={claimState.reward.name === 'Shopping Coupon' ? 'you@example.com or 1234567890' : 'yourname@bank or 1234567890'}
                           className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={() => setClaimState({ ...claimState, modalOpen: false })} className="bg-transparent text-[var(--color-text-muted)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-border)] hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)] transition-colors">Cancel</button>
                    <button onClick={handleConfirmClaim} className="btn-vintage font-bold py-2 px-6 rounded-sm">Confirm Claim</button>
                </div>
            </div>
        </div>
      )}

      {claimState.confirmationOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl text-center">
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Request Submitted!</h2>
                {lastClaimedReward?.name === 'Shopping Coupon' ? (
                     <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">Your coupon code will be sent to you within 5 business days. Thank you for playing!</p>
                ) : (
                     <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">The amount will be credited to your account within 5 business days. Thank you for playing!</p>
                )}
                <button onClick={() => {
                    setClaimState({ modalOpen: false, reward: null, confirmationOpen: false });
                    setLastClaimedReward(null);
                }} className="mt-8 w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg">OK</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;