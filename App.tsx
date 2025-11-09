import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TypingTest from './components/TypingTest';
import ChallengeMode from './components/ChallengeMode';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { User, Page } from './types';
import LeaderboardPage from './components/LeaderboardPage';
import AboutPage from './components/AboutPage';
import ChallengeSignupModal from './components/ChallengeSignupModal';
import LearnPythonPage from './components/LearnPythonPage';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TutorialModal from './components/TutorialModal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const loggedInUser = users.find(u => u.id === loggedInUserId);
      if (loggedInUser) {
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
      case 'leaderboard':
        return <LeaderboardPage currentUser={currentUser} />;
      case 'about':
        return <AboutPage onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />;
      case 'learnPython':
        return <LearnPythonPage />;
      default:
        return <TypingTest user={currentUser} onUserUpdate={handleUserUpdate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {currentUser && <Navbar user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} currentPage={currentPage} onOpenSettings={() => setIsSettingsModalOpen(true)} />}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
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
      <Footer />
    </div>
  );
};

export default App;