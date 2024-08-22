import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import { useAccount } from 'wagmi';
import * as React from 'react';

export function useVeraxSdk() {
  const [veraxSdk, setVeraxSdk] = React.useState<VeraxSdk>();
  const { address } = useAccount();

  React.useEffect(() => {
    if (address) {
      const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_SEPOLIA_FRONTEND, address);
      setVeraxSdk(veraxSdk);
    }
  }, [address]);

  return { veraxSdk };
}
