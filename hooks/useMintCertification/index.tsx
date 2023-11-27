import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead,
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi';
import wagmigotchiABI from '@/config/abi/SBTManager.abi';
import { SBTManager } from '@/config/abi';
import { errorMessage } from '@/helper/utils';
import { message } from 'antd';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';

const CONTRACT_ADDRESS = '0xD35f165c03A27d21da5D7F5096Fd66668D5dFFA0';
const FUNCTION_NAME = 'safeMint';

export const useMintCertification = () => {
  const { address: userAddress, isConnected, isDisconnected } = useAccount();
  const [signature, setSignature] = useState<any>({});
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const metamaskConnector = useMemo(() => {
    return connectors.find((item) => item.id === 'metaMask');
  }, [connectors]);

  const { run: safeMint, loading } = useRequest(
    async (params: { sourceType: 'Certification'; sourceId: string }) => {
      if (metamaskConnector) {
        try {
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
            const res = await webApi.courseApi.getSignature({
              sourceId: params.sourceId,
              sourceType: params.sourceType,
              userAddress: account!
            });
            console.log(res);

            // write({
            //   args: []
            // });
          } else {
            throw new Error('Failed to link MetaMask');
          }
        } catch (err) {
          errorMessage(err);
        }
      } else {
        message.error('No metaMask connector found!');
      }
    },
    { manual: true }
  );

  // const { config } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: SBTManager as any,
  //   functionName: FUNCTION_NAME,
  //   account: userAddress,
  //   args: [
  //     userAddress,
  //     123456,
  //     28,
  //     '0x45625d9772e65fbf052dcdbe3cde451ac405f5fc7bbdccba0aeb5afc74f06284',
  //     '0x3f1a7a0b05e1cf589bb1c2d72b274841a2209efb861df1bab7b0002c0cdf134e'
  //   ]
  // });

  // const { run: getSignature } = useRequest(
  //   async (params: { sourceType: 'Certification'; sourceId: string }) => {
  //     const res = await webApi.courseApi.getSignature({
  //       sourceId: params.sourceId,
  //       sourceType: params.sourceType,
  //       userAddress: userAddress!
  //     });
  //   },
  //   {
  //     manual: true,
  //     onSuccess(res) {
  //       console.log(res);
  //       // safeMint({
  //       //   args: [userAddress, res.r]
  //       // });
  //     }
  //   }
  // );

  const { data, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: SBTManager as any,
    functionName: FUNCTION_NAME
  });

  return {
    // getSignature,
    safeMint
    // isConnected
  };
};
