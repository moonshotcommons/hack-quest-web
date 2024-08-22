'use client';
import { FC, ReactNode } from 'react';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { NetworkConfigurationProvider } from './NetworkConfigurationProvider';
import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter
  // SolflareWalletAdapter,
  // SolongWalletAdapter
} from '@solana/wallet-adapter-wallets';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
interface SolanaWalletProviderProps {
  children: ReactNode;
}

const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Testnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter()
      // new SolflareWalletAdapter(),
      // new SolongWalletAdapter()
    ],
    [network]
  );

  return (
    <NetworkConfigurationProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NetworkConfigurationProvider>
  );
};

export default SolanaWalletProvider;
