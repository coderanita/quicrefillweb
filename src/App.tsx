import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import Loader from './components/Loader';
import AppRoutes from './routes/AppRoutes';

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false); // Login/Logout loader
  const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false); // Page change loader

  const location = useLocation();
  const isFirstRender = useRef<boolean>(true); // Track first render
  // State to manage sidebar collapse/expand
      const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
      // Update sidebar on screen resize
      useEffect(() => {
          const handleResize = () => {
              if (window.innerWidth <= 768) {
                  setSidebarCollapsed(true);
              } else {
                  setSidebarCollapsed(false);
              }
          };
  
          window.addEventListener('resize', handleResize);
  
          // Clean up the event listener
          return () => window.removeEventListener('resize', handleResize);
      }, []);
      // Function to toggle sidebar
      const toggleSidebar = () => {
          setSidebarCollapsed(!sidebarCollapsed);
      };
  // Route loader - skip on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsRouteLoading(true);
    const timer = setTimeout(() => {
      setIsRouteLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Check local storage on app load
  useEffect(() => {
    const savedUserId = localStorage.getItem('loggedInUserId');

    if (savedUserId) {
      setCurrentUserId(savedUserId);
      setIsLoggedIn(true);
    }

    const timer = setTimeout(() => {
      setIsAuthChecked(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Keep local storage in sync
  useEffect(() => {
    if (isLoggedIn && currentUserId) {
      localStorage.setItem('loggedInUserId', currentUserId);
    } else {
      localStorage.removeItem('loggedInUserId');
    }
  }, [isLoggedIn, currentUserId]);

  // Handle Login
  const handleLogin = (userId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentUserId(userId);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setCurrentUserId(null);
      localStorage.removeItem('loggedInUserId');
      setIsLoading(false);
    }, 1000);
  };

  // Show loader
  if (!isAuthChecked || isLoading || isRouteLoading) {
    return <Loader />;
  }

  return (
    <AppRoutes
      isLoggedIn={isLoggedIn}
      currentUserId={currentUserId}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      toggleSidebar={toggleSidebar}
      sidebarCollapsed={sidebarCollapsed}
    />
  );
};

export default AppWrapper;
