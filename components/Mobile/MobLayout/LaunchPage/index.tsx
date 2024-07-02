import { FC, ReactNode } from 'react';

import { NavbarProps } from './Navbar';
import BaseLayout from './BaseLayout';
import { navbarList } from '@/components/Web/Layout/LaunchPage/Navbar/data';
import webApi from '@/service';
export interface LayoutProps {
  navbarData: NavbarProps;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = async (props) => {
  let { children, navbarData } = props;
  navbarData.navList = navbarList;
  const userInfo = await webApi.userApi.getUserInfo();
  return (
    <BaseLayout navbarData={navbarData} userInfo={userInfo}>
      {children}
    </BaseLayout>
  );
};
export default V2Layout;
