import type { Chain } from 'viem';

export const mantaTestnet = {
  id: 3441006,
  name: 'Manta Pacific Sepolia Testnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://pacific-rpc.sepolia-testnet.manta.network/http']
    }
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: 'manta-testnet Explorer',
      url: 'https://pacific-explorer.sepolia-testnet.manta.network'
    }
  },
  contracts: {
    launchapToken: {
      address: '0x7184c70bdC9eaD810C795d5df0Bf4aC987988927'
    },
    launchpad: {
      address: '0x2Fd9C7b10Db952F5aEF98A2Bd571f1ed4247eBcC'
    },
    stakingToken: {
      address: '0x8bd11c1d18C7DcA017a0eFd99617Ae28B887c10e'
    },
    aridropToken: {
      address: '0x6Eb462Aa74AbDc99Fd025bD32800500c37B0040a'
    }
  }
} as const satisfies Chain;
