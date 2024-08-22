import { SignProtocolClient, SpMode, OffChainSignType } from '@ethsign/sp-sdk';

export function getClient() {
  const client = new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712
  });

  return client;
}
