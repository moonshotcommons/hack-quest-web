'use client';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import LangProvider from '../Lang';
import { Lang } from '@/i18n/config';
import { Analytics } from '@vercel/analytics/react';
import WagmiConfigProvider from '../WagmiConfigProvider';
import GlobalModal from '@/components/Web/GlobalModal';
import ThemeContextProvider from '@/store/context/theme';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';

import { TouchBackend } from 'react-dnd-touch-backend';
import SolanaWalletProvider from '../SolanaWalletProvider';
import SuiProvider from '../SuiProvider';
interface WebAppProviderProps {
  lang: Lang;
}

const WebAppProvider: FC<PropsWithChildren<WebAppProviderProps>> = ({ lang, children }) => {
  return (
    <LangProvider lang={lang}>
      <ThemeContextProvider>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <WagmiConfigProvider>
            <SolanaWalletProvider>
              <SuiProvider>
                {children}
                <ProgressBar
                  height="4px"
                  color="#FFE866"
                  options={{ showSpinner: false, positionUsing: '' }}
                  shallowRouting
                  disableSameURL
                />
                <GlobalModal />
                <Toaster />
                <Analytics mode="production" debug={false} />
              </SuiProvider>
            </SolanaWalletProvider>
          </WagmiConfigProvider>
        </DndProvider>
      </ThemeContextProvider>
    </LangProvider>
  );
};

export default WebAppProvider;
