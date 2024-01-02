'use client';
import { FC, ReactNode } from 'react';

import { NavBarProps } from './Navbar';
import { navbarList, dashBoard } from './Navbar/data';
import BaseLayout from './BaseLayout';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { deepClone } from '@/helper/utils';
export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children, navbarData } = props;
  const userInfo = useGetUserInfo();
  let navList = deepClone(navbarList);
  if (userInfo) {
    navList[0].menu.unshift(dashBoard);
  }
  navbarData.navList = navList;
  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
