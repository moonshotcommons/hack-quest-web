import '@mysten/dapp-kit/dist/index.css';

import { FC, ReactNode } from 'react';
import { ConnectModal, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { create } from 'zustand';

interface SuiProviderProps {
  children: ReactNode;
}

const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') }
};

interface State {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useSuiConnectModal = create<State>((set) => ({
  visible: false,
  setVisible: (visible: boolean) => set({ visible })
}));

const SuiProvider: FC<SuiProviderProps> = ({ children }) => {
  const { visible, setVisible } = useSuiConnectModal();

  return (
    <SuiClientProvider networks={networks} defaultNetwork="testnet">
      <WalletProvider>
        {children}
        <ConnectModal
          open={visible}
          trigger={<>{null}</>}
          onOpenChange={() => {
            setVisible(false);
          }}
        />
      </WalletProvider>
    </SuiClientProvider>
  );
};

export default SuiProvider;
