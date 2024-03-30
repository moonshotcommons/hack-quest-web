'use client';
import React, { ReactNode } from 'react';
import NavBar from '../Navbar';

export interface V2LayoutProps {
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ children }) => {
  return (
    <div className={`flex h-[100vh] w-full flex-col overflow-hidden`}>
      <div className="flex w-full items-center bg-neutral-black">
        <NavBar></NavBar>
      </div>
      <div id="content-scroll-wrap" className={`w-full flex-1  bg-neutral-white`}>
        <div className={`flex h-full w-full flex-col`}>
          <div className="relative w-full flex-1">
            <main className="absolute left-0 top-0 h-full w-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2Layout;
