'use client';
import { FC, ReactNode } from 'react';

import { NavbarProps } from './Navbar';
import BaseLayout from './BaseLayout';
import { navbarList } from '@/components/Web/Layout/LaunchPage/Navbar/data';
export interface LayoutProps {
  navbarData: NavbarProps;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children, navbarData } = props;
  navbarData.navList = navbarList;
  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
