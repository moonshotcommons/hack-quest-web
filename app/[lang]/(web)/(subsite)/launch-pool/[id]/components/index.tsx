'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Nav from './Nav';
import Content, { OffsetTopsType } from './Content';
import { LaunchDetailContext, LaunchInfoType } from '../constants/type';
import { FuelInfo, LaunchPoolProjectType, ParticipateInfo } from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import WaitListModal, { WaitListModalInstance } from '@/components/Web/Business/WaitListModal';
import ConnectModal, { ConnectModalInstance } from '@/components/Web/Business/ConnectModal';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useChainInfo } from '@/hooks/contract/useChain';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import {
  useWriteAirdropClaim,
  useWriteLaunchpadStake,
  useWriteLaunchpadUnstake,
  useWriteStakingTokenApprove
} from '@/lib/generated';
import { ChainType } from '@/config/wagmi';
import { parseUnits } from 'viem';
import { mantaTestnet } from '@/config/wagmi/chains';

interface LaunchDetailPageProp {
  id: string;
}

const LaunchDetailPage: React.FC<LaunchDetailPageProp> = ({ id }) => {
  const [projectInfo, setProjectInfo] = useState<LaunchPoolProjectType | null>(null);
  const [participateInfo, setParticipateInfo] = useState<ParticipateInfo | null>(null);
  const [fuelsInfo, setfFelsInfo] = useState<FuelInfo[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const isOnScoll = useRef(false);
  const chainInfo = useChainInfo(3441006);
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [joined, setJoined] = useState(false);
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const { writeContractAsync } = useWriteLaunchpadStake();
  const { writeContractAsync: writeContractAsyncUn } = useWriteLaunchpadUnstake();
  const { writeContractAsync: stakingTokenApprove } = useWriteStakingTokenApprove();
  const { writeContractAsync: writeContractAsyncClaim } = useWriteAirdropClaim();

  const account = useAccount();

  const handleStake = async (amount: string) => {
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      await stakingTokenApprove({
        account: account.address,
        address: mantaTestnet.contracts.stakingToken.address,
        args: [mantaTestnet.contracts.launchpad.address, parseUnits(amount, 18)]
      });
      await writeContractAsync({
        account: account.address,
        address: mantaTestnet.contracts.launchpad.address,
        args: [launchInfo.launchPadID as bigint, parseUnits(amount, 18)]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };
  const handleUnStake = async () => {
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      await writeContractAsyncUn({
        account: account.address,
        address: mantaTestnet.contracts.launchpad.address,
        args: [launchInfo.launchPadID as bigint, BigInt(1)]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };

  const handleClaimToken = async () => {
    setLoading(true);
    try {
      await writeContractAsyncClaim({
        account: account.address,
        address: '0x6Eb462Aa74AbDc99Fd025bD32800500c37B0040a',
        args: [
          '0x7184c70bdC9eaD810C795d5df0Bf4aC987988927',
          ['0x7dd532323d5d20b862da3f3fdab74408430bb345a3d37317e354a89c7c5dc653'],
          parseUnits('0.0001', 18)
        ]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };

  const { run: getProjectInfo } = useRequest(
    async () => {
      setLoading(true);
      const projectInfo = await webApi.launchPoolApi.getProjectById(id);
      return projectInfo;
    },
    {
      onSuccess(res) {
        setProjectInfo(res);
        getParticipateInfo();
      },
      onError(err) {
        errorMessage(err);
        setLoading(false);
      }
    }
  );
  const { run: getParticipateInfo } = useRequest(
    async () => {
      const pInfo = await webApi.launchPoolApi.getParticipateInfo(id);
      return pInfo;
    },
    {
      manual: true,
      onSuccess(res) {
        setParticipateInfo(res);
        res.isParticipate ? getFulesInfo() : setLoading(false);
      },
      onError(err) {
        setLoading(false);
        errorMessage(err);
      }
    }
  );

  const { run: getFulesInfo } = useRequest(
    async () => {
      const fInfo = await webApi.launchPoolApi.getFuelsInfo(id);
      return fInfo;
    },
    {
      manual: true,
      onSuccess(res) {
        setfFelsInfo(res);
      },
      onError(err) {
        errorMessage(err);
      },
      onFinally() {
        setLoading(false);
      }
    }
  );

  const launchInfo = useMemo(() => {
    return {
      ...projectInfo,
      symbol: chainInfo?.symbol || 'ETH',
      participateInfo: participateInfo,
      fuelsInfo,
      isStake: fuelsInfo?.length > 0,
      isJoined: joined
    };
  }, [projectInfo, participateInfo, fuelsInfo, joined]);
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop || 0
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 10);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    timeOut.current = setTimeout(() => {
      timeOut.current = null;
      for (let i = 0; i < offsetTops.length; i++) {
        if (scrollTop >= offsetTops[offsetTops.length - 1].offsetTop - 40) {
          setCurAnchorIndex(offsetTops.length - 1);
          break;
        } else if (scrollTop >= offsetTops[i].offsetTop - 40 && scrollTop < offsetTops[i + 1].offsetTop - 40) {
          setCurAnchorIndex(i);
          break;
        }
      }
    }, 150);
  };

  const { run, refreshAsync } = useRequest(
    async () => {
      return webApi.launchPoolApi.checkJoinWaitList(id);
    },
    {
      manual: true,
      onSuccess(res) {
        if (res?.isJoin) {
          setJoined(true);
        }
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const joinWaitlist = () => {
    if (!userInfo) {
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    waitListRef.current?.onJoin(id, refreshAsync, '');
  };

  const participateNow = () => {
    if (!userInfo) {
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    connectModalRef.current?.onConnect(id);
  };

  const onConnectStateUpdate = (connectState: any[]) => {
    if (connectState.every((state) => state.isConnect)) {
      getParticipateInfo();
    }
  };

  useEffect(() => {
    if (userInfo && launchInfo?.id) run();
  }, [run, userInfo]);

  return (
    <LaunchDetailContext.Provider
      value={{
        launchInfo: launchInfo as LaunchInfoType,
        refreshLaunchInfo: getProjectInfo,
        refreshFuel: getFulesInfo,
        loading,
        setLoading,
        joinWaitlist,
        participateNow,
        handleStake,
        handleUnStake,
        handleClaimToken
      }}
    >
      <div className="scroll-wrap-y h-full py-[40px]" ref={boxRef} onScroll={handleScoll}>
        <div className="container  mx-auto flex">
          <div className="relative w-[345px]">
            <Nav curAnchorIndex={curAnchorIndex} offsetTops={offsetTops} handleClickAnchor={handleClickAnchor} />
          </div>
          <Content loading={loading} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
        </div>
        <WaitListModal ref={waitListRef} />
        <ConnectModal ref={connectModalRef} onConnectStateUpdate={onConnectStateUpdate} />
      </div>
    </LaunchDetailContext.Provider>
  );
};

export default LaunchDetailPage;
