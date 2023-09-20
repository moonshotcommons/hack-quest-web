import Layout, { LayoutProps } from '@/components/v2/Layout';
import ThemeContextProvider from '@/store/context/theme';
import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import wrapper from '@/store/redux';
import { Provider } from 'react-redux';
function MyApp(appProps: AppProps & Omit<LayoutProps, 'pathname'>) {
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
        <Analytics mode="production" debug={false} />
      </ThemeContextProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<{} & Omit<LayoutProps, 'children' | 'pathname'>> => {
  const pageProps = await App.getInitialProps(context);
  return {
    ...pageProps,
    navbarData: {
      navList: []
    }
  };
};

export default MyApp;
