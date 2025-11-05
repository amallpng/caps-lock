import React from 'react';

const certificateImageUrl = "https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/1S-WUN1oT6Sg2Jk4sN635a-p0Y_o_J-V-/caps_lock_certificate.jpg";

const Certificate: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl">
      <img 
        src={certificateImageUrl} 
        alt="Certificate of Achievement" 
        className="w-full h-auto" 
      />
    </div>
  );
};

export default Certificate;
