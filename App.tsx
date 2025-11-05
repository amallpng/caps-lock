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

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('login');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentPage('practice');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('practice');
  };

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('login');
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      // Preserve password when updating
      const originalPassword = allUsers[userIndex].password;
      allUsers[userIndex] = { ...updatedUser, password: originalPassword };
      localStorage.setItem('users', JSON.stringify(allUsers));
    }
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
        return <AboutPage />;
      default:
        return <TypingTest user={currentUser} onUserUpdate={handleUserUpdate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EFE9] text-[#282828]">
      {currentUser && <Navbar user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} currentPage={currentPage} />}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;