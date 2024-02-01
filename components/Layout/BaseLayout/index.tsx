'use client';
import User from '@/components/Web/User';
import React, { Suspense, memo } from 'react';
import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { navbarList } from '@/components/Layout/Navbar/data';
import Navbar from '@/components/Layout/Navbar';

interface BaseLayoutProps {
  children: React.ReactNode;
  excludeBreadcrumb?: boolean;
}

const BaseLayout = memo(function (props: BaseLayoutProps) {
  const { children, excludeBreadcrumb = false } = props;

  return (
    <div
      className={`flex h-[100vh] min-h-[100vh] w-full flex-col  overflow-hidden`}
    >
      <div className="flex w-full items-center bg-neutral-black">
        <Navbar navList={navbarList} isFull={false}>
          <User></User>
        </Navbar>
        {/* {React.cloneElement(navbarInstance, { isFull: false }, <User></User>)} */}
        {/* {navbarInstance} */}
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto w-full flex-1 overflow-auto bg-neutral-off-white`}
      >
        <div className={`flex h-full w-full flex-col`}>
          {!excludeBreadcrumb && (
            <div className="container mx-auto">
              <Suspense>
                <Breadcrumb />
              </Suspense>
            </div>
          )}
          <div className="relative w-full flex-1">
            <main className="absolute left-0 top-0 h-full w-full ">
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
