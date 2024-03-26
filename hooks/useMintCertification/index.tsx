import { ChainConfigContext } from '@/components/Provider/Config';
import { ChainType } from '@/config/wagmi';
import { useWriteSbtManagerSafeMint } from '@/lib/generated';
import webApi from '@/service';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRequest } from 'ahooks';
import { useContext } from 'react';
import { parseUnits } from 'viem';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const CONTRACT_ADDRESS = '0x8eDBf22b97f7bddC7F78AE13b348949DFa0731D3';
const FUNCTION_NAME = 'safeMint';

export const useMintCertification = (onSuccess?: (res: any) => void) => {
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
  const { writeContractAsync } = useWriteSbtManagerSafeMint();
  const account = useAccount();

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
      if (!account?.isConnected && openConnectModal) {
        updateInitialChainId(ChainType.MANTLE);
        openConnectModal();
        throw new Error('Please connect your wallet first!');
      }

      if (chainId !== ChainType.MANTLE) {
        await switchChainAsync({ chainId: ChainType.MANTLE });
      }

      console.log(
        parseUnits(params.signatureId.toString(), 0),
        params.signatureId
      );

      const res = await webApi.campaignsApi.getSignature({
        sourceId: params.sourceId,
        sourceType: params.sourceType,
        address: account.address!
      });

      const data = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        account: account.address,
        args: [
          account.address!,
          parseUnits(params.signatureId.toString(), 0),
          res.sig.v,
          res.sig.r,
          res.sig.s
        ]
      });

      const result = await webApi.campaignsApi.savaMintState({
        certificationId: params.sourceId,
        txId: data
      });

      return result;

      // if (metamaskConnector) {
      //   const isAccount = await metamaskConnector.isAuthorized();
      //   let account = null;
      //   if (isAccount) {
      //     account = await metamaskConnector.getAccount();
      //   }
      //   if (!account) {
      //     const connectRes = await connectAsync({
      //       connector: metamaskConnector
      //     });
      //     account = connectRes.account;
      //   }
      //   if (account) {
      //     const chainId = await metamaskConnector.getChainId();
      //     if (![5000].includes(chainId)) {
      //       throw new Error(
      //         'Please Switch to Mantle Mainnet to mint the certificate!'
      //       );
      //     }
      //     const res = await webApi.campaignsApi.getSignature({
      //       sourceId: params.sourceId,
      //       sourceType: params.sourceType,
      //       address: account!
      //     });
      //     const data = await writeAsync({
      //       args: [account, params.signatureId, res.sig.v, res.sig.r, res.sig.s]
      //     });
      //     const result = await webApi.campaignsApi.savaMintState({
      //       certificationId: params.sourceId,
      //       txId: data.hash
      //     });
      //     return result;
      //   } else {
      //     throw new Error('Failed to link MetaMask');
      //   }
      // } else {
      //   throw new Error('No metaMask connector found!');
      // }
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
