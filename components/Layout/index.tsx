import React, { ReactNode } from 'react';
import NavBar, { NavBarProps } from './Navbar';
import Footer from './Footer';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import User from '@/components/User';
const inter = Inter({ subsets: ['latin'] });
export interface LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ navbarData, children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-default-global-bg  ${inter.className} overflow-x-scroll`}
    >
      <div className="container m-auto">
        <NavBar {...navbarData}>
          <User></User>
        </NavBar>
        <main>{children}</main>
        {/* <Footer {...footerData} /> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
