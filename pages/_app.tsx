import Layout, { LayoutProps } from '@/components/v2/Layout';
import ThemeContextProvider from '@/store/context/theme';
import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';

import wrapper from '@/store/redux';
import { Provider } from 'react-redux';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';

import { mainnet, optimism, polygon } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, polygon],
  [
    // alchemyProvider({ apiKey: 'ZBeLxZsUffmyjnUhj-Px0pR1XRWYOjXC' }),
    // infuraProvider({ apiKey: '3ee2300bf8cf44148303dc4fff1fe840' }),
    // publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({ http: 'https://rpc.mantle.xyz' })
    })
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false
      }
    })
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi'
    //   }
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: '...'
    //   }
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true
    //   }
    // })
  ],
  publicClient,
  webSocketPublicClient
});
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
        <WagmiConfig config={config}>
          <Layout
            {...props.pageProps}
            navbarData={navbarData}
            pathname={pathname}
          >
            <Head>
              <title>HackQuest</title>
            </Head>
            <Component {...props.pageProps} />
          </Layout>
        </WagmiConfig>

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
