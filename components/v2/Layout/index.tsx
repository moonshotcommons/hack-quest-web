import { FC, ReactNode } from 'react';

import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { NavBarProps } from './Navbar';
import { useGetMissionData } from '@/hooks/useGetMissionData';
import { navbarList } from './Navbar/data';
import BaseLayout from './BaseLayout';
import { useRouter } from 'next/router';
import MantleLayout from '@/components/Mantle/MantleLayout';
export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
  pathname: string;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children, navbarData } = props;
  const { pathname } = useRouter();
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const { updateMissionDataAll } = useGetMissionData();

  navbarData.navList = navbarList;

  if (userInfo) {
    // navbarData.navList = navbarList;
    updateMissionDataAll();
  }

  if (pathname === '/')
    return <MantleLayout navbarData={navbarData}>{children}</MantleLayout>;

  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
