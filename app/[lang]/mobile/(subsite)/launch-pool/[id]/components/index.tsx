'use client';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Content, { OffsetTopsType } from './Content';
import { FuelInfo, LaunchPoolProjectType, ParticipateInfo } from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import WaitListModal, { WaitListModalInstance } from '@/components/Web/Business/WaitListModal';
import ConnectModal, { ConnectModalInstance } from '@/components/Web/Business/ConnectModal';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useChainInfo } from '@/hooks/contract/useChain';
import {
  LaunchDetailContext,
  LaunchInfoType,
  ModalName
} from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import {
  useWriteAirdropClaim,
  useWriteLaunchpadStake,
  useWriteLaunchpadUnstake,
  useWriteStakingTokenApprove
} from '@/lib/generated';
import { ChainType } from '@/config/wagmi';
import { mantaTestnet } from '@/config/wagmi/chains';
import { parseUnits } from 'viem';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import message from 'antd/es/message';

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
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const chainInfo = useChainInfo(mantaTestnet.id);
  const waitListRef = useRef<WaitListModalInstance>(null);
  const connectModalRef = useRef<ConnectModalInstance>(null);
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const [joined, setJoined] = useState(false);
  const chainId = useChainId();
  const [modalName, setModalName] = useState<ModalName>(ModalName.EMPTY);
  const { switchChainAsync } = useSwitchChain();

  const { writeContractAsync } = useWriteLaunchpadStake();
  const { writeContractAsync: writeContractAsyncUn } = useWriteLaunchpadUnstake();
  const { writeContractAsync: stakingTokenApprove } = useWriteStakingTokenApprove();
  const { writeContractAsync: writeContractAsyncClaim } = useWriteAirdropClaim();

  const account = useAccount();

  const balance =
    useBalance({
      address: account.address
    })?.data?.formatted || 0;

  const handleStake = async (amount: string, duration: number) => {
    if (Number(amount) < 0.0001) {
      errorMessage({
        msg: t('minStakeErrorMsg')
      });
      return;
    } else if (Number(amount) > Number(balance)) {
      errorMessage({
        msg: t('maxStakeErrorMsg')
      });
      return;
    }
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      stakingTokenApprove({
        account: account.address,
        address: mantaTestnet.contracts.stakingToken.address,
        args: [mantaTestnet.contracts.launchpad.address, parseUnits(amount, 18)]
      })
        .then(() => {
          setTimeout(async () => {
            const txHash = await writeContractAsync({
              account: account.address,
              address: mantaTestnet.contracts.launchpad.address,
              args: [launchInfo.launchPadID as bigint, parseUnits(amount, 18)]
            });
            await webApi.launchPoolApi.stake(launchInfo?.id as string, {
              txHash,
              address: account.address,
              duration: Number(duration),
              amount
            });
            message.success('stake success');
            getProjectInfo();
            setModalName(ModalName.EMPTY);
          }, 2000);
        })
        .catch((error) => {
          console.info(error);
          errorMessage(error);
          setLoading(false);
        });
    } catch (error) {
      console.info(error);
      errorMessage(error);
      setLoading(false);
    }
  };
  const handleUnStake = async (fule: FuelInfo) => {
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      await writeContractAsyncUn({
        account: account.address,
        address: mantaTestnet.contracts.launchpad.address,
        args: [launchInfo.launchPadID as bigint, BigInt(fule.index)]
      });
      await webApi.launchPoolApi.unStake(launchInfo.id as string, fule.id);
      message.success('unstake success');
      getProjectInfo();
      setModalName(ModalName.EMPTY);
    } catch (error) {
      console.info(error);
      errorMessage(error);
      setLoading(false);
    }
  };

  const handleClaimToken = async () => {
    // setLoading(true);
    // try {
    //   await writeContractAsyncClaim({
    //     account: account.address,
    //     address: mantaTestnet.contracts.aridropToken.address,
    //     args: [
    //       '0x7184c70bdC9eaD810C795d5df0Bf4aC987988927',
    //       ['0x7dd532323d5d20b862da3f3fdab74408430bb345a3d37317e354a89c7c5dc653'],
    //       parseUnits('0.0001', 18)
    //     ]
    //   });
    // } catch (error) {
    //   console.info(error);
    //   errorMessage(error);
    // }
    // setLoading(false);
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
        handleClaimToken,
        modalName,
        setModalName
      }}
    >
      <Content loading={loading} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
      <WaitListModal ref={waitListRef} />
      <ConnectModal ref={connectModalRef} onConnectStateUpdate={onConnectStateUpdate} />
    </LaunchDetailContext.Provider>
  );
};

export default LaunchDetailPage;
