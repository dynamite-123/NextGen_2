import React from 'react';
import Navbar  from './NavBar';
import { Footer } from './Footer';
import { Outlet } from 'react-router';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow">
        {children}
      <Outlet/>
      </main>
      <Footer />
    </div>
  );
};
