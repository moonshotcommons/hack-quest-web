'use client';
import { FC, ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { Analytics } from '@vercel/analytics/react';
import { mainnet, optimism, polygon } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import NavbarProvider from '../Navbar';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: 'https://rpc.mantle.xyz' })
    })
  ]
);

interface ConfigProviderProps {
  children: ReactNode;
}

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false
      }
    })
  ],
  publicClient,
  webSocketPublicClient
});

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <NavbarProvider>{children}</NavbarProvider>
      <Analytics mode="production" debug={false} />
    </WagmiConfig>
  );
};

export default ConfigProvider;
