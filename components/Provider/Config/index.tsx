'use client';
import { FC, ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { Analytics } from '@vercel/analytics/react';
import { mainnet, optimism, polygon } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { useSearchParams } from 'next/navigation';
import { setToken } from '@/helper/user-token';

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
  const query = useSearchParams();

  if (typeof window === 'object') {
    if (query.get('origin') === 'mantle' && query.get('token')) {
      setToken(query.get('token') as string);
    }
  } else {
    // server
  }

  return (
    <WagmiConfig config={config}>
      {children}
      <Analytics mode="production" debug={false} />
    </WagmiConfig>
  );
};

export default ConfigProvider;
