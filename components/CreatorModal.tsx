import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface CreatorModalProps {
    onClose: () => void;
}

const CORRECT_PIN = '9495163518';

type ActiveTab = 'registrations' | 'manageUsers';

const CreatorModal: React.FC<CreatorModalProps> = ({ onClose }) => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    
    const [activeTab, setActiveTab] = useState<ActiveTab>('registrations');
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editingUsername, setEditingUsername] = useState('');

    const fetchUsers = () => {
        const usersFromStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const pythonUsers = usersFromStorage.filter(user => user.isChallengeParticipant && !user.isGuest);
        const manageableUsers = usersFromStorage.filter(user => !user.isGuest);
        setRegisteredUsers(pythonUsers);
        setAllUsers(manageableUsers);
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers();
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

    const handlePinKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePinSubmit();
        }
    };

    const handleDeleteUser = (userIdToDelete: string) => {
        if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
            const usersFromStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedStorageUsers = usersFromStorage.filter(user => user.id !== userIdToDelete);
            localStorage.setItem('users', JSON.stringify(updatedStorageUsers));
            fetchUsers(); // Re-read from storage to update UI
        }
    };

    const handleToggleBlockUser = (userIdToToggle: string) => {
        const userToUpdate = allUsers.find(user => user.id === userIdToToggle);
        if (!userToUpdate) return;

        if (window.confirm(`Are you sure you want to ${userToUpdate.isBlocked ? 'unblock' : 'block'} this user?`)) {
            const usersFromStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedStorageUsers = usersFromStorage.map(user => 
                user.id === userIdToToggle ? { ...user, isBlocked: !user.isBlocked } : user
            );
            localStorage.setItem('users', JSON.stringify(updatedStorageUsers));
            fetchUsers(); // Re-read from storage to update UI
        }
    };
    
    const handleEditUser = (user: User) => {
        setEditingUserId(user.id);
        setEditingUsername(user.username);
    };

    const handleSaveUser = (userIdToSave: string) => {
        const newUsername = editingUsername.trim();
        if (!newUsername) {
            alert('Username cannot be empty.');
            return;
        }

        const usersFromStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedStorageUsers = usersFromStorage.map(user =>
            user.id === userIdToSave ? { ...user, username: newUsername } : user
        );
        localStorage.setItem('users', JSON.stringify(updatedStorageUsers));
        
        fetchUsers(); // Re-read from storage to update UI

        setEditingUserId(null);
        setEditingUsername('');
    };


    const renderRegistrations = () => (
        <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Python Course Registrations ({registeredUsers.length})</h2>
            {registeredUsers.length > 0 ? (
                <div className="max-h-96 overflow-y-auto pr-2 border-y-2 border-dashed border-[var(--color-border)] py-2">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-[var(--color-bg)] z-10">
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
        </div>
    );

    const renderUserManagement = () => (
        <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Manage Users ({allUsers.length})</h2>
            <div className="max-h-96 overflow-y-auto pr-2 border-y-2 border-dashed border-[var(--color-border)] py-2">
                <table className="w-full text-left">
                     <thead className="sticky top-0 bg-[var(--color-bg)] z-10">
                        <tr className="border-b-2 border-[var(--color-border)]">
                            <th className="p-2 font-semibold text-[var(--color-text)]">Name</th>
                            <th className="p-2 font-semibold text-[var(--color-text)]">Email</th>
                            <th className="p-2 font-semibold text-[var(--color-text)]">Status</th>
                            <th className="p-2 font-semibold text-[var(--color-text)]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(user => (
                            <tr key={user.id} className="border-b border-dashed border-[var(--color-border)] last:border-b-0">
                                <td className="p-2 text-[var(--color-text-muted)]">
                                    {editingUserId === user.id ? (
                                        <input 
                                            type="text"
                                            value={editingUsername}
                                            onChange={(e) => setEditingUsername(e.target.value)}
                                            className="bg-[var(--color-secondary)] text-[var(--color-text)] px-2 py-1 rounded-sm border border-[var(--color-border)] w-32"
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveUser(user.id)}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td className="p-2 text-[var(--color-text-muted)]">{user.email || 'N/A'}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.isBlocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-2 space-x-2 text-sm">
                                    {editingUserId === user.id ? (
                                         <button onClick={() => handleSaveUser(user.id)} className="font-semibold text-green-600 hover:underline">Save</button>
                                    ) : (
                                         <button onClick={() => handleEditUser(user)} className="font-semibold text-[var(--color-primary)] hover:underline">Edit</button>
                                    )}
                                    <button onClick={() => handleToggleBlockUser(user.id)} className={`font-semibold ${user.isBlocked ? 'text-yellow-600' : 'text-orange-600'} hover:underline`}>
                                        {user.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="font-semibold text-[var(--color-error)] hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-3xl shadow-2xl relative"
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
                            onKeyDown={handlePinKeyDown}
                            className="w-full max-w-xs mx-auto text-center text-2xl tracking-widest bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            autoFocus
                        />
                        <button onClick={handlePinSubmit} className="mt-6 btn-vintage w-full max-w-xs mx-auto font-bold py-2 px-4 rounded-sm">
                            Unlock
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="border-b-2 border-[var(--color-border)] mb-6">
                            <nav className="flex gap-4">
                                <button
                                    onClick={() => setActiveTab('registrations')}
                                    className={`py-2 px-4 font-bold text-lg ${activeTab === 'registrations' ? 'text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    Registrations
                                </button>
                                <button
                                    onClick={() => setActiveTab('manageUsers')}
                                    className={`py-2 px-4 font-bold text-lg ${activeTab === 'manageUsers' ? 'text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    Manage Users
                                </button>
                            </nav>
                        </div>
                        
                        {activeTab === 'registrations' ? renderRegistrations() : renderUserManagement()}
                        
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