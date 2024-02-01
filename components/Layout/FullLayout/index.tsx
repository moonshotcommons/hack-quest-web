'use client';
import User from '@/components/Web/User';
import React, { useContext, useEffect, Suspense } from 'react';
import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import NavBar from '@/components/Layout/Navbar';
import { navbarList } from '@/components/Layout/Navbar/data';
import { NavbarContext } from '@/components/Provider/Navbar';

interface FullLayoutProps {
  children: React.ReactNode;
  excludeBreadcrumb?: boolean;
}

const FullLayout = (props: FullLayoutProps) => {
  const { children, excludeBreadcrumb = false } = props;

  useEffect(() => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap.scrollTo(0, 0);
    }
  }, []);

  const { navbarInstance } = useContext(NavbarContext);

  return (
    <div
      className={`flex h-[100vh] min-h-[100vh] w-full flex-col  overflow-hidden`}
    >
      <div className="flex w-full items-center bg-neutral-black">
        <NavBar navList={navbarList} isFull={true}>
          <User></User>
        </NavBar>
        {/* {React.cloneElement(navbarInstance, { isFull: true }, <User></User>)} */}
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
};

export default FullLayout;
