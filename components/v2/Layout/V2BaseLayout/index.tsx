import User from '@/components/v2/User';
import { Inter, DM_Sans } from 'next/font/google';
import React, { ReactNode } from 'react';
import NavBar, { NavBarProps } from '../Navbar';

import Breadcrumb from '@/components/v2/Breadcrumb';
import { useRouter } from 'next/router';
import { navbarList } from '..';
import { cn } from '@/helper/utils';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});
export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
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
          'w-full fixed left-0 top-0 bg-[#0B0B0B] h-[64px] flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]',
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
        <div className="w-full pt-[64px]">
          {!navbarList.some((v) => v.path === route || route === '/') ? (
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

export default V2Layout;
