import { FC, ReactNode } from 'react';

import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { NavBarProps } from './Navbar';
import V2BaseLayout from './V2BaseLayout';
import V2FullLayout from './V2FullLayout';
import { useGetMissionData } from '@/hooks/useGetMissionData';

export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
  pathname: string;
}

export const navbarList = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Learning Track',
    path: '/learning-track'
  },
  {
    name: 'Electives',
    path: '/electives'
  },
  {
    name: 'Mission Center',
    path: '/mission-center'
  },
  {
    name: 'Resource Station',
    path: '/resource-station/hackathon'
  }
];

const V2Layout: FC<LayoutProps> = (props) => {
  let { pathname, children, navbarData } = props;
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const { updateMissionDataAll } = useGetMissionData();
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  navbarData.navList = [];

  if (userInfo) {
    navbarData.navList = navbarList;
    updateMissionDataAll();
  }

  switch (true) {
    case regex.test(pathname):
    case pathname.startsWith('/preview'):
      return <V2FullLayout navbarData={navbarData}>{children}</V2FullLayout>;
    case ['/', ''].includes(pathname):
    // return <V2HomeLayout navbarData={navbarData}>{children}</V2HomeLayout>;
    default:
      return <V2BaseLayout navbarData={navbarData}>{children}</V2BaseLayout>;
  }
};
export default V2Layout;
