import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface CreatorModalProps {
    onClose: () => void;
}

const CORRECT_PIN = '9495163518';

const CreatorModal: React.FC<CreatorModalProps> = ({ onClose }) => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const pythonUsers = allUsers.filter(user => user.isChallengeParticipant && !user.isGuest);
            setRegisteredUsers(pythonUsers);
        }
    }, [isAuthenticated]);

    const handlePinSubmit = () => {
        if (pin === CORRECT_PIN) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect PIN.');
            setPin('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePinSubmit();
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
                className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-lg shadow-2xl relative"
                onClick={e => e.stopPropagation()}
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

                {!isAuthenticated ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Creator Access</h2>
                        <p className="text-[var(--color-text-muted)] mb-6">Enter creator access PIN.</p>
                        {error && <p className="bg-red-500/20 text-red-800 p-2 rounded-sm mb-4 text-center border border-red-800/50">{error}</p>}
                        <input 
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full max-w-xs mx-auto text-center text-2xl tracking-widest bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            autoFocus
                        />
                        <button onClick={handlePinSubmit} className="mt-6 btn-vintage w-full max-w-xs mx-auto font-bold py-2 px-4 rounded-sm">
                            Unlock
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Python Course Registrations ({registeredUsers.length})</h2>
                        {registeredUsers.length > 0 ? (
                            <div className="max-h-96 overflow-y-auto pr-2 border-y-2 border-dashed border-[var(--color-border)] py-2">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-[var(--color-bg)]">
                                        <tr className="border-b-2 border-[var(--color-border)]">
                                            <th className="p-2 text-lg font-semibold text-[var(--color-text)]">Name</th>
                                            <th className="p-2 text-lg font-semibold text-[var(--color-text)]">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registeredUsers.map(user => (
                                            <tr key={user.id} className="border-b border-dashed border-[var(--color-border)] last:border-b-0">
                                                <td className="p-2 text-[var(--color-text-muted)]">{user.username}</td>
                                                <td className="p-2 text-[var(--color-text-muted)]">{user.email || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-[var(--color-text-muted)] py-8">No users have registered for the Python course yet.</p>
                        )}
                        <button onClick={onClose} className="mt-6 w-full btn-vintage font-bold py-2 px-4 rounded-sm">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorModal;