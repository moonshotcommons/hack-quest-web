import React from 'react';
import NavBar, { NavBarProps } from './Navbar';
import Footer from './Footer';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export interface LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ navbarData, children }) => {
  return (
    <div
      className={`w-full min-h-screen bg-black ${inter.className} xs:overflow-x-scroll`}
    >
      <div className="container m-auto">
        <NavBar {...navbarData} />
        <main>{children}</main>
        {/* <Footer {...footerData} /> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
