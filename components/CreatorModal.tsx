import React, { useState, useEffect } from 'react';
// FIX: Import AvatarData from types.ts where it is defined and exported, not from avatarService.
import { User, PrizeClaim, AvatarData } from '../types';
import { TASKS } from '../services/challengeService';
import { getAvatars, addAvatar, deleteAvatar, fileToBase64 } from '../services/avatarService';
import Avatar from './Avatar';

interface CreatorModalProps {
    onClose: () => void;
}

const CORRECT_PIN = '9495163518';

type ActiveTab = 'registrations' | 'manageUsers' | 'prizeClaims' | 'manageAvatars';

const CreatorModal: React.FC<CreatorModalProps> = ({ onClose }) => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    
    const [activeTab, setActiveTab] = useState<ActiveTab>('registrations');
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [prizeClaims, setPrizeClaims] = useState<PrizeClaim[]>([]);
    const [avatars, setAvatars] = useState<AvatarData[]>([]);
    const [expandedClaimId, setExpandedClaimId] = useState<string | null>(null);

    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editingUsername, setEditingUsername] = useState('');

    const fetchData = () => {
        const usersFromStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const pythonUsers = usersFromStorage.filter(user => user.isChallengeParticipant && !user.isGuest);
        const manageableUsers = usersFromStorage.filter(user => !user.isGuest);
        setRegisteredUsers(pythonUsers);
        setAllUsers(manageableUsers);
        setAvatars(getAvatars());

        const claimsFromStorage: PrizeClaim[] = JSON.parse(localStorage.getItem('prizeClaims') || '[]');
        setPrizeClaims(claimsFromStorage.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
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
            fetchData();
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
            fetchData();
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
        
        fetchData();

        setEditingUserId(null);
        setEditingUsername('');
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 500 * 1024) { // 500 KB limit
            alert('File is too large. Please upload an image under 500 KB.');
            return;
        }

        try {
            const base64Data = await fileToBase64(file);
            addAvatar(base64Data);
            fetchData(); // Refresh data
        } catch (error) {
            console.error("Error converting file to base64", error);
            alert('Failed to upload avatar.');
        }
    };

    const handleAvatarDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this custom avatar?')) {
            deleteAvatar(id);
            fetchData(); // Refresh data
        }
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
    
    const renderPrizeClaims = () => (
        <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Prize Claims ({prizeClaims.length})</h2>
            {prizeClaims.length > 0 ? (
                <div className="max-h-96 overflow-y-auto pr-2 border-y-2 border-dashed border-[var(--color-border)] py-2">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-[var(--color-bg)] z-10">
                            <tr className="border-b-2 border-[var(--color-border)]">
                                <th className="p-2 font-semibold text-[var(--color-text)]">Date</th>
                                <th className="p-2 font-semibold text-[var(--color-text)]">Username</th>
                                <th className="p-2 font-semibold text-[var(--color-text)]">Prize</th>
                                <th className="p-2 font-semibold text-[var(--color-text)]">Contact</th>
                                <th className="p-2 font-semibold text-[var(--color-text)]">Amount</th>
                                <th className="p-2 font-semibold text-[var(--color-text)]">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prizeClaims.map(claim => {
                                const user = allUsers.find(u => u.id === claim.userId);
                                const isExpanded = expandedClaimId === claim.id;

                                return (
                                <React.Fragment key={claim.id}>
                                    <tr className="border-b border-dashed border-[var(--color-border)] last:border-b-0">
                                        <td className="p-2 text-sm text-[var(--color-text-muted)]">{new Date(claim.date).toLocaleString()}</td>
                                        <td className="p-2 text-[var(--color-text-muted)]">{claim.username}</td>
                                        <td className="p-2 text-[var(--color-text-muted)]">{claim.prizeName}</td>
                                        <td className="p-2 text-[var(--color-text-muted)]">{claim.upiId}</td>
                                        <td className="p-2 text-[var(--color-text-muted)]">
                                            {claim.prizeName === 'Shopping Coupon' ? 'N/A' : `₹${claim.prizeAmount}`}
                                        </td>
                                        <td className="p-2">
                                            <button 
                                                onClick={() => setExpandedClaimId(isExpanded ? null : claim.id)}
                                                className="font-semibold text-[var(--color-primary)] hover:underline text-sm flex items-center gap-1"
                                                aria-expanded={isExpanded}
                                            >
                                                {isExpanded ? 'Hide' : 'View'}
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr className="bg-[var(--color-secondary)]/30">
                                            <td colSpan={6} className="p-4">
                                                {user ? (
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Email</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.email || 'N/A'}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Best WPM</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.bestWpm || 0}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Current Coins</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.coins || 0}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Challenges Done</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.completedTasks.length} / {TASKS.length}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Daily Streak</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.streak || 0}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[var(--color-text)]">Last Test Date</p>
                                                            <p className="text-[var(--color-text-muted)]">{user.lastTestDate || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-[var(--color-text-muted)]">User data not found (user may have been deleted).</p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-[var(--color-text-muted)] py-8">No prize claims have been submitted yet.</p>
            )}
        </div>
    );

    const renderAvatarManagement = () => (
        <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Manage Avatars ({avatars.length})</h2>
            <div className="mb-6 p-4 border-2 border-dashed border-[var(--color-border)] rounded-sm">
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Add New Avatar</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">Upload a square image (PNG, JPG, SVG). Max size: 500KB.</p>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleAvatarUpload}
                    className="w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-2 file:border-[var(--color-text)] file:font-semibold file:bg-[var(--color-primary)] file:text-[var(--color-bg)] hover:file:opacity-90 file:cursor-pointer"
                />
            </div>
            <div className="max-h-80 overflow-y-auto pr-2">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {avatars.map(avatar => (
                        <div key={avatar.id} className="relative group flex flex-col items-center text-center">
                            <Avatar avatarKey={avatar.id} className="w-20 h-20 rounded-full border-2 border-[var(--color-border)]" />
                            <p className="text-xs mt-1 text-[var(--color-text-muted)] truncate w-full">
                                {avatar.type === 'component' ? 'Default' : 'Custom'}
                            </p>
                            {avatar.type === 'base64' && (
                                <button
                                    onClick={() => handleAvatarDelete(avatar.id)}
                                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                    aria-label="Delete avatar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
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
                className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-4xl shadow-2xl relative"
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
                                 <button
                                    onClick={() => setActiveTab('prizeClaims')}
                                    className={`py-2 px-4 font-bold text-lg ${activeTab === 'prizeClaims' ? 'text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    Prize Claims
                                </button>
                                <button
                                    onClick={() => setActiveTab('manageAvatars')}
                                    className={`py-2 px-4 font-bold text-lg ${activeTab === 'manageAvatars' ? 'text-[var(--color-primary)] border-b-4 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    Avatars
                                </button>
                            </nav>
                        </div>
                        
                        {activeTab === 'registrations' && renderRegistrations()}
                        {activeTab === 'manageUsers' && renderUserManagement()}
                        {activeTab === 'prizeClaims' && renderPrizeClaims()}
                        {activeTab === 'manageAvatars' && renderAvatarManagement()}

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