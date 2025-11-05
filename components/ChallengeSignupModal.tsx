import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface ChallengeSignupModalProps {
  user: User;
  onClose: () => void;
  onSignup: (name: string, email: string) => void;
}

const ChallengeSignupModal: React.FC<ChallengeSignupModalProps> = ({ user, onClose, onSignup }) => {
  const [name, setName] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) {
        setError('Name cannot be empty.');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }
    setError('');
    onSignup(name, email);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-md shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--color-secondary)]" 
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2 text-center">You're Invited!</h2>
        <p className="text-[var(--color-text-muted)] text-center mb-6">
            Sign up to unlock our free 'Learn Python' course. Limited spots available!
        </p>
        
        {error && <p className="bg-red-500/20 text-red-800 p-3 rounded-sm mb-4 text-center border border-red-800/50">{error}</p>}
        
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="challenge-name">Name</label>
                <input
                    ref={nameInputRef}
                    id="challenge-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2" htmlFor="challenge-email">Email</label>
                <input
                    id="challenge-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              className="w-full btn-vintage font-bold py-3 px-4 rounded-sm text-lg"
            >
              Count Me In!
            </button>
            <button 
             onClick={onClose} 
             className="w-full text-center text-sm text-[var(--color-text-muted)] hover:underline"
           >
                No thanks, maybe next time.
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSignupModal;