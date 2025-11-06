import React, { useRef, useEffect, useState } from 'react';
import Badge from './Badge';
import { Task } from '../types';

interface ScratchCardProps {
  isUnlocked: boolean;
  isRevealed: boolean;
  onReveal: () => void;
}

const grandChallengeBadge: Task = {
  id: 999,
  level: 100,
  text: '',
  wpmGoal: 0,
  accuracyGoal: 0,
  coinReward: 0,
  badge: {
    name: "Challenge Champion",
    icon: 'GrandMasterTrophy',
  },
};

const SCRATCH_BRUSH_SIZE = 40;
const REVEAL_THRESHOLD = 70; // Percentage

const ScratchCard: React.FC<ScratchCardProps> = ({ isUnlocked, isRevealed, onReveal }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratching, setIsScratching] = useState(false);
    const [hasBeenRevealed, setHasBeenRevealed] = useState(isRevealed);
    
    useEffect(() => {
        if (isRevealed && !hasBeenRevealed) {
            setHasBeenRevealed(true);
        }
    }, [isRevealed, hasBeenRevealed]);


    const getCanvasContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return canvas.getContext('2d');
    };

    const drawCover = () => {
        const ctx = getCanvasContext();
        if (!ctx) return;
        const canvas = ctx.canvas;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#C0C0C0');
        gradient.addColorStop(1, '#A9A9A9');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#282828';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold 24px 'Special Elite', monospace`;
        ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
    };

    useEffect(() => {
        if (isUnlocked && !hasBeenRevealed) {
            drawCover();
        }
    }, [isUnlocked, hasBeenRevealed]);

    const getPosition = (event: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const scratch = (x: number, y: number) => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, SCRATCH_BRUSH_SIZE, 0, 2 * Math.PI, false);
        ctx.fill();
    };
    
    const checkReveal = () => {
        const ctx = getCanvasContext();
        if (!ctx) return;
        
        const canvas = ctx.canvas;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const totalPixels = data.length / 4;
        let transparentPixels = 0;

        for (let i = 3; i < data.length; i += 4) {
            if (data[i] === 0) {
                transparentPixels++;
            }
        }

        const percentage = (transparentPixels / totalPixels) * 100;
        if (percentage > REVEAL_THRESHOLD) {
            onReveal();
        }
    };
    
    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isUnlocked || hasBeenRevealed) return;
        setIsScratching(true);
        const pos = getPosition(e);
        if (pos) {
            scratch(pos.x, pos.y);
        }
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isScratching || !isUnlocked || hasBeenRevealed) return;
        e.preventDefault();
        const pos = getPosition(e);
        if (pos) {
            scratch(pos.x, pos.y);
        }
    };

    const handleEnd = () => {
        if (!isScratching) return;
        setIsScratching(false);
        checkReveal();
    };

    if (hasBeenRevealed) {
        return (
             <div className="w-full max-w-sm bg-[var(--color-bg)] p-4 rounded-sm border-2 border-[var(--color-primary)] flex flex-col items-center text-center">
                 <Badge task={grandChallengeBadge} />
             </div>
        );
    }

    return (
        <div className="relative w-full max-w-sm bg-[var(--color-bg)] p-2 rounded-sm border-2 border-[var(--color-border)] overflow-hidden group transition-transform hover:scale-105">
            <div className={`aspect-video w-full transition-all duration-300 ${!isUnlocked ? 'blur-md' : ''}`}>
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {/* The reward, hidden underneath */}
                    <Badge task={grandChallengeBadge} />

                    {/* The canvas, covering the reward */}
                    <canvas
                        ref={canvasRef}
                        width="384" // max-w-sm is 384px
                        height="216"
                        className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500"
                        style={{ opacity: hasBeenRevealed ? 0 : 1, touchAction: 'none' }}
                        onMouseDown={handleStart}
                        onMouseMove={handleMove}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={handleStart}
                        onTouchMove={handleMove}
                        onTouchEnd={handleEnd}
                    />
                </div>
            </div>

            {!isUnlocked && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="font-bold text-xl mt-2">Locked</p>
                    <p className="text-sm text-center">Complete all 100 challenges to unlock.</p>
                </div>
            )}
        </div>
    );
};

export default ScratchCard;
