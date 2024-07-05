import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';

import { LaunchapToken, Launchpad, StakingToken, SBTManager, Airdrop, CertificateNFT } from '@/config/abi';

/**
 * Generate contract code
 * pnpm wagmi generate
 * yarn wagmi generate
 * npm run wagmi generate
 */
export default defineConfig({
  out: 'lib/generated.ts',
  contracts: [
    {
      name: SBTManager.contractName,
      abi: SBTManager.abi
    },
    {
      name: LaunchapToken.contractName,
      abi: LaunchapToken.abi as any
    },
    {
      name: Launchpad.contractName,
      abi: Launchpad.abi as any
    },
    {
      name: StakingToken.contractName,
      abi: StakingToken.abi as any
    },
    {
      name: 'Airdrop',
      abi: Airdrop as any
    },

    {
      name: CertificateNFT.contractName,
      abi: CertificateNFT.abi
    }
  ],
  plugins: [react()]
});
