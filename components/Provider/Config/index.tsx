'use client';
import { FC, ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { Analytics } from '@vercel/analytics/react';
import { setToken } from '@/helper/user-token';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/config/wagmi';
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, optimism, polygon],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({ http: 'https://rpc.mantle.xyz' })
//     })
//   ]
// );

interface ConfigProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  if (typeof window === 'object') {
    if (query.get('origin') === 'mantle' && query.get('token')) {
      setToken(query.get('token') as string);
    }
  } else {
    // server
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
          <Analytics mode="production" debug={false} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ConfigProvider;
