'use client';
import User from '@/components/Web/User';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import NavBar, { NavbarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { usePathname } from 'next/navigation';
import { useCheckPathname } from '@/hooks/useCheckPathname';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavbarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const pathname = usePathname();
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
      className={`w-full h-[100vh] flex flex-col overflow-hidden  ${
        inter.className
      } ${isNavbarFullPage ? '' : 'min-h-[100vh]'} `}
    >
      <div className="w-full bg-[#0B0B0B] flex items-center">
        <NavBar {...navbarData}>
          <User></User>
        </NavBar>
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto overflow-auto flex-1 w-full  ${
          isNavbarFullPage ? 'bg-[white]' : 'bg-[#F4F4F4]'
        }`}
      >
        <div className={`w-full h-full flex flex-col`}>
          {/* {renderBreadcrumb()} */}
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
