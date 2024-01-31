'use client';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import NavBar from '../Navbar';

const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ children }) => {
  return (
    <div
      className={`w-full h-[100vh] flex flex-col overflow-hidden  ${inter.className}`}
    >
      <div className="w-full bg-neutral-black flex items-center">
        <NavBar></NavBar>
      </div>
      <div
        id="content-scroll-wrap"
        className={`w-full flex-1  bg-neutral-white`}
      >
        <div className={`w-full h-full flex flex-col`}>
          <div className="w-full flex-1 relative">
            <main className="absolute left-0 top-0 w-full h-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2Layout;
