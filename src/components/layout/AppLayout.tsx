import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC] text-[#404040] antialiased selection:bg-[#EBF5FC] selection:text-[#0070C0] overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex-1 focus:outline-none w-full max-w-full overflow-x-clip">
        {children}
      </main>
      <Footer />
    </div>
  );
};
