import { FC, ReactNode } from 'react';

import { NavBarProps } from './Navbar';
import { navbarList } from './Navbar/data';
import BaseLayout from './BaseLayout';
import webApi from '@/service';
export interface LayoutProps {
  navbarData: Omit<NavBarProps, 'userInfo'>;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = async (props) => {
  let { children, navbarData } = props;
  navbarData.navList = navbarList;
  let userInfo = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err) {}
  return (
    <BaseLayout navbarData={navbarData} userInfo={userInfo}>
      {children}
    </BaseLayout>
  );
};
export default V2Layout;
