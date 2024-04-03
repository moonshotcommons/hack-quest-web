'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Content, { OffsetTopsType } from './Content';
import { FuelInfo, LaunchPoolProjectType, ParticipateInfo } from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRouter } from 'next/navigation';
import WaitListModal, { WaitListModalInstance } from '@/components/Web/Business/WaitListModal';
import ConnectModal, { ConnectModalInstance } from '@/components/Web/Business/ConnectModal';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useChainInfo } from '@/hooks/contract/useChain';
import { LaunchDetailContext, LaunchInfoType } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';

interface LaunchDetailPageProp {
  id: string;
}

const LaunchDetailPage: React.FC<LaunchDetailPageProp> = ({ id }) => {
  const router = useRouter();
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
  const [joined, setJoined] = useState(false);

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
        refreshFuel: getFulesInfo,
        loading,
        setLoading,
        joinWaitlist,
        participateNow
      }}
    >
      <Content loading={loading} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
      <WaitListModal ref={waitListRef} />
      <ConnectModal ref={connectModalRef} onConnectStateUpdate={onConnectStateUpdate} />
    </LaunchDetailContext.Provider>
  );
};

export default LaunchDetailPage;
