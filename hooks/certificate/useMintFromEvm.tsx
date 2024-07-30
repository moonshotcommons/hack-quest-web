import { ChainConfigContext } from '@/components/Provider/WagmiConfigProvider';
import { useWriteCertificateNftMint } from '@/lib/generated';
import webApi from '@/service';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRequest } from 'ahooks';
import { useContext } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const CONTRACT_ADDRESS = '0x8eDBf22b97f7bddC7F78AE13b348949DFa0731D3';
const FUNCTION_NAME = 'safeMint';

export const useMintFromEvm = (onSuccess?: (res: any) => void) => {
  // const { connectAsync, connectors, error, isLoading, pendingConnector } =
  //   useConnect();

  // const { data, writeAsync } = useContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: SBTManager.abi,
  //   functionName: FUNCTION_NAME
  // });

  // const metamaskConnector = useMemo(() => {
  //   return connectors.find((item) => item.id === 'metaMask');
  // }, [connectors]);
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { updateInitialChainId } = useContext(ChainConfigContext);
  const { writeContractAsync } = useWriteCertificateNftMint();
  const account = useAccount();

  const {
    run: safeMint,
    runAsync: safeMintAsync,
    loading
  } = useRequest(
    async (certificate: UserCertificateInfo) => {
      const { username, certificateId } = certificate;

      if (!account?.isConnected && openConnectModal) {
        updateInitialChainId(certificate.chainId);
        openConnectModal();
        throw new Error('Please connect your wallet first!');
      }

      if (chainId !== certificate.chainId) {
        await switchChainAsync({ chainId: certificate.chainId });
      }

      const res = await webApi.campaignsApi.getSignature(String(certificate.id), {
        address: account.address!
      });

      const data = await writeContractAsync({
        address: certificate.contract,
        account: account.address,
        args: [
          account.address!,
          username,
          String(certificate.chainId),
          '',
          String(certificateId),
          '',
          '',
          res.signature
        ]
      });

      let isSuccess = false;

      while (!isSuccess) {
        try {
          const result = await webApi.campaignsApi.savaMintState({
            certificationId: certificate.id,
            txId: data
          });
          isSuccess = true;
          return result;
        } catch (err) {}
      }
    },
    {
      manual: true
    }
  );

  return {
    safeMint,
    safeMintAsync
  };
};
