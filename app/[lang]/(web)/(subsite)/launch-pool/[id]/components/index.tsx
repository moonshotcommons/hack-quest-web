'use client';
import React, { useMemo, useRef, useState } from 'react';
import Nav from './Nav';
import Content, { OffsetTopsType } from './Content';
import { LaunchDetailContext, LaunchInfoType } from '../constants/type';
import { FuelInfo, LaunchPoolProjectStatus, LaunchPoolProjectType, ParticipateInfo } from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRouter } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';

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
        !Object.keys(res).length ? getFulesInfo() : setLoading(false);
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
      status: LaunchPoolProjectStatus.ALLOCATION,
      participateInfo,
      fuelsInfo,
      isParticipate: participateInfo?.isParticipate,
      isStake: fuelsInfo?.length > 0
    };
  }, [projectInfo, participateInfo, fuelsInfo]);
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    router.push(`${MenuLink.LAUNCH}/${id}#${offsetTops[index].title}`);
    // isOnScoll.current = true;
    // boxRef.current?.scrollTo({
    //   top: offsetTops[index].offsetTop - 40,
    //   behavior: 'smooth'
    // });
    // setTimeout(() => {
    //   isOnScoll.current = false;
    // }, 1000);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    for (let i = 0; i < offsetTops.length; i++) {
      if (scrollTop >= offsetTops[offsetTops.length - 1].offsetTop - 40) {
        setCurAnchorIndex(offsetTops.length - 1);
        break;
      } else if (scrollTop >= offsetTops[i].offsetTop - 40 && scrollTop < offsetTops[i + 1].offsetTop - 40) {
        setCurAnchorIndex(i);
        break;
      }
    }
  };

  return (
    <LaunchDetailContext.Provider
      value={{
        launchInfo: launchInfo as LaunchInfoType,
        refreshFuel: getFulesInfo,
        loading,
        setLoading
      }}
    >
      <div className="scroll-wrap-y h-full py-[40px]" ref={boxRef} onScroll={handleScoll}>
        <div className="container  mx-auto flex">
          <div className="relative w-[345px]">
            <Nav curAnchorIndex={curAnchorIndex} handleClickAnchor={handleClickAnchor} />
          </div>
          <Content loading={loading} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
        </div>
      </div>
    </LaunchDetailContext.Provider>
  );
};

export default LaunchDetailPage;
