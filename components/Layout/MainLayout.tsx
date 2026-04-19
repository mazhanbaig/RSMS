'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useApp } from '@/lib/context/AppContext';

interface MainLayoutProps {
  children: React.ReactNode;
  hideLayout?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, hideLayout = false }) => {
  const { isSidebarOpen } = useApp();

  if (hideLayout) {
    return children;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={`
            flex-1 transition-all duration-300
            ${isSidebarOpen ? 'ml-0 sm:ml-20' : 'ml-0'}
          `}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
