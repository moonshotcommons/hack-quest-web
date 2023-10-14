import { FC, ReactNode } from 'react';

import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { NavBarProps } from './Navbar';
import V2BaseLayout from './V2BaseLayout';
import V2FullLayout from './V2FullLayout';
import webApi from '@/service';
import { useDispatch } from 'react-redux';
import { setMissionData } from '@/store/redux/modules/missionCenter';

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
  }
  // {
  //   name: 'Mission Center ',
  //   path: '/mission-center'
  // }
];

const V2Layout: FC<LayoutProps> = (props) => {
  let { pathname, children, navbarData } = props;
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const dispatch = useDispatch();
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  navbarData.navList = [];
  // navbarData.navList = [];

  const getMissionData = async () => {
    let res = await webApi.missionCenterApi.getAllMission();
    dispatch(setMissionData(res || []));
  };

  if (userInfo) {
    navbarData.navList = navbarList;
    getMissionData();
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
