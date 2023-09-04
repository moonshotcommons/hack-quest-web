import User from '@/components/v2/User';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import Footer from '../Footer';
import NavBar, { NavBarProps } from '../Navbar';
const inter = Inter({ subsets: ['latin'] });
export interface BaseLayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ navbarData, children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-default-global-bg  ${inter.className} overflow-x-scroll`}
    >
      <div className="w-full fixed left-0 top-0 bg-[#0B0B0B] h-[64px] flex items-center z-[99] shadow-[box-shadow: rgba(17, 12, 46, 0.15)_0px_48px_100px_0px]">
        <div className="relative m-auto h-full w-full">
          <div className="w-full h-full px-[40px] absolute top-0 left-1/2 -translate-x-1/2">
            <NavBar {...navbarData}>
              <User></User>
            </NavBar>
          </div>
        </div>
      </div>
      {/* <div className="container m-auto"> */}
      <main>{children}</main>
      {/* <Footer {...footerData} /> */}
      <Footer></Footer>
      {/* </div> */}
    </div>
  );
};

export default BaseLayout;
