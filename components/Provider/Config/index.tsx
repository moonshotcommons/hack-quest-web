'use client';
import { FC, ReactNode, createContext, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { Analytics } from '@vercel/analytics/react';
import { setToken } from '@/helper/user-token';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainType, config } from '@/config/wagmi';

interface ConfigProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const ChainConfigContext = createContext({
  updateInitialChainId: (chainId: number) => {}
});

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

  if (typeof window === 'object') {
    if (query.get('origin') === 'mantle' && query.get('token')) {
      setToken(query.get('token') as string);
    }
  } else {
    // server
  }

  const [initialChainId, setInitialChainId] = useState(ChainType.MAINNET);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={initialChainId}>
          <ChainConfigContext.Provider value={{ updateInitialChainId: setInitialChainId }}>
            {children}
          </ChainConfigContext.Provider>
          <Analytics mode="production" debug={false} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ConfigProvider;
