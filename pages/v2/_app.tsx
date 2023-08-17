import BaseLayout, { LayoutProps } from '@/components/Layout';
import ThemeContextProvider from '@/store/context/theme';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import '@/styles/main.scss';
import '@/styles/Lesson.scss';
import '@/styles/button.scss';
import '@/styles/codemirror.scss';
import '@/styles/Quest.scss';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { Provider } from 'react-redux';
import wrapper from '@/store/redux';
import UnitLayout from '@/components/Layout/UnitLayout';
import { ReactNode, useEffect } from 'react';
import HomeLayout from '@/components/Layout/HomeLayout';
import LoginLayout from '@/components/Layout/LoginLayout';
import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import EmailVerifyLayout from '@/components/Layout/EmailVerifyLayout';
import HackathonLayout from '@/components/Layout/HackathonLayout';

const Layout = (props: {
  pathname: string;
  children: ReactNode;
  navbarData: any;
}) => {
  const { pathname, children, navbarData } = props;
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;

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

function MyApp(appProps: AppProps & LayoutProps) {
  const { Component, router, navbarData, ...rest } = appProps;
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pathname } = router;

  if (typeof window === 'object') {
    // client
  } else {
    // server
  }

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Layout
          {...props.pageProps}
          navbarData={navbarData}
          pathname={pathname}
        >
          <Component {...props.pageProps} />
        </Layout>
        <Analytics />
      </ThemeContextProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<{} & Omit<LayoutProps, 'children'>> => {
  const pageProps = await App.getInitialProps(context);
  return {
    ...pageProps,
    navbarData: {
      navList: []
    }
  };
};

export default MyApp;
