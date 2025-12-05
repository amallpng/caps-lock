import React, { useState, useEffect, useCallback, useContext } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TypingTest from './components/TypingTest';
import ChallengeMode from './components/ChallengeMode';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { User, Page } from './types';
import AboutPage from './components/AboutPage';
import ChallengeSignupModal from './components/ChallengeSignupModal';
import LearnPythonPage from './components/LearnPythonPage';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TutorialModal from './components/TutorialModal';
import SettingsModal from './components/SettingsModal';
import CursorAnimation from './components/CursorAnimation';
import { ThemeContext } from './contexts/ThemeContext';
import StrangerThingsIntro from './components/StrangerThingsIntro';
import StrangerThingsSideDecorations from './components/StrangerThingsSideDecorations';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Intro Animation State
  const { theme } = useContext(ThemeContext);
  const [showThemeIntro, setShowThemeIntro] = useState(false);

  useEffect(() => {
    if (theme.id === 'stranger-things') {
        setShowThemeIntro(true);
    } else {
        setShowThemeIntro(false);
    }
  }, [theme.id]);


  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const loggedInUser = users.find(u => u.id === loggedInUserId);
      if (loggedInUser) {
        // Data migration for python challenge progress
        if (loggedInUser.pythonChallengeProgress) {
            if ('code' in loggedInUser.pythonChallengeProgress) {
              const newProgress = { currentLevel: loggedInUser.pythonChallengeProgress.currentLevel };
              loggedInUser.pythonChallengeProgress = newProgress;
            }
            if (loggedInUser.pythonChallengeProgress.attemptsToday === undefined) {
                loggedInUser.pythonChallengeProgress.attemptsToday = 0;
            }
            if (loggedInUser.pythonChallengeProgress.lastAttemptTimestamp === undefined) {
                loggedInUser.pythonChallengeProgress.lastAttemptTimestamp = 0;
            }
        } else {
            loggedInUser.pythonChallengeProgress = { currentLevel: 1, attemptsToday: 0, lastAttemptTimestamp: 0 };
        }
        
        const { password, ...userToLogin } = loggedInUser;
        setCurrentUser(userToLogin as User);
        setCurrentPage('practice');
        if (loggedInUser.isFirstLogin === true && !loggedInUser.isGuest) {
          setShowOnboarding(true);
        }
      } else {
        localStorage.removeItem('loggedInUserId');
      }
    }
  }, []);

  useEffect(() => {
    if (showOnboarding) {
        setIsTutorialModalOpen(true);
    }
  }, [showOnboarding]);


  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (!user.isGuest) {
      localStorage.setItem('loggedInUserId', user.id);
    }
    if (user.isFirstLogin === true && !user.isGuest) {
        setShowOnboarding(true);
    }
    setCurrentPage('practice');
  };

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUserId');
    setCurrentPage('login');
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    if (updatedUser.isGuest) {
      return;
    }
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      const existingUser = allUsers[userIndex];
      allUsers[userIndex] = { ...existingUser, ...updatedUser };
      localStorage.setItem('users', JSON.stringify(allUsers));
    }
  };

  const handleTutorialFinish = () => {
    setIsTutorialModalOpen(false);
    setIsChallengeModalOpen(true);
    setShowOnboarding(false);
  };

  const handleChallengeSignup = (name: string, email: string) => {
    if (!currentUser) return;
    const updatedUser = {
        ...currentUser,
        username: name,
        email: email,
        isFirstLogin: false,
        isChallengeParticipant: true,
    };
    handleUserUpdate(updatedUser);
    setIsChallengeModalOpen(false);
  };

  const handleChallengeSkip = () => {
    if (!currentUser) return;
    const updatedUser = {
        ...currentUser,
        isFirstLogin: false,
    };
    handleUserUpdate(updatedUser);
    setIsChallengeModalOpen(false);
  };


  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case 'register':
          return <RegisterPage onRegisterSuccess={() => setCurrentPage('login')} onSwitchToLogin={() => setCurrentPage('login')} />;
        default:
          return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage('register')} />;
      }
    }

    switch (currentPage) {
      case 'practice':
        return <TypingTest user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'challenge':
        return <ChallengeMode user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'profile':
        return <ProfilePage user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'about':
        return <AboutPage onOpenPrivacyModal={() => setIsPrivacyModalOpen(false)} />;
      case 'learnPython':
        return <LearnPythonPage user={currentUser} onUserUpdate={handleUserUpdate} />;
      default:
        return <TypingTest user={currentUser} onUserUpdate={handleUserUpdate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-x-hidden">
      {showThemeIntro && <StrangerThingsIntro onComplete={() => setShowThemeIntro(false)} />}
      <CursorAnimation />
      <StrangerThingsSideDecorations />
      {currentUser && <Navbar user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} currentPage={currentPage} onOpenSettings={() => setIsSettingsModalOpen(true)} />}
      <main className="relative z-10 flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {isTutorialModalOpen && <TutorialModal onClose={handleTutorialFinish} />}
        {isChallengeModalOpen && currentUser && (
            <ChallengeSignupModal
                user={currentUser}
                onSignup={handleChallengeSignup}
                onClose={handleChallengeSkip}
            />
        )}
        {isPrivacyModalOpen && <PrivacyPolicyModal onClose={() => setIsPrivacyModalOpen(false)} />}
        {isSettingsModalOpen && <SettingsModal onClose={() => setIsSettingsModalOpen(false)} />}
        {renderPage()}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default App;