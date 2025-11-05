import React, { useState, useEffect, useRef } from 'react';

interface CustomTimeModalProps {
  initialTime: number;
  onClose: () => void;
  onSave: (time: number) => void;
}

const CustomTimeModal: React.FC<CustomTimeModalProps> = ({ initialTime, onClose, onSave }) => {
  const [time, setTime] = useState(initialTime);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    // Clamp the value between 5 and 300 before saving
    const clampedTime = Math.max(5, Math.min(300, isNaN(time) ? 60 : time));
    onSave(clampedTime);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setTime(value);
    } else if (e.target.value === '') {
      setTime(NaN); // Use NaN to represent an empty input
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-xs shadow-lg"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">Custom Time</h2>
        <div className="flex flex-col items-center gap-4">
          <input
            ref={inputRef}
            type="number"
            value={isNaN(time) ? '' : time}
            onChange={handleChange}
            min="5"
            max="300"
            className="w-full text-center text-4xl font-bold bg-[var(--color-bg)] text-[var(--color-text)] border-2 border-[var(--color-border)] rounded-sm p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Custom time in seconds"
            autoFocus
          />
          <p className="text-[var(--color-text-muted)]">Enter a time between 5 and 300 seconds.</p>
        </div>
        <div className="mt-8 flex justify-end gap-4">
           <button 
             onClick={onClose} 
             className="bg-transparent text-[var(--color-text-muted)] font-semibold py-2 px-4 rounded-sm border-2 border-dashed border-[var(--color-border)] hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)] transition-colors"
           >
                Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-vintage font-bold py-2 px-6 rounded-sm"
            >
              Set
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimeModal;
