import React, { useState } from 'react';
import { User } from '../types';
import { avatarOptions } from './icons/AvatarIcons';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === username)) {
      setError('Username already exists');
      return;
    }

    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      profilePic: randomAvatar,
      provider: 'local',
      completedTasks: [],
      bestWpm: 0,
      streak: 0,
      lastTestDate: '',
      testHistory: [],
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setError('');
    onRegisterSuccess();
  };

  return (
    <div className="w-full max-w-md bg-[var(--color-secondary)] p-8 rounded-sm border-2 border-[var(--color-text)] shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-6">CAPS LOCK</h1>
      <h2 className="text-2xl font-bold text-center text-[var(--color-text)] mb-6">Register</h2>
      {error && <p className="bg-red-500/20 text-red-800 p-3 rounded-sm mb-4 text-center border border-red-800/50">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <button
          type="submit"
          className="w-full btn-vintage font-bold py-2 px-4 rounded-sm"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-[var(--color-text-muted)]">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-[var(--color-primary)] hover:underline font-semibold">
          Login here
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
