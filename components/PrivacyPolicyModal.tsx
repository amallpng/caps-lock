import React from 'react';

interface PrivacyPolicyModalProps {
    onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[var(--color-bg)] p-8 rounded-sm border-2 border-[var(--color-text)] w-full max-w-2xl shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--color-secondary)]" 
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 text-center">Privacy Policy</h2>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 text-[var(--color-text-muted)] leading-relaxed">
                    <p><strong>Last Updated:</strong> October 26, 2023</p>
                    
                    <p>Welcome to Typewriter. We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our web application.</p>
                    
                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">1. Data Storage Location</h3>
                    <p>
                        <strong>All of your data is stored locally in your web browser's `localStorage`.</strong> We do not have a central server, and your personal information, profile settings, and typing history are never transmitted to or stored on any external server or database controlled by us.
                    </p>

                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">2. Information We "Collect" (Store Locally)</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Account Information:</strong> For registered users, we store your username, password (for local accounts), email (for Google login or optional course signup), and profile picture selection.</li>
                        <li><strong>Typing Data:</strong> We store your test history (WPM, accuracy), your best WPM score, daily streak, and progress in the Challenge Mode.</li>
                        <li><strong>Guest Data:</strong> If you use the app as a guest, your data is temporary and is not saved to `localStorage`. Your session data is lost when you close the tab or browser.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">3. How We Use Your Information</h3>
                    <p>
                        Your locally stored data is used solely to provide the application's features:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>To authenticate you and load your profile.</li>
                        <li>To display your progress, badges, and performance analysis.</li>
                        <li>To rank you on the leaderboard based on your best WPM.</li>
                        <li>To save your progress through the 100 Challenges.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">4. Sharing of Information</h3>
                    <p>
                        We do not share your data with any third parties because your data is not accessible to us. It resides only within your own browser.
                    </p>

                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">5. Data Control and Deletion</h3>
                    <p>
                        You have full control over your data. You can delete all your stored information at any time by clearing your browser's site data for this domain.
                    </p>
                     <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">6. Changes to This Policy</h3>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
                    </p>

                    <h3 className="text-xl font-semibold text-[var(--color-text)] pt-4">7. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:amalazeesa@gmail.com" className="text-[var(--color-primary)] hover:underline">amalazeesa@gmail.com</a>.
                    </p>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="btn-vintage font-bold py-2 px-6 rounded-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;