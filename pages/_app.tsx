import BaseLayout, { LayoutProps } from '@/components/Layout';
import ThemeContextProvider from '@/store/context/theme';
import '@/styles/Lesson.scss';
import '@/styles/globals.css';
import '@/styles/main.scss';
import '@/styles/button.scss';
import '@/styles/codemirror.scss';
import '@/styles/Quest.scss';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { Provider } from 'react-redux';
import wrapper from '@/store/redux';
import UnitLayout from '@/components/Layout/UnitLayout';
import { ReactNode } from 'react';
import HomeLayout from '@/components/Layout/HomeLayout';

const Layout = (props: {
  pathname: string;
  children: ReactNode;
  navbarData: any;
}) => {
  const { pathname, children, navbarData } = props;
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  switch (true) {
    case regex.test(pathname):
      return <UnitLayout>{children}</UnitLayout>;
    case pathname === '/':
      return <HomeLayout>{children}</HomeLayout>;
    default:
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

  // const regex = /\/[^/]+\/\[...course\]/;
  // console.log(regex.test(pathname));

  // console.log(pathname, '测试', regex.test(pathname));
  const regex = /\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/;
  // switch (true) {
  //   case regex.test(pathname):
  //     return (
  //       <Provider store={store}>
  //         <ThemeContextProvider>
  //           <UnitLayout>
  //             <Component {...props.pageProps} />
  //           </UnitLayout>
  //         </ThemeContextProvider>
  //       </Provider>
  //     );
  //   case regex.test(pathname):
  //     return (
  //       <Provider store={store}>
  //         <ThemeContextProvider>
  //           <UnitLayout>
  //             <Component {...props.pageProps} />
  //           </UnitLayout>
  //         </ThemeContextProvider>
  //       </Provider>
  //     );
  //   default:
  //     return (
  //       <Provider store={store}>
  //         <ThemeContextProvider>
  //           <BaseLayout {...props.pageProps} navbarData={navbarData}>
  //             <Component {...props.pageProps} />
  //           </BaseLayout>
  //         </ThemeContextProvider>
  //       </Provider>
  //     );
  // }

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
      navList: [
        {
          name: 'All Courses',
          path: '/courses'
        },
        {
          name: 'Learning Dashboard',
          path: '/dashboard'
        }
        // {
        //   name: 'Mission Center',
        //   path: '/courses',
        // },
        // {
        //   name: 'Ranking',
        //   path: '/courses',
        // },
      ]
    }
    // footerData: {
    //   title: 'Demo',
    //   linkList: [
    //     {
    //       title: '技术栈',
    //       list: [
    //         {
    //           label: 'react',
    //         },
    //         {
    //           label: 'typescript',
    //         },
    //         {
    //           label: 'ssr',
    //         },
    //         {
    //           label: 'nodejs',
    //         },
    //       ],
    //     },
    //     {
    //       title: '了解更多',
    //       list: [
    //         {
    //           label: '掘金',
    //           link: 'https://juejin.cn/user/2714061017452557',
    //         },
    //         {
    //           label: '知乎',
    //           link: 'https://www.zhihu.com/people/zmAboutFront',
    //         },
    //         {
    //           label: 'csdn',
    //         },
    //       ],
    //     },
    //     {
    //       title: '联系我',
    //       list: [{ label: '微信' }, { label: 'QQ' }],
    //     },
    //   ],
    //   copyRight: 'Copyright © 2022 xxx. 保留所有权利',
    //   siteNumber: '粤ICP备XXXXXXXX号-X',
    //   publicNumber: '粤公网安备 xxxxxxxxxxxxxx号',
    // },
  };
};

export default MyApp;
