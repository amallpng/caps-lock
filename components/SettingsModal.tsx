import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

interface SettingsModalProps {
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { settings, toggleSound } = useContext(SettingsContext);

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[#F1EFE9] p-8 rounded-sm border-2 border-[#282828] w-full max-w-sm shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#4A6B69]">Settings</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#D3CFC2]" aria-label="Close settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#D3CFC2]/50 rounded-sm border border-[#A9A391]">
                        <label htmlFor="sound-toggle" className="text-lg font-semibold text-gray-700">Typewriter Sounds</label>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="sound-toggle"
                                id="sound-toggle"
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                checked={settings.soundEnabled}
                                onChange={toggleSound}
                                style={{
                                    left: settings.soundEnabled ? '1.5rem' : '0.125rem',
                                    transition: 'left 0.2s ease-in-out',
                                    borderColor: settings.soundEnabled ? '#4A6B69' : '#A9A391',
                                }}
                            />
                            <label htmlFor="sound-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                style={{ backgroundColor: settings.soundEnabled ? '#4A6B69' : '#A9A391' }}
                            ></label>
                        </div>
                    </div>
                </div>
                 <button onClick={onClose} className="w-full mt-8 btn-vintage font-bold py-2 px-4 rounded-sm">
                    Done
                </button>
            </div>
            <style>{`
                .toggle-checkbox:checked {
                    right: 0;
                }
            `}</style>
        </div>
    );
};

export default SettingsModal;