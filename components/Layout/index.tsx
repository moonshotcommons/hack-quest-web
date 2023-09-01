import V2Layout from '@/components/v2/Layout/index';
import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { FC, ReactNode } from 'react';
import V2FullLayout from '../v2/Layout/V2FullLayout';
import BaseLayout from './BaseLayout';
import EmailVerifyLayout from './EmailVerifyLayout';
import HackathonLayout from './HackathonLayout';
import LoginLayout from './LoginLayout';
import { NavBarProps } from './Navbar';
import UnitLayout from './UnitLayout';

export interface LayoutProps {
  navbarData: NavBarProps;
  children: ReactNode;
  pathname: string;
}

const Layout: FC<LayoutProps> = (props) => {
  let { pathname, children, navbarData } = props;
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  navbarData.navList = [
    {
      name: 'All Courses',
      path: '/courses'
    }
  ];

  if (userInfo) {
    navbarData.navList = [
      {
        name: 'All Courses',
        path: '/courses'
      },
      {
        name: 'Learning Dashboard',
        path: '/dashboard'
      },
      {
        name: 'Mission Center',
        path: '/mission-center'
      }
    ];

    if (pathname.startsWith('/v2')) {
      navbarData.navList = [
        {
          name: 'Home',
          path: '/v2/home'
        },
        {
          name: 'Learning Track',
          path: '/v2/learning-track1'
        },
        {
          name: 'Electives',
          path: '/v2/electives'
        }
      ];
    }
  }

  // console.log('使用v2布局', pathname.startsWith('/v2'));

  switch (true) {
    case pathname.startsWith('/v2'):
      return (
        <V2Layout
          navbarData={navbarData}
          pathname={pathname.replace('/v2', '')}
        >
          {children}
        </V2Layout>
      );
    case regex.test(pathname):
      return <UnitLayout>{children}</UnitLayout>;
    case pathname.startsWith('/preview'):
      return <V2FullLayout navbarData={navbarData}>{children}</V2FullLayout>;
    case [
      '/auth/register',
      '/auth/login',

      '/auth/forget-password',
      '/auth/update-password'
    ].includes(pathname):
      return <LoginLayout>{children}</LoginLayout>;
    case [
      '/auth/email-verify',
      '/auth/email-fail',
      '/auth/email-success',
      '/users/email-confirmed'
    ].includes(pathname):
      return <EmailVerifyLayout>{children}</EmailVerifyLayout>;
    case pathname === '/event/hackathon':
      return <HackathonLayout>{children}</HackathonLayout>;
    case pathname === '/':
    // return <HomeLayout>{children}</HomeLayout>;
    default:
      return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
  }
};
export default Layout;
