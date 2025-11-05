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
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const loggedInUser = users.find(u => u.id === loggedInUserId);
      if (loggedInUser) {
        // Exclude password from the user object in the app's state
        const { password, ...userToLogin } = loggedInUser;
        setCurrentUser(userToLogin as User);
        setCurrentPage('practice');
      } else {
        // If the user ID from localStorage is invalid, clear it
        localStorage.removeItem('loggedInUserId');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    // The user object passed here should not have a password.
    setCurrentUser(user);
    // Persist session by storing only the user's ID.
    localStorage.setItem('loggedInUserId', user.id);
    setCurrentPage('practice');
  };

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUserId');
    setCurrentPage('login');
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      const existingUser = allUsers[userIndex];
      // Merge updates into the full user object to preserve all original fields like password, provider, etc.
      allUsers[userIndex] = { ...existingUser, ...updatedUser };
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
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {currentUser && <Navbar user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} currentPage={currentPage} />}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
