import User from '@/components/v2/User';
import { Inter } from 'next/font/google';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import NavBar, { NavBarProps } from '../Navbar';

import Breadcrumb from '@/components/v2/Breadcrumb';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  const [showSecondNav, setShowSecondNav] = useState(false);
  const { pathname } = useRouter();
  const getFull = () => {
    return regex.test(pathname) || pathname.startsWith('/preview');
  };
  const renderBreadcrumb = useCallback(() => {
    const full = getFull();
    const { navList } = navbarData;
    if (full || pathname === '/' || !navList.length) return null;
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

  return (
    <div
      className={`w-full overflow-x-auto   ${inter.className} ${
        getFull() ? 'bg-[white]' : 'bg-[#F4F4F4] min-h-[100vh]'
      } `}
    >
      <div className="w-full fixed left-0 top-0 bg-[#0B0B0B] h-[64px] flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]">
        <NavBar
          {...navbarData}
          isFull={getFull()}
          showSecondNav={showSecondNav}
          changeShowSecondNav={(show) => setShowSecondNav(show)}
        >
          <User></User>
        </NavBar>
      </div>
      <div className="h-[64px] bg-[#0b0b0b]"></div>
      <div className="m-auto">
        {/* <div className={`w-full ${showSecondNav ? 'pt-[110px]' : 'pt-[64px]'}`}> */}
        <div className={`w-full ${showSecondNav ? 'pt-[58px]' : ''}`}>
          {renderBreadcrumb()}
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default V2Layout;
