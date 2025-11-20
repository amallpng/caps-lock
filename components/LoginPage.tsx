import React, { useState } from 'react';
import { User } from '../types';
import { avatarOptions } from './icons/AvatarIcons';
import { LogoIcon } from './icons/Logo';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
  onShowLeaderboard: () => void;
}

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 12.16C34.522 8.246 29.637 6 24 6C12.955 6 4 14.955 4 26s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691c-1.229 2.503-1.956 5.342-1.956 8.309c0 2.967.727 5.806 1.956 8.309L14.07 35.703C11.312 32.66 9.688 28.53 9.688 24c0-4.53 1.624-8.66 4.382-11.703L6.306 14.691z" />
      <path fill="#4CAF50" d="M24 46c5.637 0 10.522-1.846 14.07-4.99l-7.764-5.693c-2.115 1.423-4.821 2.273-7.806 2.273c-5.22 0-9.657-3.351-11.303-7.962L4.382 35.703C8.136 42.012 15.426 46 24 46z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l7.764 5.693c4.73-4.34 7.227-10.824 7.227-18.263c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegister, onShowLeaderboard }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password && (u.provider === 'local' || !u.provider));
    if (user) {
      if (user.isBlocked) {
        setError('Your account has been blocked by an administrator.');
        return;
      }
      setError('');
      const { password, ...userToLogin } = user;
      onLogin(userToLogin as User);
    } else {
      setError('Invalid username or password for a local account.');
    }
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    let googleUser = users.find(u => u.provider === 'google' && u.email === email);

    if (googleUser && googleUser.isBlocked) {
        setError('Your account has been blocked by an administrator.');
        return;
    }

    if (!googleUser) {
      const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
      const newGoogleUser: User = {
        id: `google-${Date.now()}`,
        username: email.split('@')[0],
        email: email,
        password: null,
        provider: 'google',
        profilePic: randomAvatar,
        completedTasks: [],
        bestWpm: 0,
        streak: 0,
        lastTestDate: '',
        testHistory: [],
        coins: 0,
        isFirstLogin: true,
        isChallengeParticipant: false,
        isBlocked: false,
        hasClaimedShareReward: false,
        hasRevealedGrandReward: false,
        pythonChallengeProgress: {
          currentLevel: 1,
          attemptsToday: 0,
          lastAttemptTimestamp: 0,
        },
      };
      users.push(newGoogleUser);
      localStorage.setItem('users', JSON.stringify(users));
      googleUser = newGoogleUser;
    }
    
    const { password, ...userToLogin } = googleUser;
    onLogin(userToLogin as User);
  };

  const handleGuestLogin = () => {
    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
    const guestUser: User = {
        id: `guest-${Date.now()}`,
        username: 'Guest',
        isGuest: true,
        profilePic: randomAvatar,
        completedTasks: [],
        bestWpm: 0,
        streak: 0,
        lastTestDate: '',
        testHistory: [],
        coins: 0,
        pythonChallengeProgress: {
            currentLevel: 1,
            attemptsToday: 0,
            lastAttemptTimestamp: 0,
        },
    };
    onLogin(guestUser);
  };


  return (
    <div className="w-full max-w-md bg-[var(--color-secondary)] p-8 rounded-sm border-2 border-[var(--color-text)] shadow-lg">
      <div className="flex flex-col items-center mb-6 text-center">
        <LogoIcon className="h-16 w-auto" />
        <h1 className="text-3xl font-bold text-[var(--color-text)] mt-1 tracking-wider">
          CAPS LOCK
        </h1>
      </div>
      <h2 className="text-2xl font-bold text-center text-[var(--color-text)] mb-6">Login</h2>
      {error && <p className="bg-red-500/20 text-red-800 p-3 rounded-sm mb-4 text-center border border-red-800/50">{error}</p>}

      {isGoogleLogin ? (
        <>
          <form onSubmit={handleGoogleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="google-email">Google Email</label>
              <input
                id="google-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-vintage font-bold py-2 px-4 rounded-sm"
            >
              Sign In with Email
            </button>
          </form>
          <p className="mt-6 text-center text-[var(--color-text-muted)]">
            <button onClick={() => { setIsGoogleLogin(false); setError(''); }} className="text-[var(--color-primary)] hover:underline font-semibold">
              &larr; Back to standard login
            </button>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleLocalSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-vintage font-bold py-2 px-4 rounded-sm"
            >
              Login
            </button>
          </form>
          
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
            <span className="flex-shrink mx-4 text-[var(--color-text-muted)]">OR</span>
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
          </div>
          
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => { setIsGoogleLogin(true); setError(''); }}
              className="w-full flex items-center justify-center gap-3 bg-[var(--color-bg)] text-[var(--color-text)] font-semibold py-2 px-4 rounded-sm border-2 border-[var(--color-text)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <GoogleIcon />
              Login with Google
            </button>
            <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full flex items-center justify-center gap-3 bg-transparent text-[var(--color-text-muted)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-border)] hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)] transition-colors"
            >
                Login as Guest
            </button>
            <button
                type="button"
                onClick={onShowLeaderboard}
                className="w-full flex items-center justify-center gap-3 bg-transparent text-[var(--color-primary)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
            >
                View Public Leaderboard
            </button>
          </div>

          <p className="mt-6 text-center text-[var(--color-text-muted)]">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-[var(--color-primary)] hover:underline font-semibold">
              Register here
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;