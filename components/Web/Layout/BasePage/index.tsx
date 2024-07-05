import { FC, ReactNode } from 'react';

import { NavBarProps } from './Navbar';
import { navbarList } from './Navbar/data';
import BaseLayout from './BaseLayout';
import { deepClone } from '@/helper/utils';
import { NavbarListType } from './Navbar/type';
import webApi from '@/service';
export interface LayoutProps {
  navbarData: Omit<NavBarProps, 'userInfo'>;
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
    <BaseLayout userInfo={userInfo} navbarData={navbarData}>
      {children}
    </BaseLayout>
  );
};
export default V2Layout;
