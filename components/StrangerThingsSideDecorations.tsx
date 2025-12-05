import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const DemogorgonSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
        <path d="M50 20 C60 10, 80 10, 90 30 C95 45, 85 60, 70 70 C80 80, 70 95, 50 90 C30 95, 20 80, 30 70 C15 60, 5 45, 10 30 C20 10, 40 10, 50 20 Z" fill="#330000" />
        {/* Petals opening */}
        <path d="M50 50 L20 20 M50 50 L80 20 M50 50 L20 80 M50 50 L80 80 M50 50 L50 10" stroke="#8a0000" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#110000" />
    </svg>
);

const BikeSVG = () => (
    <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
        <circle cx="20" cy="40" r="15" stroke="#330000" strokeWidth="2" fill="none" />
        <circle cx="80" cy="40" r="15" stroke="#330000" strokeWidth="2" fill="none" />
        <path d="M20 40 L45 40 L35 20 L20 40" stroke="#330000" strokeWidth="2" fill="none" />
        <path d="M80 40 L55 40 L65 15 L50 15" stroke="#330000" strokeWidth="2" fill="none" />
        <path d="M35 20 L65 20" stroke="#330000" strokeWidth="2" />
    </svg>
);

const VineSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 800" className={className} preserveAspectRatio="none">
        <path d="M50 0 Q 80 100, 20 200 T 50 400 Q 10 500, 60 600 T 40 800" 
              stroke="#1a0505" strokeWidth="3" fill="none" />
        <path d="M30 0 Q 10 150, 60 250 T 20 500 Q 80 650, 30 800" 
              stroke="#0f0202" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Thorns */}
        <path d="M20 200 L10 190 M50 400 L60 390 M60 600 L70 610" stroke="#330000" strokeWidth="2" />
    </svg>
);

const StrangerThingsSideDecorations: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    if (theme.id !== 'stranger-things') return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Left Side Decoration - Vines & Bike */}
            <div className="absolute top-0 left-0 h-full w-24 md:w-32 flex flex-col justify-between">
                <VineSVG className="w-full h-full absolute top-0 left-0" />
                <div className="relative z-10 w-full h-32 mt-auto mb-20 animate-bounce-slow" style={{ animationDuration: '4s' }}>
                    <BikeSVG />
                </div>
            </div>

            {/* Right Side Decoration - Vines & Demogorgon */}
            <div className="absolute top-0 right-0 h-full w-24 md:w-32 flex flex-col justify-between">
                <VineSVG className="w-full h-full absolute top-0 right-0 transform scale-x-[-1]" />
                <div className="relative z-10 w-full h-32 mt-20 animate-pulse-slow">
                    <DemogorgonSVG />
                </div>
            </div>

            {/* Atmospheric Overlay */}
            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow infinite ease-in-out;
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 5s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default StrangerThingsSideDecorations;