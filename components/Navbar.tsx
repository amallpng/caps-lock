import React from 'react';
import { User, Page } from '../types';
import Logo from './icons/Logo';
import Avatar from './Avatar';
import CoinIcon from './icons/CoinIcon';

interface NavbarProps {
    user: User;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    currentPage: Page;
    onOpenSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage, onOpenSettings }) => {

    // A single source of truth for navigation links.
    // Guests can see challenge/leaderboard pages but will get an access denied message on those pages.
    const navLinks: { page: Page, label: string }[] = [
        { page: 'practice', label: 'Practice' },
        { page: 'challenge', label: 'Challenges' },
        { page: 'leaderboard', label: 'Leaderboard' },
        // 'Learn Python' is only for registered, participating users.
        ...(!user.isGuest && user.isChallengeParticipant ? [{ page: 'learnPython' as Page, label: 'Learn Python' }] : []),
        { page: 'about', label: 'About' },
    ];

    const handleCoinClick = () => {
        const highlightAndScroll = (element: HTMLElement) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.classList.add('animate-highlight');
            setTimeout(() => {
                element.classList.remove('animate-highlight');
            }, 2000); // Animation duration
        };

        if (currentPage === 'profile') {
            const element = document.getElementById('rewards-section');
            if (element) {
                highlightAndScroll(element);
            }
        } else {
            sessionStorage.setItem('scrollTo', 'rewards-section');
            onNavigate('profile');
        }
    };

    return (
        <header className="w-full bg-[var(--color-secondary)] border-b-2 border-[var(--color-text)] shadow-md sticky top-0 z-40">
            <nav className="container mx-auto px-4 flex justify-between items-center h-20">
                <div className="flex items-center gap-8">
                    <button onClick={() => onNavigate('practice')} className="flex items-center gap-2 h-12">
                            <Logo className="h-full w-auto" />
                    </button>
                    {/* Desktop Links */}
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
                    {user.isGuest ? (
                        <button
                            onClick={onLogout}
                            className="btn-vintage font-bold py-2 px-4 rounded-sm text-lg whitespace-nowrap"
                        >
                            Login / Sign Up
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleCoinClick}
                                className="hidden sm:flex items-center gap-2 transition-transform hover:scale-105"
                                aria-label={`Coins: ${user.coins || 0}. Click to see rewards.`}
                            >
                                <CoinIcon className="h-8 w-8" />
                                <span className="font-bold text-lg text-[var(--color-text)]">{user.coins || 0}</span>
                            </button>
                            <div className="group relative">
                                <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-[var(--color-border)]/50">
                                    <Avatar avatarKey={user.profilePic} className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)]" />
                                    <span className="hidden lg:block font-semibold text-[var(--color-text)]">{user.username}</span>
                                </button>
                                {/* Profile dropdown contains all links, serving as primary nav on mobile */}
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--color-bg)] rounded-sm border border-[var(--color-border)] shadow-lg hidden group-hover:block" style={{zIndex: 50}}>
                                    <div className="flex sm:hidden items-center gap-2 p-2 border-b border-[var(--color-border)]">
                                        <CoinIcon className="h-6 w-6" />
                                        <span className="font-bold text-lg text-[var(--color-text)]">{user.coins || 0}</span>
                                    </div>
                                    {navLinks.map(({ page, label }) => (
                                        <button key={page} onClick={() => onNavigate(page)} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">{label}</button>
                                    ))}
                                    <div className="border-t border-[var(--color-border)] my-1"></div>
                                    <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Profile</button>
                                    <button onClick={onOpenSettings} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Settings</button>
                                    <div className="border-t border-[var(--color-border)] my-1"></div>
                                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-secondary)]">Logout</button>
                                </div>
                            </div>
                             <button
                                onClick={onLogout}
                                className="hidden md:block btn-vintage font-bold py-2 px-4 rounded-sm text-sm"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;