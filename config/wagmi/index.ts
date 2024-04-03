import { http } from 'wagmi';
import { mainnet, mantle, manta } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mantaTestnet } from './chains';

export enum ChainType {
  MAINNET = mainnet.id,
  MANTLE = mantle.id,
  MANTA = process.env.NODE_ENV === 'development' ? mantaTestnet.id : manta.id
}

export const config = getDefaultConfig({
  appName: 'Hackquest',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, mantle, manta, mantaTestnet],
  transports: {
    [mainnet.id]: http(),
    [mantle.id]: http(),
    [manta.id]: http(),
    [mantaTestnet.id]: http()
  },
  ssr: true
});
