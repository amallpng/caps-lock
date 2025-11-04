import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 mt-8">
      <p className="text-sm font-bold opacity-50 text-[#282828]">
        <a 
          href="https://www.instagram.com/amall.png_/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:opacity-100 transition-opacity"
        >
          made by amall.png
        </a>
      </p>
    </footer>
  );
};

export default Footer;