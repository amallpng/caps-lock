import React from 'react';
import { User, Page } from '../types';
import Logo from './icons/Logo';
import Avatar from './Avatar';

interface NavbarProps {
    user: User;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage }) => {

    const navLinks: { page: Page, label: string }[] = [
        { page: 'practice', label: 'Practice' },
        { page: 'challenge', label: 'Challenges' },
        ...(user.isChallengeParticipant ? [{ page: 'learnPython' as Page, label: 'Learn Python' }] : []),
        { page: 'about', label: 'About' },
    ];

    return (
        <>
            <header className="w-full bg-[var(--color-secondary)] border-b-2 border-[var(--color-text)] shadow-md sticky top-0 z-40">
                <nav className="container mx-auto px-4 flex justify-between items-center h-20">
                    <div className="flex items-center gap-8">
                        <button onClick={() => onNavigate('practice')} className="flex items-center gap-2">
                             <Logo className="h-10 w-auto" />
                        </button>
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map(({ page, label }) => (
                                <button
                                    key={page}
                                    onClick={() => onNavigate(page)}
                                    className={`text-lg font-semibold transition-colors ${currentPage === page ? 'text-[var(--color-primary)] underline' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-6 md:hidden">
                            {user.isChallengeParticipant && (
                                <button
                                    onClick={() => onNavigate('learnPython')}
                                    className={`text-lg font-semibold transition-colors ${currentPage === 'learnPython' ? 'text-[var(--color-primary)] underline' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                                >
                                    Python
                                </button>
                            )}
                             <button
                                onClick={() => onNavigate('about')}
                                className={`text-lg font-semibold transition-colors ${currentPage === 'about' ? 'text-[var(--color-primary)] underline' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                            >
                                About
                            </button>
                        </div>
                        <button 
                            onClick={onLogout}
                            className="bg-[var(--color-primary)] text-[var(--color-bg)] px-3 py-1 font-bold rounded-sm transition hover:brightness-90 active:brightness-75"
                        >
                            Log out
                        </button>
                        <div className="group relative">
                            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-[var(--color-border)]/50">
                                <Avatar avatarKey={user.profilePic} className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)]" />
                                <span className="hidden lg:block font-semibold text-[var(--color-text)]">{user.username}</span>
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--color-bg)] rounded-sm border border-[var(--color-border)] shadow-lg hidden group-hover:block" style={{zIndex: 50}}>
                                <button onClick={() => onNavigate('practice')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Practice</button>
                                <button onClick={() => onNavigate('challenge')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Challenges</button>
                                {user.isChallengeParticipant && (
                                    <button onClick={() => onNavigate('learnPython')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Learn Python</button>
                                )}
                                <button onClick={() => onNavigate('leaderboard')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Leaderboard</button>
                                <button onClick={() => onNavigate('about')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">About</button>
                                <div className="border-t border-[var(--color-border)] my-1"></div>
                                <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Profile</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;