import React from 'react';

const certificateImageUrl = "https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/1S-WUN1oT6Sg2Jk4sN635a-p0Y_o_J-V-/caps_lock_certificate.jpg";

interface CertificateProps {
  isUnlocked: boolean;
}

const Certificate: React.FC<CertificateProps> = ({ isUnlocked }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateImageUrl;
    link.setAttribute('download', 'CAPS_LOCK_Certificate_of_Achievement.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isUnlocked) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">Certificate is Locked</h3>
        <p className="text-lg mt-4 text-[var(--color-text-muted)]">You must complete all 100 challenges in Challenge Mode to view your Certificate of Achievement.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-3xl">
          <img 
            src={certificateImageUrl} 
            alt="Certificate of Achievement" 
            className="w-full h-auto" 
          />
        </div>
        <button
            onClick={handleDownload}
            className="btn-vintage font-bold py-3 px-6 rounded-sm text-xl"
        >
            Download Certificate
        </button>
    </div>
  );
};

export default Certificate;