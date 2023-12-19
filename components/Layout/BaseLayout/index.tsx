'use client';
import User from '@/components/v2/User';
import { Inter } from 'next/font/google';
import React, { useEffect } from 'react';
import Breadcrumb from '@/components/v2/Business/Breadcrumb';
import NavBar from '@/components/Layout/Navbar';
import { navbarList } from '@/components/Layout/Navbar/data';
const inter = Inter({ subsets: ['latin'] });

interface BaseLayoutProps {
  children: React.ReactNode;
  excludeBreadcrumb?: boolean;
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { children, excludeBreadcrumb = false } = props;

  useEffect(() => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap.scrollTo(0, 0);
    }
  });

  return (
    <div
      className={`w-full h-[100vh] flex flex-col overflow-hidden  ${inter.className} min-h-[100vh]`}
    >
      <div className="w-full bg-[#0B0B0B] flex items-center">
        <NavBar navList={navbarList} isFull={false}>
          <User></User>
        </NavBar>
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto overflow-auto flex-1 w-full bg-[white]`}
      >
        <div className={`w-full h-full flex flex-col`}>
          {!excludeBreadcrumb && (
            <div className="container mx-auto">
              <Breadcrumb />
            </div>
          )}
          <div className="w-full flex-1 relative">
            <main className="absolute left-0 top-0 w-full h-full ">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
