import Layout, { LayoutProps } from '@/components/Layout';
import ThemeContextProvider from '@/store/context/theme';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { Provider } from 'react-redux';
import wrapper from '@/store/redux';
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
        {/* <Analytics /> */}
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
