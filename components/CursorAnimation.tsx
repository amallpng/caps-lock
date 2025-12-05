import React, { useEffect, useState } from 'react';

const CursorAnimation: React.FC = () => {
    const [pos, setPos] = useState({ x: -500, y: -500 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: 0,
                backgroundImage: 'url(https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/1S8L4X_8HAEk-Rj_j6C9-f2C7RkF-qXpE/typewriter_art_lg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                maskImage: `radial-gradient(circle 250px at ${pos.x}px ${pos.y}px, black, transparent)`,
                WebkitMaskImage: `radial-gradient(circle 250px at ${pos.x}px ${pos.y}px, black, transparent)`,
            }}
        />
    );
};

export default CursorAnimation;