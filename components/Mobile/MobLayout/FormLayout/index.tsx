import { FC, ReactNode } from 'react';

import { NavbarProps } from './Navbar';
import BaseLayout from './BaseLayout';

import { deepClone } from '@/helper/utils';
import { NavbarListType } from '@/components/Web/Layout/BasePage/Navbar/type';
import { navbarList } from '@/components/Web/Layout/BasePage/Navbar/data';
import webApi from '@/service';
export interface LayoutProps {
  navbarData: Omit<NavbarProps, 'userInfo'>;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = async (props) => {
  let { children, navbarData } = props;

  let userInfo = null;

  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err) {}

  let navList = deepClone(navbarList);
  if (!userInfo) {
    navList.map((v: NavbarListType) => {
      v.menu = v.menu.filter((vv) => !vv.needLogin);
    });
  }
  navbarData.navList = navList.filter((v: NavbarListType) => v.menu.length || v.type === 'outSide');
  return (
    <BaseLayout navbarData={navbarData} userInfo={userInfo}>
      {children}
    </BaseLayout>
  );
};
export default V2Layout;
