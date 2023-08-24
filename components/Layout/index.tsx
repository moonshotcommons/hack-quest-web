import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { FC, ReactNode } from 'react';
import UnitLayout from './UnitLayout';
import LoginLayout from './LoginLayout';
import EmailVerifyLayout from './EmailVerifyLayout';
import HackathonLayout from './HackathonLayout';
import BaseLayout from './BaseLayout';
import { NavBarProps } from './Navbar';

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

  if (pathname.startsWith('/v2')) {
    pathname = pathname.replace('/v2', '');
  }

  switch (true) {
    case regex.test(pathname):
      return <UnitLayout>{children}</UnitLayout>;

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
      }

      return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
  }
};
export default Layout;
