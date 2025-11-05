import React, { useState } from 'react';
import { User, Page } from '../types';
import Logo from './icons/Logo';
import Avatar from './Avatar';
import SettingsModal from './SettingsModal';

interface NavbarProps {
    user: User;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const navLinks: { page: Page, label: string }[] = [
        { page: 'practice', label: 'Practice' },
        { page: 'challenge', label: 'Challenges' },
        { page: 'leaderboard', label: 'Leaderboard' },
        { page: 'about', label: 'About' },
    ];

    return (
        <>
            <header className="w-full bg-[#D3CFC2] border-b-2 border-[#282828] shadow-md sticky top-0 z-40">
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
                                    className={`text-lg font-semibold transition-colors ${currentPage === page ? 'text-[#4A6B69] underline' : 'text-gray-600 hover:text-[#282828]'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-gray-600 hover:text-[#282828] transition-colors p-2 rounded-full hover:bg-[#A9A391]/50"
                            aria-label="Settings"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                        <div className="group relative">
                            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-[#A9A391]/50">
                                <Avatar avatarKey={user.profilePic} className="w-10 h-10 rounded-full border-2 border-[#4A6B69]" />
                                <span className="hidden lg:block font-semibold text-[#282828]">{user.username}</span>
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#F1EFE9] rounded-sm border border-[#A9A391] shadow-lg hidden group-hover:block" style={{zIndex: 50}}>
                                <button onClick={() => onNavigate('profile')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#D3CFC2]">Profile</button>
                                <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100">Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </>
    );
};

export default Navbar;
