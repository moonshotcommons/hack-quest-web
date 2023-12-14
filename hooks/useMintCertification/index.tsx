import { SBTManager } from '@/config/abi';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import { useConnect, useContractWrite } from 'wagmi';

const CONTRACT_ADDRESS = '0x8eDBf22b97f7bddC7F78AE13b348949DFa0731D3';
const FUNCTION_NAME = 'safeMint';

export const useMintCertification = (onSuccess?: (res: any) => void) => {
  // const { address: userAddress, isConnected, isDisconnected } = useAccount();
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { data, writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: SBTManager as any,
    functionName: FUNCTION_NAME
  });

  const metamaskConnector = useMemo(() => {
    return connectors.find((item) => item.id === 'metaMask');
  }, [connectors]);

  const {
    run: safeMint,
    runAsync: safeMintAsync,
    loading
  } = useRequest(
    async (params: {
      sourceType: 'Certification';
      sourceId: string;
      signatureId: number;
    }) => {
      if (metamaskConnector) {
        const isAccount = await metamaskConnector.isAuthorized();
        let account = null;
        if (isAccount) {
          account = await metamaskConnector.getAccount();
        }
        if (!account) {
          const connectRes = await connectAsync({
            connector: metamaskConnector
          });
          account = connectRes.account;
        }
        if (account) {
          const chainId = await metamaskConnector.getChainId();
          if (![5000].includes(chainId)) {
            throw new Error(
              'Please Switch to Mantle Mainnet to mint the certificate!'
            );
          }
          const res = await webApi.campaignsApi.getSignature({
            sourceId: params.sourceId,
            sourceType: params.sourceType,
            address: account!
          });

          const data = await writeAsync({
            args: [account, params.signatureId, res.sig.v, res.sig.r, res.sig.s]
          });

          const result = await webApi.campaignsApi.savaMintState({
            certificationId: params.sourceId,
            txId: data.hash
          });

          return result;
        } else {
          throw new Error('Failed to link MetaMask');
        }
      } else {
        throw new Error('No metaMask connector found!');
      }
    },
    {
      manual: true
    }
  );

  return {
    safeMint,
    loading,
    safeMintAsync
  };
};
