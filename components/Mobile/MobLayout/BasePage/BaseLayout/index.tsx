'use client';
import User from '@/components/Web/User';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import NavBar, { NavbarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { useCheckPathname, useCustomPathname } from '@/hooks/useCheckPathname';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavbarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const pathname = useCustomPathname();
  const { isNavbarFullPage, isExcludeBreadcrumbLink } = useCheckPathname();

  // const renderBreadcrumb = useCallback(() => {
  //   const { navList } = navbarData;
  //   if (isExcludeBreadcrumbLink) {
  //     return null;
  //   }

  //   for (let menu of navList) {
  //     if (menu.menu.some((v) => v.path === pathname)) {
  //       return null;
  //     }
  //   }

  //   return (
  //     <div className="container mx-auto">
  //       <Suspense>
  //         <Breadcrumb />
  //       </Suspense>
  //     </div>
  //   );
  // }, [pathname, navbarData, isExcludeBreadcrumbLink]);

  return (
    <div
      className={`flex h-[100vh] w-full flex-col overflow-hidden  ${
        inter.className
      } ${isNavbarFullPage ? '' : 'min-h-[100vh]'} `}
    >
      <div className="flex w-full items-center bg-neutral-black">
        <NavBar {...navbarData}>
          <User></User>
        </NavBar>
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto w-full flex-1 overflow-auto  ${
          isNavbarFullPage ? 'bg-[white]' : 'bg-neutral-off-white'
        }`}
      >
        <div className={`flex h-full w-full flex-col`}>
          {/* {renderBreadcrumb()} */}
          <div className="relative w-full flex-1">
            <main className="absolute left-0 top-0 h-full w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2Layout;
