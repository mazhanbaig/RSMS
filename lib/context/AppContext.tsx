'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'agent' | 'viewer';

export interface User {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  role: UserRole;
}

export interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({
          uid: userData.uid,
          email: userData.email,
          name: userData.name,
          photoURL: userData.photoURL,
          role: userData.role || 'agent',
        });
      } catch (e) {
        console.error('Failed to load user from localStorage', e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const value: AppContextType = {
    isDarkMode,
    toggleDarkMode,
    user,
    setUser,
    isSidebarOpen,
    toggleSidebar,
  };

  if (!mounted) return children;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
