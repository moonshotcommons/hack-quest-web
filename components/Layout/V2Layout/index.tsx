import React, { ReactNode } from 'react';
import NavBar, { NavBarProps } from '../Navbar';
import Footer from '../Footer';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import User from '@/components/User';
const inter = Inter({ subsets: ['latin'] });
export interface V2LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: ReactNode;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-[white]  ${inter.className} overflow-x-scroll`}
    >
      <div className="m-auto">
        <div className="px-[40px]">
          <NavBar {...navbarData}>
            <User></User>
          </NavBar>
        </div>
        <main className="px-[30px]">{children}</main>
      </div>
    </div>
  );
};

export default V2Layout;
