import User from '@/components/User';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import NavBar, { NavBarProps } from '../Navbar';

import Breadcrumb from '@/components/v2/Breadcrumb';
const inter = Inter({ subsets: ['latin'] });
export interface V2FullLayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2FullLayout: React.FC<V2FullLayoutProps> = ({
  navbarData,
  children
}) => {
  return (
    <div className={`w-full bg-[white]  ${inter.className}`}>
      <div className="w-full fixed left-0 top-0 bg-[#0B0B0B] h-[64px] flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]">
        <div className="relative m-auto h-full w-full">
          <div className="w-full h-full px-[40px] absolute top-0 left-1/2 -translate-x-1/2">
            <NavBar {...navbarData}>
              <User></User>
            </NavBar>
          </div>
        </div>
      </div>
      <div className="m-auto">
        <div className="w-full pt-[64px]">
          <Breadcrumb />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default V2FullLayout;
