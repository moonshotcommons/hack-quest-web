import User from '@/components/v2/User';
import { Inter } from 'next/font/google';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import NavBar, { NavBarProps } from '../Navbar';

import Breadcrumb from '@/components/v2/Business/Breadcrumb';
import { useRouter } from 'next/router';
import { excludeLink } from '../Navbar/data';
import { MenuLink } from '../Navbar/type';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId|lessonIndex\]/;
  const [showSecondNav, setShowSecondNav] = useState(false);
  const { pathname } = useRouter();
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
      } ${getFull() ? 'bg-[white]' : 'bg-[#F4F4F4] min-h-[100vh]'} `}
    >
      <div className="w-full bg-[#0B0B0B]  flex items-center z-[99]">
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

export default V2Layout;
