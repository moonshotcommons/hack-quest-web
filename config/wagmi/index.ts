import { http } from 'wagmi';
import { mainnet, mantle } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

import { mantaTestnet } from './chains';
export const config = getDefaultConfig({
  appName: 'Hackquest',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, mantle, mantaTestnet],
  transports: {
    [mainnet.id]: http(),
    [mantle.id]: http()
  },
  ssr: true
});
