'use client';
import User from '@/components/Web/User';
import { Inter } from 'next/font/google';
import React, { Suspense, memo } from 'react';
import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { navbarList } from '@/components/Layout/Navbar/data';
import Navbar from '@/components/Layout/Navbar';
const inter = Inter({ subsets: ['latin'] });

interface BaseLayoutProps {
  children: React.ReactNode;
  excludeBreadcrumb?: boolean;
}

const BaseLayout = memo(function (props: BaseLayoutProps) {
  const { children, excludeBreadcrumb = false } = props;

  return (
    <div
      className={`w-full h-[100vh] flex flex-col overflow-hidden  ${inter.className} min-h-[100vh]`}
    >
      <div className="w-full bg-[#0B0B0B] flex items-center">
        <Navbar navList={navbarList} isFull={false}>
          <User></User>
        </Navbar>
        {/* {React.cloneElement(navbarInstance, { isFull: false }, <User></User>)} */}
        {/* {navbarInstance} */}
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto overflow-auto flex-1 w-full bg-[#F4F4F4]`}
      >
        <div className={`w-full h-full flex flex-col`}>
          {!excludeBreadcrumb && (
            <div className="container mx-auto">
              <Suspense>
                <Breadcrumb />
              </Suspense>
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
});

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
