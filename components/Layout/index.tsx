// ./components/layout/index.tsx
import React from 'react';
// import { IFooterProps, Footer } from "../footer/index";
// import { INavBarProps, NavBar } from "../navbar/index";
import styles from './styles.module.scss';
import NavBar, { NavBarProps } from '../Navbar';
import Footer from '../Footer';

export interface LayoutProps {
  navbarData: NavBarProps;
  // footerData: IFooterProps;
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ navbarData, children }) => {
  console.log(navbarData, 'navBarData');
  return (
    <div className="container m-auto">
      <NavBar {...navbarData} />
      <main>{children}</main>
      {/* <Footer {...footerData} /> */}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
