import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Footer: React.FC = () => {
  return (
    <footer className="w-full container mx-auto px-4 py-4 mt-8 flex justify-between items-center text-sm font-bold text-[var(--color-text-muted)]">
      <ThemeSwitcher />
      <a 
        href="https://www.instagram.com/amall.png_/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:text-[var(--color-text)] transition-colors"
      >
        made by amall.png
      </a>
      <p>v10.00</p>
    </footer>
  );
};

export default Footer;
