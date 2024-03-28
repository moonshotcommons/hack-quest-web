'use client';
import User from '@/components/Web/User';
import React, { ReactNode, useEffect } from 'react';
import NavBar, { NavBarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { useCheckPathname } from '@/hooks/router/useCheckPathname';

export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const { isNavbarFullPage, isExcludeBreadcrumbLink } = useCheckPathname();

  useEffect(() => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={`flex h-[100vh] w-full flex-col overflow-hidden   `}>
      <NavBar {...navbarData}>
        <User></User>
      </NavBar>
      <div
        id="content-scroll-wrap"
        className={`m-auto w-full flex-1 overflow-auto  ${isNavbarFullPage ? 'bg-[white]' : 'bg-neutral-off-white'}`}
      >
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
