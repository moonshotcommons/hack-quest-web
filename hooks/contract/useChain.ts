'use client';
import { useChains } from 'wagmi';
export const useChain = (chainId: number) => {
  const chains = useChains();
  const chain = chains.find((c) => c.id === chainId);
  if (!chain) return null;
  return chain;
};

export const useChainInfo = (chainId: number) => {
  const chain = useChain(chainId);

  if (!chain) return null;
  const { name, id, testnet, nativeCurrency } = chain;
  const { symbol } = nativeCurrency;
  return {
    name,
    id,
    testnet,
    symbol
  };
};
