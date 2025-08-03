import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AIFloatingButton } from './AIFloatingButton';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      {!isProfilePage && <Footer />}
      <AIFloatingButton />
    </div>
  );
};