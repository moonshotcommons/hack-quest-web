import Layout, { LayoutProps } from '@/components/Layout';
import ThemeContextProvider from '@/store/theme';
import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
function MyApp(appProps: AppProps & LayoutProps) {
  const { pageProps, Component, router, navbarData } = appProps;
  const { pathname } = router;

  if (typeof window === 'object') {
    console.log('client');
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
  } else {
    console.log('server');
    console.log(process.env.NAME);
    console.log(process.env.PORT);
    console.log(process.env.HOST);
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
  }

  switch (pathname) {
    default:
      return (
        <div className={`w-full min-h-screen bg-black ${inter.className}`}>
          <ThemeContextProvider>
            <Layout {...pageProps} navbarData={navbarData}>
              <Component {...pageProps} />
            </Layout>
          </ThemeContextProvider>
        </div>
      );
  }
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
    //   qrCode: {
    //     image: '',
    //     text: '祯民讲前端微信公众号',
    //   },
    //   copyRight: 'Copyright © 2022 xxx. 保留所有权利',
    //   siteNumber: '粤ICP备XXXXXXXX号-X',
    //   publicNumber: '粤公网安备 xxxxxxxxxxxxxx号',
    // },
  };
};

export default MyApp;
