import { http } from 'wagmi';
import {
  mainnet,
  mantle,
  manta,
  arbitrumSepolia,
  lineaSepolia,
  mantleSepoliaTestnet,
  sepolia,
  telosTestnet
} from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mantaTestnet } from './chains';
import {
  rainbowWallet,
  walletConnectWallet,
  okxWallet,
  coinbaseWallet,
  metaMaskWallet,
  gateWallet
} from '@rainbow-me/rainbowkit/wallets';
import { generateChainId } from '@/helper/utils';

export enum ChainType {
  MAINNET = mainnet.id,
  MANTLE = mantle.id,
  MANTA = process.env.NODE_ENV === 'development' ? mantaTestnet.id : manta.id,
  Sepolia = sepolia.id,
  Linea_Sepolia = lineaSepolia.id,
  Arbitrum_Sepolia = arbitrumSepolia.id,
  MANTLE_Sepolia = mantleSepoliaTestnet.id,
  TELOS_TESTNET = telosTestnet.id,
  Solana = generateChainId('Solana'),
  Sui = generateChainId('Sui')
}

export const config = getDefaultConfig({
  appName: 'Hackquest',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    mantle,
    manta,
    mantaTestnet,
    mantleSepoliaTestnet,
    lineaSepolia,
    sepolia,
    arbitrumSepolia,
    telosTestnet
  ],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, okxWallet, gateWallet, rainbowWallet, walletConnectWallet, coinbaseWallet]
    }
  ],
  transports: {
    [mainnet.id]: http(),
    [mantle.id]: http(),
    [manta.id]: http(),
    [mantaTestnet.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
    [lineaSepolia.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [telosTestnet.id]: http()
  },
  ssr: true
});
