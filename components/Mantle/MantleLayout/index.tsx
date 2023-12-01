import User from '@/components/v2/User';
import { Inter, DM_Sans } from 'next/font/google';
import React, { ReactNode } from 'react';

import Breadcrumb from '@/components/v2/Breadcrumb';
import { useRouter } from 'next/router';

import { cn } from '@/helper/utils';
import { navbarList } from '@/components/v2/Layout/Navbar/data';
import NavBar, { NavBarProps } from '@/components/v2/Layout/Navbar';

const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});
export interface MantleLayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const MantleLayout: React.FC<MantleLayoutProps> = ({
  navbarData,
  children
}) => {
  const router = useRouter();
  const route = router.route;
  return (
    <div
      className={cn(
        `w-full  min-h-[100vh] ${inter.className} overflow-x-auto`,
        router.pathname === '/' ? 'bg-black' : 'bg-[#F4F4F4]'
      )}
    >
      <div
        className={cn(
          'w-full  wap:hidden  fixed left-0 top-0 bg-[#0B0B0B] h-[64px] flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]',
          router.pathname === '/' ? 'bg-[#0A1A19]' : 'bg-[#0B0B0B]'
        )}
      >
        <div className="relative container m-auto h-full ">
          <div className="2xl:px-[40px] 2xl:w-[calc(100%+160px)] w-full h-full absolute top-0 left-1/2 -translate-x-1/2">
            <NavBar {...navbarData}>
              <User></User>
            </NavBar>
          </div>
        </div>
      </div>
      <div className="m-auto">
        <div className="w-full pt-[64px] wap:pt-[0]">
          {!navbarList.some((v: any) => v.path === route || route === '/') ? (
            <div className="container mx-auto">
              <Breadcrumb />
            </div>
          ) : null}
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MantleLayout;
