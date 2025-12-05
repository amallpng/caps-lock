import React, { useEffect, useState } from 'react';

interface StrangerThingsIntroProps {
  onComplete: () => void;
}

const StrangerThingsIntro: React.FC<StrangerThingsIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Fade In
    setTimeout(() => setStage(1), 100);
    // Stage 2: Hold/Zoom
    setTimeout(() => setStage(2), 3500);
    // Stage 3: Fade Out
    setTimeout(() => {
        setStage(3);
        setTimeout(onComplete, 1000); // Wait for fade out to finish
    }, 4000);
  }, [onComplete]);

  // Generate random spores/ash particles
  const spores = Array.from({ length: 40 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 4}s`,
      animationDelay: `${Math.random() * 2}s`,
      size: `${Math.random() * 3 + 1}px`
  }));

  return (
    <div 
        className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${stage === 3 ? 'opacity-0' : 'opacity-100'}`}
    >
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}></div>

        {/* Floating Spores (Ash from the Upside Down) */}
        {spores.map((s, i) => (
            <div 
                key={i}
                className="spore"
                style={{
                    left: s.left,
                    width: s.size,
                    height: s.size,
                    animationDuration: s.animationDuration,
                    animationDelay: s.animationDelay
                }}
            />
        ))}

        {/* Top and Bottom Bars to simulate letterbox */}
        <div className="absolute top-0 left-0 w-full h-16 bg-black z-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-30"></div>

        <div className={`relative z-40 transform transition-all duration-[4000ms] ease-out ${stage >= 1 ? 'scale-100' : 'scale-150'}`}>
            <h1 className="stranger-things-glow text-6xl md:text-9xl font-bold tracking-widest text-transparent border-none outline-none select-none">
                <span className="inline-block animate-stranger-zoom delay-100">C</span>
                <span className="inline-block animate-stranger-zoom delay-300">A</span>
                <span className="inline-block animate-stranger-zoom delay-500">P</span>
                <span className="inline-block animate-stranger-zoom delay-200">S</span>
                <span className="inline-block w-8 md:w-16"></span>
                <span className="inline-block animate-stranger-zoom delay-700">L</span>
                <span className="inline-block animate-stranger-zoom delay-400">O</span>
                <span className="inline-block animate-stranger-zoom delay-600">C</span>
                <span className="inline-block animate-stranger-zoom delay-800">K</span>
            </h1>
            
            {/* Horizontal lines typical of the intro */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] transform transition-all duration-[3000ms] ${stage >= 1 ? 'scale-x-100 opacity-80' : 'scale-x-0 opacity-0'}`}></div>
             <div className={`absolute bottom-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] transform transition-all duration-[3000ms] ${stage >= 1 ? 'scale-x-100 opacity-80' : 'scale-x-0 opacity-0'}`}></div>
        </div>
    </div>
  );
};

export default StrangerThingsIntro;