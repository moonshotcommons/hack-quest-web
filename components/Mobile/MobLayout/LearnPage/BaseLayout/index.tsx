'use client';
import React, { ReactNode } from 'react';
import NavBar from '../Navbar';

export interface V2LayoutProps {
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ children }) => {
  return (
    <div className={`relative w-full`}>
      <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-black">
        <NavBar></NavBar>
      </div>
      <div id="content-scroll-wrap" className={`m-auto w-full bg-white pt-[4rem]`}>
        {children}
      </div>
    </div>
  );
};

export default V2Layout;
