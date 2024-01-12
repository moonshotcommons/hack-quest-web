'use client';
import { FC, ReactNode } from 'react';

import { NavBarProps } from './Navbar';
import { navbarList } from './Navbar/data';
import BaseLayout from './BaseLayout';
import { deepClone } from '@/helper/utils';
import { NavbarListType } from './Navbar/type';
import { useUserStore } from '@/store/zustand/userStore';
export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children, navbarData } = props;
  const userInfo = useUserStore((state) => state.userInfo);
  let navList = deepClone(navbarList);
  if (!userInfo) {
    navList.map((v: NavbarListType) => {
      v.menu = v.menu.filter((vv) => !vv.needLogin);
    });
  }
  navbarData.navList = navList.filter(
    (v: NavbarListType) => v.menu.length || v.type === 'outSide'
  );
  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
