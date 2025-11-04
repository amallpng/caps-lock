import React from 'react';
import { User, Page } from '../types';
import Logo from './icons/Logo';
import { AvatarIcons, avatarOptions } from './icons/AvatarIcons';

interface NavbarProps {
  user: User;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage }) => {
  const navItems: { page: Page; label: string }[] = [
    { page: 'practice', label: 'Practice' },
    { page: 'challenge', label: 'Challenges' },
    { page: 'leaderboard', label: 'Leaderboard'}
  ];

  const AvatarComponent = AvatarIcons[user.profilePic] || AvatarIcons[avatarOptions[0]];

  return (
    <header className="bg-[#D3CFC2]/80 backdrop-blur-sm sticky top-0 z-10 border-b-2 border-[#282828]">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => onNavigate('practice')}>
          <Logo className="h-8 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`text-lg font-medium transition-colors ${
                currentPage === item.page
                  ? 'text-[#282828] underline'
                  : 'text-gray-700 hover:text-[#282828]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 text-[#282828] hover:text-[#4A6B69] transition-colors">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#A9A391] bg-white">
               <AvatarComponent className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold hidden sm:inline">{user.username}</span>
          </button>
          <button
            onClick={onLogout}
            className="bg-[#C8A6A6] hover:bg-[#B18E8E] text-[#282828] font-bold py-2 px-4 rounded-sm border-2 border-[#282828]"
          >
            Logout
          </button>
        </div>
      </nav>
       <div className="md:hidden flex justify-around p-2 bg-[#D3CFC2] border-t border-[#A9A391]">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`text-base font-medium transition-colors p-2 rounded-sm w-full ${
                currentPage === item.page
                  ? 'text-white bg-[#4A6B69]'
                  : 'text-gray-700 hover:bg-[#A9A391]/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
    </header>
  );
};

export default Navbar;