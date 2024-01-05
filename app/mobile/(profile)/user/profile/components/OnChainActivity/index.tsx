import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ProfileContext } from '../../constants/type';
import Button from '@/components/Common/Button';
import { useConnect } from 'wagmi';
import HoverIcon from '@/components/Web/Business/HoverIcon';
import { IconType } from '@/components/Web/Business/HoverIcon/type';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/utils';
import { message } from 'antd';
import webApi from '@/service';
import Confirm from '../components/Confirm';

import Loading from '@/public/images/other/loading.png';
import Image from 'next/image';
interface OnChainActivityProps {}

const OnChainActivity: FC<OnChainActivityProps> = (props) => {
  const { profile, refresh } = useContext(ProfileContext);

  const [chainData, setChainData] = useState<{
    address: string;
    balance: number;
    transactionCount: number;
  } | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const { connectAsync, connectors, error, isLoading, pendingConnector, data } =
    useConnect();

  const metamaskConnector = useMemo(() => {
    return connectors.find((item) => item.id === 'metaMask');
  }, [connectors]);

  const { run: connectToMetaMask, loading } = useRequest(
    async () => {
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
            const res = await webApi.userApi.linkChain(account);
            return res;
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
    {
      manual: true,
      onSuccess(res: any) {
        setChainData(res);
      }
    }
  );

  const { run: unlinkChain, loading: unLinkLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.unLinkChain();
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('Disconnect success!');
        setChainData(null);
      },
      onError(err) {
        errorMessage(err);
      },
      onFinally() {
        setConfirmOpen(false);
      }
    }
  );

  const { run: refreshChain, loading: refreshChainLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.refreshChain();
      return res;
    },
    {
      manual: true,
      onSuccess(res: any) {
        setChainData(res);
        message.success('Refresh success!');
      },
      onError(err) {
        errorMessage(err);
      },
      onFinally() {
        setConfirmOpen(false);
      }
    }
  );

  useEffect(() => {
    if (Object.keys(profile?.onChainActivity || {}).length > 0) {
      setChainData(profile.onChainActivity);
    }
  }, [profile?.onChainActivity]);

  return (
    <div className="w-full h-[260px] p-[30px] pb-[40px] bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-black font-next-poster-Bold text-[28px] tracking-[1.68px] leading-[125%]">
        On-Chain Activity
      </p>
      {Object.keys(chainData || {}).length > 0 && (
        <div className="absolute right-[30px] top-[25px] hidden group-hover:block">
          <div className="flex gap-[10px]">
            <HoverIcon
              type={IconType.REFRESH}
              onClick={() => {
                refreshChain();
              }}
            />
            <HoverIcon
              type={IconType.UN_LINK}
              onClick={() => {
                setConfirmOpen(true);
              }}
            />
          </div>
        </div>
      )}
      {Object.keys(chainData || {}).length > 0 && (
        <>
          {!refreshChainLoading && (
            <div className="flex mt-[30px]">
              <div className="flex flex-col items-center flex-1 relative after:absolute after:right-0 after:top-0 after:h-full after:bg-black after:w-[1px] after:scale-x-50">
                <span className="font-next-book-Thin text-[54px] leading-[160%] tracking-[0.162px] text-black">
                  0
                </span>
                <p className="mt-5 font-next-book leading-[125%] tracking-[0.32px] text-[16px] text-[#8C8C8C]">
                  Deployed Contracts
                </p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="font-next-book-Thin text-[54px] leading-[160%] tracking-[0.162px] text-black">
                  {chainData?.transactionCount}
                </span>
                <p className="mt-5 font-next-book leading-[125%] tracking-[0.32px] text-[16px] text-[#8C8C8C]">
                  Defi Interaction
                </p>
              </div>
            </div>
          )}
          {refreshChainLoading && (
            <div className="relative flex-1 w-full h-full flex-center">
              <Image
                src={Loading}
                width={40}
                alt="loading"
                className="object-contain animate-spin opacity-100"
              ></Image>
            </div>
          )}
        </>
      )}
      {Object.keys(chainData || {}).length <= 0 && (
        <div className="flex flex-col items-center">
          <p className="mt-[48px] text-center font-next-book text-[18px] leading-[160%] tracking-[0.054px]">
            Share your on-chain activities
          </p>
          <Button
            type="primary"
            disabled={loading}
            loading={loading}
            className="w-[223px] cursor-pointer px-0 py-[12px] text-[16px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B] mt-[25px] mb-[10px]"
            onClick={() => connectToMetaMask()}
          >
            Connect to MetaMask
          </Button>
        </div>
      )}
      <Confirm
        open={confirmOpen}
        loading={unLinkLoading}
        onClose={() => setConfirmOpen(false)}
        title="On-Chain Activity"
        content="Do you want to disconnect from On-Chain?"
        handleConfirm={() => {
          unlinkChain();
        }}
      />
    </div>
  );
};

export default OnChainActivity;
