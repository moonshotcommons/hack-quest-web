import User from '@/components/v2/User';
import { Inter } from 'next/font/google';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import Breadcrumb from '@/components/v2/Breadcrumb';
import { useRouter } from 'next/router';
import { excludeLink } from '@/components/v2/Layout/Navbar/data';
import NavBar, { NavBarProps } from '@/components/v2/Layout/Navbar';
import { MenuLink } from '@/components/v2/Layout/Navbar/type';
import { cn } from '@/helper/utils';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const MantleLayout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  const [showSecondNav, setShowSecondNav] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const getFull = () => {
    return regex.test(pathname) || pathname.startsWith('/preview');
  };
  const renderBreadcrumb = useCallback(() => {
    const full = getFull();
    const { navList } = navbarData;
    if (
      full ||
      pathname === '/' ||
      !navList.length ||
      ~excludeLink.indexOf(pathname as MenuLink)
    )
      return null;
    for (let menu of navList) {
      if (menu.menu.some((v) => v.path === pathname)) {
        return null;
      }
    }
    return (
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
    );
  }, [pathname, navbarData]);

  useEffect(() => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap.scrollTo(0, 0);
    }
  });

  return (
    <div
      className={`w-full h-[100vh] flex flex-col overflow-hidden  ${
        inter.className
      } ${
        router.pathname === '/'
          ? 'bg-black'
          : getFull()
          ? 'bg-[white]'
          : 'bg-[#F4F4F4] min-h-[100vh]'
      } `}
    >
      <div
        className={cn(
          'w-full   flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]',
          router.pathname === '/' ? 'bg-[#0A1A19]' : 'bg-[#0B0B0B]'
        )}
      >
        <NavBar
          {...navbarData}
          isFull={getFull()}
          showSecondNav={showSecondNav}
          changeShowSecondNav={(show) => setShowSecondNav(show)}
        >
          <User></User>
        </NavBar>
      </div>
      <div
        id="content-scroll-wrap"
        className={`m-auto relative overflow-auto flex-1 w-full`}
      >
        <div className={`w-full h-full flex flex-col`}>
          {renderBreadcrumb()}
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

export default MantleLayout;
