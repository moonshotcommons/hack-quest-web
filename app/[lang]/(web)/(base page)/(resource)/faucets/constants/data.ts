import { BlockChainType } from '@/service/webApi/resourceStation/type';

export const faucetsFilterData = [
  {
    label: 'EVM',
    value: BlockChainType.EVM
  },
  {
    label: 'Solana',
    value: BlockChainType.SOLANA
  },
  {
    label: 'Sui',
    value: BlockChainType.SUI
  },
  {
    label: 'Near',
    value: BlockChainType.NEAR
  }
];
