'use client';
import React, { ReactNode, useEffect } from 'react';
import NavBar, { NavBarProps } from '../Navbar';
import { LoginResponse } from '@/service/webApi/user/type';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';

export interface V2LayoutProps {
  navbarData: Omit<NavBarProps, 'userInfo'>;
  userInfo: Partial<LoginResponse> | null;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children, userInfo }) => {
  useEffect(() => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={`flex h-[100vh] w-full flex-col overflow-hidden   `}>
      <NavBar {...navbarData} userInfo={userInfo}></NavBar>
      <div id="content-scroll-wrap" className={`m-auto w-full flex-1 overflow-auto bg-neutral-off-white`}>
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
