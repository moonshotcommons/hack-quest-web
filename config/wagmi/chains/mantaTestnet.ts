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
      address: '0x224f871B8c8aD67EFD0cEf2E1B7bDEfa995B2807'
    },
    launchpad: {
      address: '0xA233cCa3605E5797457ceAd0307B0da73d658024'
    },
    stakingToken: {
      address: '0x4D4a0124F9BdF402d2617F46284C136Db0ae8518'
    },
    aridropToken: {
      address: '0x6Eb462Aa74AbDc99Fd025bD32800500c37B0040a'
    }
  }
} as const satisfies Chain;
